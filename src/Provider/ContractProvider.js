import { useState, useEffect, createContext } from "react";
import { Contract, ethers } from 'ethers'
import InstituteFundsManagerFactoryArtifact from '../Ethereum/InstituteFundsManagerFactory.json'
// import contractArtifact from '../Ethereum/Post.json'

export const ContractContext = createContext("appContext");

const ContractProvider = (props) => {

  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState('');

  // Compiled 2 Solidity files successfully
  // Institute Funds manager contract address:  0xc4DbE9b781683717D22970376efEd71652D9e979
  // Factory contract address:  0x40eE5D2dbaBd572824c457a157901F6CfB23056c
  const contractAddress = "0x545683ed9787c2420998B561b7151bA99e314daC"
  const _initEthers = async () => {
    let ethProvider = new ethers.providers.Web3Provider(window.ethereum);
    let contractInstance = new ethers.Contract(contractAddress, InstituteFundsManagerFactoryArtifact.abi, ethProvider.getSigner(0));
    setContract(contractInstance);
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
    <ContractContext.Provider value = {{ contract, address, _initApp }}> {props.children} </ContractContext.Provider>
  );
};

export default ContractProvider;