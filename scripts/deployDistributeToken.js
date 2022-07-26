const hre = require("hardhat");
const ethers = hre.ethers;
const { Framework } = require("@superfluid-finance/sdk-core");

async function main() {

  //// Applying best practices and using Superfluid Framework to get deployment info

  // Setting up network object - this is set as the goerli url, but can be changed to reflect your RPC URL and network of choice
  const url = "https://eth-goerli.alchemyapi.io/v2/V5p1PckEwUqIq5s5rA2zvwRKH0V9Hslr";
  const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
  const network = await customHttpProvider.getNetwork();

  // Setting up the out Framework object with Goerli (knows it's Goerli when we pass in network.chainId)
  const sf = await Framework.create({
    chainId: network.chainId,
    provider: customHttpProvider
  });

  // Getting the Goerli fDAIx Super Token object from the Framework object
  // This is fDAIx on goerli - you can change this token to suit your network and desired token address
  const daix = await sf.loadSuperToken("LAEx");

  //// Actually deploying

  // We get the contract to deploy to Gorli Testnet
  const TokenSpreader = await ethers.getContractFactory("DistributeTokens");
  const tokenSpreader = await TokenSpreader.deploy(
    sf.settings.config.hostAddress, // Getting the Goerli Host contract address from the Framework object
    "0xC76C2069Bb251ab6e3FDfDCd4399D3C91da74c04"                  
  );

  await tokenSpreader.deployed();

  console.log("Token Spreader deployed to:", tokenSpreader.address);
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