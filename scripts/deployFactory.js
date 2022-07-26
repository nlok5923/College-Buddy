const hre = require("hardhat");


// Institute Funds manager contract address:  0x78bC15828Fe79637506ed1100BE5c4a176Be5636
// Factory contract address:  0xbD252Be7Ff42db2A167D87d43e13FA98f61dbA3c
async function main() {
  const instituteFundsManager = await hre.ethers.getContractFactory('InstituteFundsManager');
  const instituteFundsManagerInstance = await instituteFundsManager.deploy();;
  await instituteFundsManagerInstance.deployed();
  console.log("Institute Funds manager contract address: ", instituteFundsManagerInstance.address);

  const instituteFundsManagerFactory = await hre.ethers.getContractFactory("InstituteFundsManagerFactory");
  const instituteFundsManagerFactoryInstance = await instituteFundsManagerFactory.deploy(instituteFundsManagerInstance.address);
  await instituteFundsManagerFactoryInstance.deployed();
  
  console.log("Factory contract address: ", instituteFundsManagerFactoryInstance.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
