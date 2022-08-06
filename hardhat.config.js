require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // solidity: "0.8.4",
  solidity: {
    compilers: [
      {
        version: "0.8.4",
      },
      {
        version: "0.8.13",
      },
    ],
  },
  defaultNetwork: "goerli",
  networks: {
     hardhat: {},
     goerli: {
        url: "https://eth-goerli.alchemyapi.io/v2/V5p1PckEwUqIq5s5rA2zvwRKH0V9Hslr",
        accounts: ["e3f4cd385c1834aba7227db3b6468cf1805a2831463042781c529a1beacf9f25"]
     }
  },
  etherscan: {
    apiKey: "XIZ6C66146CC6QSZYVFAM5WMTH9EHWDWEI"
  }
};
