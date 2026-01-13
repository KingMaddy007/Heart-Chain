// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title DonationVault
 * @dev Holds funds for a specific campaign.
 * Funds can only be released by the owner (The Campaign Contract).
 */
contract DonationVault {
    address public campaignContract;

    event FundsReceived(address indexed donor, uint256 amount);
    event FundsReleased(address indexed beneficiary, uint256 amount);

    constructor(address _campaignContract) {
        require(_campaignContract != address(0), "Invalid campaign address");
        campaignContract = _campaignContract;
    }

    // Accept funds from CampaignContract (or direct transfers if needed, though usually via Campaign)
    receive() external payable {
        emit FundsReceived(msg.sender, msg.value);
    }

    /**
     * @dev Release funds to the beneficiary.
     * Only callable by the Campaign Contract.
     */
    function releaseFunds(address payable _beneficiary, uint256 _amount) external {
        require(msg.sender == campaignContract, "Only Campaign Contract can release funds");
        require(address(this).balance >= _amount, "Insufficient vault balance");
        require(_beneficiary != address(0), "Invalid beneficiary");

        (bool success, ) = _beneficiary.call{value: _amount}("");
        require(success, "Transfer failed");

        emit FundsReleased(_beneficiary, _amount);
    }
}
