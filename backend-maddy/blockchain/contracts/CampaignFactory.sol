// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Campaign.sol";

contract CampaignFactory {
    address[] public deployedCampaigns;

    event CampaignCreated(address indexed campaignAddress, address indexed creator, uint256 targetAmount, string metadataCID);

    function createCampaign(
        uint256 _targetAmount,
        address _beneficiary,
        address _verifier,
        string memory _metadataCID
    ) external {
        Campaign newCampaign = new Campaign(
            _targetAmount,
            msg.sender, // Creator
            _verifier,
            _beneficiary,
            _metadataCID
        );

        deployedCampaigns.push(address(newCampaign));

        emit CampaignCreated(address(newCampaign), msg.sender, _targetAmount, _metadataCID);
    }

    function getCampaigns() external view returns (address[] memory) {
        return deployedCampaigns;
    }
}
