import { useState, createContext } from "react";
import { ethers } from 'ethers'
import InstituteFundsManagerFactoryArtifact from '../Ethereum/InstituteFundsManagerFactory.json'
import DistributeTokencontractArtifact from '../Ethereum/DistributeToken.json'
import LearnAndEarnArtifact from '../Ethereum/LearnAndEarn.json'

export const ContractContext = createContext("appContext");
const ContractProvider = (props) => {

  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState('');
  const [idaContract, setIdaContract] = useState(null);
  const [laeContract, setLaeContractInstance] = useState(null);

  // Compiled 10 Solidity files successfully
  // Institute Funds manager contract address:  0xb9EC8eaF71f1bA70Bf4a06Eb145fc8fC438Dc944
  // Factory contract address:  0xc339A2223Be14cFe6e85421078a49A8d48620437
  const contractAddress = "0x5859E56028Ca743aCb789FDA7B9a9880Bc222d9f"
  const distributeTokenAddress = "0xb1B9ceEb2A1eE407caaf918830D37EC6bd0A8401"
  const learnAndEarnTokenAddress = "0xC760202A0d87ECD6b53a8bbc72FF63a9b411986D"
  const _initEthers = async () => {
    let ethProvider = new ethers.providers.Web3Provider(window.ethereum);
    let contractInstance = new ethers.Contract(contractAddress, InstituteFundsManagerFactoryArtifact.abi, ethProvider.getSigner(0));
    let distributeContractInstance = new ethers.Contract(distributeTokenAddress, DistributeTokencontractArtifact.abi, ethProvider.getSigner(0));
    let learnAndEarnContractInstance = new ethers.Contract(learnAndEarnTokenAddress, LearnAndEarnArtifact.abi, ethProvider.getSigner(0));
    setContract(contractInstance);
    setIdaContract(distributeContractInstance);
    setLaeContractInstance(learnAndEarnContractInstance);
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
    <ContractContext.Provider value = {{ contract, address, _initApp, idaContract, laeContract }}> {props.children} </ContractContext.Provider>
  );
};

export default ContractProvider;