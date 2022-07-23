// import { useState, useEffect, createContext } from "react";
// import { ethers } from 'ethers'
// // import contractArtifact from '../Ethereum/Post.json'

// export const UserContext = createContext("appContext");

// const UserProvider = (props) => {

//   const [contract, setContract] = useState(null);
//   const [address, setAddress] = useState('');

//   const contractAddress = "0x9221B403EC72C60CC5aF8ff681E1F6eFaFD3E25a"
//   const _initEthers = async () => {
//     let ethProvider = new ethers.providers.Web3Provider(window.ethereum);
//     let contractInstance = new ethers.Contract(contractAddress, contractArtifact.abi, ethProvider.getSigner(0));
//     setContract(contractInstance);
//   }
  
//   const _initApp = async () => {
//     if (window.ethereum === undefined) {
//       // _raiseError();
//       return;
//     }
//     const [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });
//     console.log(selectedAddress);
//     if(selectedAddress !== '') {
//       setAddress(selectedAddress);
//      await _initEthers();
//     }
//     window.ethereum.on("accountsChanged", async ([newAddress]) => {
//       if (newAddress === undefined) {
//         return this._resetState();
//       }
//       const [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });
//       setAddress(selectedAddress);
//     })

//   }
  
//   return (
//     // eslint-disable-next-line react/prop-types
//     <UserContext.Provider value = {{ contract, address, _initApp }}> {props.children} </UserContext.Provider>
//   );
// };

// export default UserProvider;