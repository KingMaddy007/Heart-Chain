from web3 import Web3
from core.config import settings

# Minimal ABI for createCampaign
# ABI for CampaignFactory
CONTRACT_ABI = [
    {
      "inputs": [
        {"internalType": "uint256", "name": "_targetAmount", "type": "uint256"},
        {"internalType": "address", "name": "_beneficiary", "type": "address"},
        {"internalType": "address", "name": "_verifier", "type": "address"},
        {"internalType": "string", "name": "_metadataCID", "type": "string"}
      ],
      "name": "createCampaign",
      "outputs": [],
      "stateMutability": "nonpayable",
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": False,
      "inputs": [
        {"indexed": True, "internalType": "address", "name": "campaignAddress", "type": "address"},
        {"indexed": True, "internalType": "address", "name": "creator", "type": "address"},
        {"indexed": False, "internalType": "uint256", "name": "targetAmount", "type": "uint256"},
        {"indexed": False, "internalType": "string", "name": "metadataCID", "type": "string"}
      ],
      "name": "CampaignCreated",
      "type": "event"
    }
]

async def create_campaign_on_chain(goal_amount: float, metadata_cid: str) -> str:
    """
    Calls CampaignFactory.createCampaign(...) on Shardeum.
    Returns Transaction Hash.
    """
    # Check for placeholder config
    if "000000000" in settings.ADMIN_PRIVATE_KEY or "000000000" in settings.CONTRACT_ADDRESS:
        print(f"MOCK BLOCKCHAIN: Creating campaign with goal {goal_amount} and CID {metadata_cid}")
        return f"0xMOCK_TX_HASH_{metadata_cid[:8]}", None

    try:
        w3 = Web3(Web3.HTTPProvider(settings.SHARDEUM_RPC_URL))
        
        if not w3.is_connected():
            print("ERROR: Could not connect to Shardeum RPC. Returning Mock Hash.")
            return f"0xMOCK_TX_FAIL_{metadata_cid[:8]}", None
            
        account = w3.eth.account.from_key(settings.ADMIN_PRIVATE_KEY)
        contract = w3.eth.contract(address=settings.CONTRACT_ADDRESS, abi=CONTRACT_ABI)
        
        # Convert float goal to Wei
        goal_wei = w3.to_wei(goal_amount, 'ether')
        
        admin_address = account.address
        beneficiary = admin_address 
        verifier = admin_address

        # Build Transaction
        tx = contract.functions.createCampaign(
            goal_wei, 
            beneficiary, 
            verifier, 
            metadata_cid
        ).build_transaction({
            'from': admin_address,
            'nonce': w3.eth.get_transaction_count(admin_address),
            'gas': 3000000, 
            'gasPrice': w3.eth.gas_price
        })
        
        # Sign & Send
        signed_tx = w3.eth.account.sign_transaction(tx, settings.ADMIN_PRIVATE_KEY)
        tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
        
        # Wait for Receipt to get Campaign Address
        print(f"Waiting for transaction {tx_hash.hex()} to be mined...")
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash, timeout=120)
        
        # Parse Logs for CampaignCreated event
        # Event Signature: event CampaignCreated(address indexed campaignAddress, ...)
        # Topic 0 is the hash of the signature
        campaign_address = None
        
        # Simply decoding logs using contract instance
        processed_logs = contract.events.CampaignCreated().process_receipt(receipt)
        if processed_logs:
            campaign_address = processed_logs[0]['args']['campaignAddress']
            print(f"Campaign Deployed at: {campaign_address}")
        
        return tx_hash.hex(), campaign_address
        
    except Exception as e:
        print(f"Blockchain Error: {e}")
        return f"0xERROR_TX_{metadata_cid[:8]}", None
