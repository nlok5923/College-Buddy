import React, { useEffect, useContext, useState } from "react"
import './POAWall.scss'
import { ContractContext } from "../../../../Provider/ContractProvider"
import Axios from 'axios'
import POACard from "../../../../Components/POACard"
import Loader from "../../../../Components/Loader"

const POAWall = () => {
    const contractData = useContext(ContractContext);
    const [poaData, setPOAData] = useState([]);
    const [loading, setIsLoading] = useState(false);

    const fetchAllPOANFts = async () => {
        try {
            if(contractData.poaContract) {
                setIsLoading(true);
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
                 setIsLoading(false);
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchAllPOANFts();
    }, [contractData])

    return (
        <Loader isLoading={loading}>
        <div className="poa-wall">
            <h2> All your POA tokens are here </h2>
            <div className="poa-wall-container">
                {poaData.length == 0 ? "No POAP issued till now" : null}
                {poaData.map((data, id) => <POACard key={id} nftData={data} />)}
            </div>
        </div>
        </Loader>
    )
}

export default POAWall;