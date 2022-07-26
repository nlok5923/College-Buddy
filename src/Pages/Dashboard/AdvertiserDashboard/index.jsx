import { React, useContext, useEffect, useState } from "react"
import PostCard from "../../../Components/InstituteCard/index";
import './AdvertiserDashboard.scss'
import { fetchInstitutes } from '../../../Services/AdvertiserUtilities'
import { UserContext } from "../../../Provider/UserProvider";
import { ContractContext } from "../../../Provider/ContractProvider"
import { ethers } from "ethers";
import institueManager from '../../../Ethereum/InstituteFundsManager.json'

const AdvertiserDashboard = () => {
    const [instData, setInstData] = useState([]);
    const { user, isLoading } = useContext(UserContext);
    const contractData = useContext(ContractContext);
    
    // const fetchData = async () => {
    //     let data = await fetchInstitutes()
    //     // console.log("fetched ", data);
    //     setInstData(data);
    // }

    // useEffect(() => {
    //     fetchData();
    // }, [user, isLoading])

    const getAllInstitutes = async () => {
        try {
            let instituteInfo = [];
            let instituteData = await contractData.contract.getALlInstitutesManager();
            for(let i=0;i<instituteData.length;i++) {
                let ethProvider = new ethers.providers.Web3Provider(window.ethereum);
                let contractInstance = new ethers.Contract(instituteData[i][1], institueManager.abi, ethProvider.getSigner(0));
                const streams = await contractInstance.getAllStreams();
                console.log(" these are institute streams", streams);
                instituteInfo.push({
                    name: instituteData[i][0],
                    address: instituteData[i][1],
                    streamInfo: streams,
                    instId: instituteData[i][2]
                });
            }
            setInstData(instituteInfo);
            console.log("final institute data ", instituteInfo);
        } catch(err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getAllInstitutes();
    }, [contractData])

    return(
        <div>
            <div className="page-container">
                {instData.map((data, id) => <PostCard key={id} postData={data} />)}
            </div>
        </div>
    )
}

export default AdvertiserDashboard;