const hre = require("hardhat");
const { ethers } = require("ethers");
require("dotenv").config();

async function mintNFT() {
  const provider = new ethers.JsonRpcProvider(process.env.LISK_SEPOLIA_RPC_URL);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const EventNFT = await hre.ethers.getContractFactory("EventNFT");
  const eventNFT = EventNFT.attach("0x4E2Cb0e9559899Fa1694127c42FdF17607e8910D").connect(signer);

  const tx = await eventNFT.safeMint(signer.address, "ipfs://QmdePyojbeRZvHqDWcwgBYMb3ULnapmcdJZK2PYhCH1mZR");
  await tx.wait();

  console.log("NFT minted successfully");
}

mintNFT().catch(console.error);