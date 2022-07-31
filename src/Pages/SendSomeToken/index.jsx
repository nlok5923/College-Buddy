    // let ethProvider = new ethers.providers.Web3Provider(window.ethereum);
    // let contractInstance = new ethers.Contract(contractAddress, InstituteFundsManagerFactoryArtifact.abi, ethProvider.getSigner(0));
    // let distributeContractInstance = new ethers.Contract(distributeTokenAddress, DistributeTokencontractArtifact.abi, ethProvider.getSigner(0));
    // let learnAndEarnContractInstance = new ethers.Contract(learnAndEarnTokenAddress, LearnAndEarnArtifact.abi, ethProvider.getSigner(0));
    // let poaContractInstance = new ethers.Contract(poaContractAddress, ProofOfAttendenceArtifact.abi, ethProvider.getSigner(0))
    // let fDaixContractInstance = new ethers.Contract(fDaixContractAddress, LearnAndEarnArtifact.abi, ethProvider.getSigner(0))
    // setContract(contractInstance);

import { ethers } from "ethers";
import { useState } from "react";
import TokenContractArtifact from '../../Ethereum/LearnAndEarn.json'
import DistributorArtifact from "../../Ethereum/DistributeToken.json"
// import InstituteFundsManagerArtifact from '../../Ethereum/InstituteFundsManager.json'

const InstituteFundsManagerArtifact =[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_instituteManagerAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_noOfModules",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_noOfTokens",
				"type": "uint256"
			}
		],
		"name": "addModule",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_streamCode",
				"type": "string"
			}
		],
		"name": "addStreams",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allStreams",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_streamCode",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_noOfTokens",
				"type": "uint256"
			}
		],
		"name": "depositFundsToStream",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllStreams",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getReward",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_streamCode",
				"type": "string"
			}
		],
		"name": "getStreamFunds",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "instituteName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "oldStreamBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "redeemToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "streamBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_streamCode",
				"type": "string"
			}
		],
		"name": "transferFundsToDistribute",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const Send = () => {
    const instituteFundsManagerAddress = "0xCFC7DbeBE8C136190d0eb418C5e3a39798579d8f";
    const distributorContractAddress = "0x57d7aE3d557ED09d40f887a8Eb0CE2879D71A09f";
    const fDAiXContractAddress = "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00"
    const [tokens, setTokens] = useState(0);
    const [balance, setBalance] = useState(0);
    const [dbalance, setDbalance] = useState(0);
    const [streamBalance, setStreamBalance] = useState(0);

    const transferToken = async () => {
        try {
            let ethProvider = new ethers.providers.Web3Provider(window.ethereum);
            let fDaixContractInstance = new ethers.Contract(fDAiXContractAddress, TokenContractArtifact.abi, ethProvider.getSigner(0));
            // let InstituteManagerContractInstance = new ethers.Contract(instituteFundsManagerAddress, InstituteFundsManagerArtifact.abi, ethProvider.getSigner(0)); 
            // setBalance(parseInt(balance._hex));
            // let balance = await InstituteManagerContractInstance.getContractBalance();
            let txn = await fDaixContractInstance.transfer(instituteFundsManagerAddress,  ethers.utils.parseEther(String(tokens)));
            let tnn = await txn.wait();
            // await InstituteManagerContractInstance.depositFundsToStream("CSE", tokens, { gasLimit: 9000000 });
            // contractData.distributeTokenAddress, ethers.utils.parseEther(String(amt))
            // setContract(contractInstance);            
        } catch (err) {
            console.log(err.message);
        }
     }

     const updateBalance = async () => {
        try {
            let ethProvider = new ethers.providers.Web3Provider(window.ethereum);
            let InstituteManagerContractInstance = new ethers.Contract(instituteFundsManagerAddress, InstituteFundsManagerArtifact, ethProvider.getSigner(0)); 
            let balance = await InstituteManagerContractInstance.getContractBalance();
            setBalance(parseInt(balance._hex) / 10**18);
            // console.log(balance);
        } catch (err) {
            console.log(err);
        }
     }

     const tansferFunds = async () => {
        try {
            let ethProvider = new ethers.providers.Web3Provider(window.ethereum);
            let InstituteManagerContractInstance = new ethers.Contract(instituteFundsManagerAddress, InstituteFundsManagerArtifact, ethProvider.getSigner(0)); 
            let txn = await InstituteManagerContractInstance.transferFundsToDistribute("CSE", { gasLimit: 9000000 });
            let tf = await txn.wait();
            // setBalance(parseInt(balance._hex) / 10**18);
            // console.log(balance);
        } catch (err) {
            console.log(err);
        }
     }


     const updateDBalance = async () => {
        try {
            let ethProvider = new ethers.providers.Web3Provider(window.ethereum);
            let fDaixContractInstance = new ethers.Contract(fDAiXContractAddress, TokenContractArtifact.abi, ethProvider.getSigner(0));

            let balance = await fDaixContractInstance.balanceOf(distributorContractAddress);
            console.log(balance);
            setDbalance(parseInt(balance._hex));
        } catch (err) {
            console.log(err);
        }
     }
    //  transferFundsToDistribute

     const deposit = async () => {
        try {
            let ethProvider = new ethers.providers.Web3Provider(window.ethereum);
            // let fDaixContractInstance = new ethers.Contract(fDAiXContractAddress, TokenContractArtifact.abi, ethProvider.getSigner(0));
            let InstituteManagerContractInstance = new ethers.Contract(instituteFundsManagerAddress, InstituteFundsManagerArtifact, ethProvider.getSigner(0)); 
            // setBalance(parseInt(balance._hex));
            // let balance = await InstituteManagerContractInstance.getContractBalance();
            // let txn = await fDaixContractInstance.transfer(instituteFundsManagerAddress,  ethers.utils.parseEther(String(tokens)));
            // txn.wait();
            await InstituteManagerContractInstance.depositFundsToStream("CSE", tokens, { gasLimit: 9000000 });
        } catch (err) {
            console.log(err);
        }
     }

     const updateStreamBalance = async () => {
        try {
            let ethProvider = new ethers.providers.Web3Provider(window.ethereum);
            // let fDaixContractInstance = new ethers.Contract(fDAiXContractAddress, TokenContractArtifact.abi, ethProvider.getSigner(0));
            let InstituteManagerContractInstance = new ethers.Contract(instituteFundsManagerAddress, InstituteFundsManagerArtifact, ethProvider.getSigner(0)); 
            // setBalance(parseInt(balance._hex));
            // let balance = await InstituteManagerContractInstance.getContractBalance();
            // let txn = await fDaixContractInstance.transfer(instituteFundsManagerAddress,  ethers.utils.parseEther(String(tokens)));
            // txn.wait();
            let balance = await InstituteManagerContractInstance.getStreamFunds("CSE");
            console.log(balance);
            setStreamBalance(parseInt(balance._hex));
        } catch (err) {
            console.log(err);
        }
     }

    return(
        <div>
            <input type='number' onChange={(e) => setTokens(e.target.value)} />
            <button onClick={() => transferToken()}> send </button>
            <button onClick={() => deposit()}> deposit </button>
            <button onClick={() => updateBalance()}> Update </button>
            <button onClick={() => updateDBalance()}> Update d balance </button>
            <button onClick={() => tansferFunds()}> transfer </button>
            <button onClick={() => updateStreamBalance()}> stream balance </button>
            <h3>balance: {balance} </h3>
            <h3>Distributor address: {dbalance} </h3>
            <h3>Stream balance: {streamBalance} </h3>
        </div>
    )
}

