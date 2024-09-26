const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const EventNFT = await hre.ethers.getContractFactory("EventNFT");
  const eventNFT = await EventNFT.deploy(deployer.address);
  await eventNFT.waitForDeployment();

  console.log("EventNFT deployed to:", await eventNFT.getAddress());

  const EventManager = await hre.ethers.getContractFactory("EventManager");
  const eventManager = await EventManager.deploy(deployer.address, await eventNFT.getAddress());
  await eventManager.waitForDeployment();

  console.log("EventManager deployed to:", await eventManager.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });