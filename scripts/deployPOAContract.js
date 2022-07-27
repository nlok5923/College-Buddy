const hre = require("hardhat");

async function main() {
  const POAContract = await hre.ethers.getContractFactory("ProofOfAttendence");
  const POAContractInstance = await POAContract.deploy();
  await POAContractInstance.deployed();
  
  console.log("POA contract address: ", POAContractInstance.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
