import { useState, createContext } from "react";
import { ethers } from 'ethers'
import InstituteFundsManagerFactoryArtifact from '../Ethereum/InstituteFundsManagerFactory.json'
import DistributeTokencontractArtifact from '../Ethereum/DistributeToken.json'
import ProofOfAttendenceArtifact from '../Ethereum/ProofOfAttendence.json'
import LearnAndEarnArtifact from '../Ethereum/LearnAndEarn.json'

export const ContractContext = createContext("appContext");
const sfContractAbi = [{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"address","name":"initialAddress","type":"address"}],"name":"initializeProxy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
const ContractProvider = (props) => {

  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState('');
  const [idaContract, setIdaContract] = useState(null);
  const [laeContract, setLaeContractInstance] = useState(null);
  const [poaContract, setPOAContract] = useState(null);
  const [fDaixContract, setfDaixContract] = useState(null);

  // change this address every time you deploy a factory like change it with new factory address
  const contractAddress = "0x4cC97d9053d9ED4E7a1cB92fd387a7a78a8cC410"
  //! need to update it after deploying distributeToken
  const distributeTokenAddress = "0x31F1574875DBf52b4A4dCfDD40BC47a2515A4F58"
  const learnAndEarnTokenAddress = "0xC760202A0d87ECD6b53a8bbc72FF63a9b411986D"
  const poaContractAddress = "0x029E028c5DBb1E50b4f44be1aBcCbe9e59c6c919"
  const fDaixContractAddress = "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00"
  const _initEthers = async () => {
    let ethProvider = new ethers.providers.Web3Provider(window.ethereum);
    let contractInstance = new ethers.Contract(contractAddress, InstituteFundsManagerFactoryArtifact.abi, ethProvider.getSigner(0));
    let distributeContractInstance = new ethers.Contract(distributeTokenAddress, DistributeTokencontractArtifact.abi, ethProvider.getSigner(0));
    let learnAndEarnContractInstance = new ethers.Contract(learnAndEarnTokenAddress, LearnAndEarnArtifact.abi, ethProvider.getSigner(0));
    let poaContractInstance = new ethers.Contract(poaContractAddress, ProofOfAttendenceArtifact.abi, ethProvider.getSigner(0))
    let fDaixContractInstance = new ethers.Contract(fDaixContractAddress, LearnAndEarnArtifact.abi, ethProvider.getSigner(0))
    setContract(contractInstance);
    setIdaContract(distributeContractInstance);
    setLaeContractInstance(learnAndEarnContractInstance);
    setPOAContract(poaContractInstance);
    setfDaixContract(fDaixContractInstance);
  }
  
  const _initApp = async () => {
    if (window.ethereum === undefined) {
      // _raiseError();
      return;
    }
    const [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log(selectedAddress);
    if(selectedAddress !== '') {
      setAddress(selectedAddress);
     await _initEthers();
    }
    window.ethereum.on("accountsChanged", async ([newAddress]) => {
      if (newAddress === undefined) {
        return this._resetState();
      }
      const [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAddress(selectedAddress);
    })

  }
  
  return (
    // eslint-disable-next-line react/prop-types
    <ContractContext.Provider value = {{ contract, address, _initApp, idaContract, laeContract, poaContract, fDaixContract, distributeTokenAddress }}> {props.children} </ContractContext.Provider>
  );
};

export default ContractProvider;