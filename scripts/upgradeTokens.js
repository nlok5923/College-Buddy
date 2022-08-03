const { Framework } = require('@superfluid-finance/sdk-core')
const { ethers } = require('ethers')
const laeArtifact = require('../artifacts/contracts/LearnAndEarn.sol/LearnAndEarn.json')

//! Will take a look here litte later currently will work with fDai
const laeAddress = "0xC760202A0d87ECD6b53a8bbc72FF63a9b411986D";
// 0xC76C2069Bb251ab6e3FDfDCd4399D3C91da74c04
const laexAddress = "0x6C1ae4ee999539BCb18e34C5822Df808d239b0C2"
// let ethProvider = new ethers.providers.Web3Provider(window.ethereum);
let amt = 100000;
const url = process.env.REACT_APP_GOERLI_API_URL;
const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
// const sf = await Framework.create({
//     chainId: 5,
//     provider: customHttpProvider
//   });
// const signer = sf.createSigner({
//     privateKey:
//       "",
//     provider: customHttpProvider
//   });
const approveToken = async () => {
    const sf = await Framework.create({
        chainId: 5,
        provider: customHttpProvider
      });
    const signer = sf.createSigner({
        privateKey: process.env.REACT_APP_GOERLI_PRIVATE_KEY,
        provider: customHttpProvider
      });
    let laeContractInstance = new ethers.Contract(laeAddress, laeArtifact.abi, signer);
    await laeContractInstance.approve(laexAddress, ethers.utils.parseEther(amt.toString())).then((txn) => console.log("done with txn ", txn));
}

const upgradeToken = async () => {
    const sf = await Framework.create({
        chainId: 5,
        provider: customHttpProvider
      });
    const signer = sf.createSigner({
        privateKey: process.env.REACT_APP_GOERLI_PRIVATE_KEY,
        provider: customHttpProvider
      });
    const amtToUpgrade = ethers.utils.parseEther(amt.toString());
    console.log("yaha tak aagaya ", amtToUpgrade)
    
    const laeX = await sf.loadSuperToken("0xC76C2069Bb251ab6e3FDfDCd4399D3C91da74c04");
    // console.log("token apna", laeX)
    const upgradeOperation = laeX.upgrade({
        amount: amtToUpgrade.toString()
    })

    try {
        console.log(`upgrading $${amt} DAI to DAIx`);
        const amtToUpgrade = ethers.utils.parseEther(amt.toString());
        const upgradeOperation = laeX.upgrade({
          amount: amtToUpgrade.toString()
        });
        const upgradeTxn = await upgradeOperation.exec(signer);
        await upgradeTxn.wait().then(function (tx) {
          console.log(
            `
            Congrats - you've just upgraded DAI to DAIx!
          `
          );
        });
      } catch (error) {
        console.error(error);
      }

    // try {
    //     const upgradeTxn = await upgradeOperation.exec(signer);
    //     await upgradeTxn.wait().then(function (tx) {
    //         console.log(
    //           `
    //           Congrats - you've just upgraded LAE to LAEx!
    //         `
    //         );
    //     })
    // } catch(err) {
    //     console.log(err.message);
    // }
}
// approveToken();
upgradeToken();

// const transferToken = async () => {
//     const sf = await Framework.create({
//         chainId: 5,
//         provider: customHttpProvider
//       });
    
//     const signer = sf.createSigner({
//         privateKey:
//           "e3f4cd385c1834aba7227db3b6468cf1805a2831463042781c529a1beacf9f25",
//         provider: customHttpProvider
//       });

//     const fDAIx = await sf.loadSuperToken('fDAIx');
//     const txn = await fDAIx.transfer("0xb1B9ceEb2A1eE407caaf918830D37EC6bd0A8401", ethers.utils.parseEther(amt.toString()))
//     // const Sendtxn = await txn.exec(signer);
//     // console.log(Sendtxn);
// }

// transferToken();