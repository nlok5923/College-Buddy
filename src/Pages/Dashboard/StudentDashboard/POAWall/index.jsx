import React, { useEffect, useContext, useState } from "react"
import './POAWall.scss'
import { ContractContext } from "../../../../Provider/ContractProvider"
import Axios from 'axios'
import POACard from "../../../../Components/POACard"

const POAWall = () => {
    const contractData = useContext(ContractContext);
    const [poaData, setPOAData] = useState([]);

    const fetchAllPOANFts = async () => {
        try {
            if(contractData.poaContract) {
                let tokenCount = await contractData.poaContract.tokenCount();
                tokenCount = parseInt(tokenCount._hex);
                console.log(tokenCount);
                for(let i = 0; i < tokenCount; i++) {
                    let nftUri = await contractData.poaContract.tokenURI(i);
                    let tokenOwner = await contractData.poaContract.ownerOf(i);
                    console.log(nftUri);
                    let nftMetaData = await Axios.get(nftUri);
                    console.log(" this is meta data ", nftMetaData);
                    console.log("he is the token owner ", tokenOwner);
                    if(tokenOwner.toLowerCase() === contractData.address) {
                        console.log(" we are here as well ");
                        const { name, about, contribution, imageUrl } = nftMetaData.data;
                        setPOAData([
                            ...poaData, {
                                name: name,
                                about: about,
                                contribution: contribution,
                                imageUrl: imageUrl
                            }
                        ])
                    }
                 }
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchAllPOANFts();
    }, [contractData])

    return (
        <div className="poa-wall">
            <h2> All your Poaps are here </h2>
            <div className="poa-wall-container">
                {poaData.map((data, id) => <POACard key={id} nftData={data} />)}
            </div>
        </div>
    )
}

export default POAWall;