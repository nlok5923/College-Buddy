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