// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DonationVault.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Campaign is ReentrancyGuard {
    // --- State Variables ---
    
    enum State { Created, Active, GoalReached, Submitted, Verified, Released }
    State public state;

    address public creator;
    address public verifier; // Hospital Authority
    address public beneficiary; // Where funds go eventually
    
    uint256 public targetAmount;
    uint256 public raisedAmount;
    string public metadataCID;
    
    DonationVault public vault;

    // --- Events ---
    event DonationReceived(address indexed donor, uint256 amount);
    event GoalReached(uint256 totalRaised);
    event StatusChanged(State newState);
    event FundsReleased(address indexed beneficiary, uint256 amount);

    // --- Modifiers ---
    modifier onlyCreator() {
        require(msg.sender == creator, "Only creator");
        _;
    }

    modifier onlyVerifier() {
        require(msg.sender == verifier, "Only verifier");
        _;
    }

    modifier inState(State _state) {
        require(state == _state, "Invalid state for action");
        _;
    }

    // --- Constructor ---
    constructor(
        uint256 _targetAmount,
        address _creator,
        address _verifier,
        address _beneficiary,
        string memory _metadataCID
    ) {
        require(_targetAmount > 0, "Target > 0");
        require(_creator != address(0), "Invalid creator");
        require(_verifier != address(0), "Invalid verifier");
        require(_beneficiary != address(0), "Invalid beneficiary");

        targetAmount = _targetAmount;
        creator = _creator;
        verifier = _verifier;
        beneficiary = _beneficiary;
        metadataCID = _metadataCID;
        
        state = State.Active; // Start as Active for simplicity in MVP

        // Deploy Vault
        vault = new DonationVault(address(this));
    }

    // --- Core Logic ---

    // 1. Donate
    function donate() external payable nonReentrant inState(State.Active) {
        require(msg.value > 0, "Donation must be > 0");

        raisedAmount += msg.value;

        // Forward funds to Vault
        (bool success, ) = address(vault).call{value: msg.value}("");
        require(success, "Vault transfer failed");

        emit DonationReceived(msg.sender, msg.value);

        // Check Goal
        if (raisedAmount >= targetAmount) {
            state = State.GoalReached;
            emit GoalReached(raisedAmount);
            emit StatusChanged(state);
        }
    }

    // 2. Submit for Verification (by Creator)
    function submitForVerification() external onlyCreator inState(State.GoalReached) {
        state = State.Submitted;
        emit StatusChanged(state);
    }

    // 3. Verify Campaign (by Hospital/Verifier)
    function verifyCampaign() external onlyVerifier inState(State.Submitted) {
        state = State.Verified;
        emit StatusChanged(state);
    }

    // 4. Release Funds (Final Step)
    // Can be called by anyone if verified, or restricted. 
    // Usually creator calls it to get the money.
    function releaseFunds() external nonReentrant inState(State.Verified) {
        state = State.Released;
        emit StatusChanged(state);

        // Tell Vault to release funds to beneficiary
        vault.releaseFunds(payable(beneficiary), raisedAmount);
        
        emit FundsReleased(beneficiary, raisedAmount);
    }

    // --- View Functions ---
    function getDetails() external view returns (
        State, uint256, uint256, address, address, address, string memory, address
    ) {
        return (state, targetAmount, raisedAmount, creator, verifier, beneficiary, metadataCID, address(vault));
    }
}
