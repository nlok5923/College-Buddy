const hre = require("hardhat");

async function main() {
  const instituteFundsManagerFactory = await hre.ethers.getContractFactory("InstituteFundsManagerFactory");
  const instituteFundsManagerFactoryInstance = await instituteFundsManagerFactory.deploy();
  await instituteFundsManagerFactoryInstance.deployed();
  
  console.log("Factory contract address: ", instituteFundsManagerFactoryInstance.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
