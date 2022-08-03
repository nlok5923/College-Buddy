const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  const DistributeToken = await ethers.getContractFactory("DistributeToken");
  const distributeTokenContract = await DistributeToken.deploy(
    "0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9", // goerli host address no need to change here as well 
    "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00" // fDaix token address no need to change anything here 
  );

  await distributeTokenContract.deployed();
  console.log("Distribute token deployed to:", distributeTokenContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});