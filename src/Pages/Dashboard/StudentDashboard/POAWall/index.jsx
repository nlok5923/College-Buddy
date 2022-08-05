import React, { useEffect, useContext, useState } from "react"
import './POAWall.scss'
import { ContractContext } from "../../../../Provider/ContractProvider"
import Axios from 'axios'
import POACard from "../../../../Components/POACard"
import Loader from "../../../../Components/Loader"
import POANFTCard from "../../../../Components/NFTCard"

const POAWall = () => {
    const contractData = useContext(ContractContext);
    const [poaData, setPOAData] = useState([]);
    const [loading, setIsLoading] = useState(false);

    const backgroundStyling = {
        backgroundImage: `url("/asset/general/images/lfg-6.png")`,
        backgroundRepeat: "no-repeat",
        height: "100vh",
        backgroundSize: "100% 100%",
    };

    const fetchAllPOANFts = async () => {
        try {
            if (contractData.poaContract) {
                setIsLoading(true);
                let tokenCount = await contractData.poaContract.tokenCount();
                tokenCount = parseInt(tokenCount._hex);
                console.log(tokenCount);
                let nftData = [];
                for (let i = 0; i < tokenCount; i++) {
                    let nftUri = await contractData.poaContract.tokenURI(i);
                    let tokenOwner = await contractData.poaContract.ownerOf(i);
                    console.log(nftUri);
                    let nftMetaData = await Axios.get(nftUri);
                    console.log(" this is meta data ", nftMetaData);
                    console.log("he is the token owner ", tokenOwner);
                    if (tokenOwner.toLowerCase() === contractData.address) {
                        console.log(" we are here as well ");
                        const { name, about, contribution, imageUrl } = nftMetaData.data;
                        nftData.push({
                            name: name,
                            about: about,
                            contribution: contribution,
                            imageUrl: imageUrl
                        })
                    }
                }
                setPOAData(nftData);
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
        <Loader isLoading={loading} message={"Loading all your POA tokens"}>
            <div className="poa-dashboard">
                <div className="poa-dashboard-bg" style={backgroundStyling}>
                    <h1> All your POA </h1>
                    <p> Use this POA as a proof of attendence </p>
                </div>
                <div className="poa-dashboard-content">
                    <div className="poa-wall">
                        {poaData.length === 0 ? <h3 className="no-poa">
                            No POA issued to you
                        </h3> : <h2> All your POA tokens are here </h2>}
                        <div className="poa-wall-container">
                            {poaData.map((data, id) => <POANFTCard key={id} nftData={data} />)}
                        </div>
                    </div>
                </div>
            </div>
        </Loader>
    )
}

export default POAWall;