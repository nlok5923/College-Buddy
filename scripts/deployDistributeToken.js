const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  // We get the contract to deploy to Gorli Testnet
  const DistributeToken = await ethers.getContractFactory("DistributeToken");
  const distributeTokenContract = await DistributeToken.deploy(
    "0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9",
    "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00" // fDaix token address no need to change anything here 
  );

  await distributeTokenContract.deployed();
  console.log("Distribute token deployed to:", distributeTokenContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Deploy: npx hardhat run scripts/deploy.js --network goerli

// Verify: npx hardhat verify --network goerli --constructor-args arguments-tokenspreader.js [contractaddress]

// lAE token here: 0xDfe62180085fae16BdFd493030993Feeb965ee63
// LAE super token here: 0xFa17B12f37C7e219006DefC888d0458859178428

// Institute Funds manager contract address:  0x7cECFDde6B8044F653d9cE86aCC1eE3Cf6620392
// Factory contract address:  0xC0A01393E1a72f67B8F77B655cc27aDCc4F2f0b1