export default Send;

// let ethProvider = new ethers.providers.Web3Provider(window.ethereum);
// let contractInstance = new ethers.Contract(contractAddress, InstituteFundsManagerFactoryArtifact.abi, ethProvider.getSigner(0));
// let distributeContractInstance = new ethers.Contract(distributeTokenAddress, DistributeTokencontractArtifact.abi, ethProvider.getSigner(0));
// let learnAndEarnContractInstance = new ethers.Contract(learnAndEarnTokenAddress, LearnAndEarnArtifact.abi, ethProvider.getSigner(0));
// let poaContractInstance = new ethers.Contract(poaContractAddress, ProofOfAttendenceArtifact.abi, ethProvider.getSigner(0))
// let fDaixContractInstance = new ethers.Contract(fDaixContractAddress, LearnAndEarnArtifact.abi, ethProvider.getSigner(0))
// setContract(contractInstance);

  //! need to update it after deploying distributeToken
//   const distributeTokenAddress = "0x57d7aE3d557ED09d40f887a8Eb0CE2879D71A09f"
//   const learnAndEarnTokenAddress = "0xC760202A0d87ECD6b53a8bbc72FF63a9b411986D"
//   const poaContractAddress = "0x372aD2f2bC12146971991e09271f3ABce0d4604b"
//   const fDaixContractAddress = "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00"