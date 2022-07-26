const hre = require("hardhat");

async function main() {
  const learnAndEarnFactory = await hre.ethers.getContractFactory("LearnAndEarn");
  const learnAndEarnContractInstance = await learnAndEarnFactory.deploy();

  await learnAndEarnContractInstance.deployed();

  console.log("Learn and earn token deployed to:", learnAndEarnContractInstance.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// lAE token here: 0xDfe62180085fae16BdFd493030993Feeb965ee63
// LAE super token here: 0xFa17B12f37C7e219006DefC888d0458859178428

// Institute Funds manager contract address:  0x7cECFDde6B8044F653d9cE86aCC1eE3Cf6620392
// Factory contract address:  0xC0A01393E1a72f67B8F77B655cc27aDCc4F2f0b1