const hre = require("hardhat");

async function main() {
    console.log("Deploying CampaignFactory...");

    const factory = await hre.ethers.deployContract("CampaignFactory");

    await factory.waitForDeployment();

    const address = await factory.getAddress();

    console.log(`CampaignFactory deployed to: ${address}`);
    console.log("------------------------------------------");
    console.log("Update CONTRACT_ADDRESS in backend-maddy/.env with this address.");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
