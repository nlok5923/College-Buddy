import { React, useContext, useEffect, useState } from "react"
import PostCard from "../../../Components/InstituteCard/index";
import './AdvertiserDashboard.scss'
import { fetchInstitutes, getInstituteData } from '../../../Services/AdvertiserUtilities'
import { UserContext } from "../../../Provider/UserProvider";
import { ContractContext } from "../../../Provider/ContractProvider"
import { ethers } from "ethers";
import institueManager from '../../../Ethereum/InstituteFundsManager.json'
import { Link, useHistory } from "react-router-dom";
import Loader from "../../../Components/Loader/index"
import { Avatar, List, Space, Card } from "antd"
import { useMoralis } from "react-moralis"

const AdvertiserDashboard = () => {
    const { authenticate, isAuthenticated, user } = useMoralis();
    const [instData, setInstData] = useState([]);
    // const { user, isLoading } = useContext(UserContext);
    const contractData = useContext(ContractContext);
    const history = useHistory();
    const [currentUserId, setCurrentUserId] = useState('');
    const [loading, setIsLoading] = useState(false);

    const getAllInstitutes = async () => {
        console.log("called ");
        try {
            setIsLoading(true);
            let instituteInfo = [];
            let instituteData = await contractData.contract.getALlInstitutesManager();
            for (let i = 0; i < instituteData.length; i++) {
                let ethProvider = new ethers.providers.Web3Provider(window.ethereum);
                let contractInstance = new ethers.Contract(instituteData[i][1], institueManager.abi, ethProvider.getSigner(0));
                const streams = await contractInstance.getAllStreams();
                console.log(" these are institute streams", streams);
                let instData = await getInstituteData(instituteData[i][2])
                instituteInfo.push({
                    name: instituteData[i][0],
                    address: instituteData[i][1],
                    streamInfo: streams,
                    instId: instituteData[i][2],
                    displayName: instData.displayName || "None",
                    about: instData.about || "Abhi kal hi bana"
                });
            }
            setInstData(instituteInfo);
            console.log("final institute data ", instituteInfo);
            setIsLoading(false);
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getAllInstitutes();
    }, [contractData])

    useEffect(() => {
        console.log(" this is not running ", user);
        if (user) {
            console.log("updating", user);
            setCurrentUserId(user.id);
        }
    }, [user])

    // const send = async () => {
    //     try {
    //         let ethProvider = new ethers.providers.Web3Provider(window.ethereum);
    //         let contractInstance = new ethers.Contract("0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00", contractAbi.abi, ethProvider.getSigner(0));
    //         let amt = 10000;
    //         await contractInstance.transfer("0xa7bc31db05BB5D085029F630dD6cC9161d422C7E", ethers.utils.parseEther(amt.toString()), {
    //             gasLimit: 9000000
    //         });
    //     } catch(err) {
    //         console.log(err.message);
    //     }
    // }

    const setLoading = (loadingState) => {
        setIsLoading(loadingState);
    }

    return (
        <div
        // style={{
        //     backgroundImage: `url(asset/general/images/bg.png)`,
        //     backgroundRepeat: "no-repeat",
        //     backgroundSize: "100% 100%",
        //     height: "95vh"
        // }}
        >
            <Loader isLoading={loading}>
                <Link to={`/advertiser-dashboard/${currentUserId}`}>
                    <p className="poap-request">All POAP requests</p>
                </Link>
                <h3 className="no-inst">
                    {instData.length === 0 ? "No institutes registered or check are you connected or not " : ''}
                </h3>
                {/* <div className="page-container">
                    {instData.map((data, id) => <PostCard loadingState={setLoading} key={id} postData={data} />)}
                </div> */}
                <div className="inst-list">
                    <Card>
                        <List
                            itemLayout="vertical"
                            size="large"
                            dataSource={instData}
                            pagination={{
                                onChange: (page) => {
                                    console.log(page);
                                },
                                pageSize: 3,
                            }}
                            renderItem={(item, id) => (
                                <PostCard loadingState={setLoading} key={id} postData={item} />
                            )}
                        />
                    </Card>
                </div>
            </Loader>
            {/* <button onClick={() => send()} > Send </button> */}
        </div>
    )
}

export default AdvertiserDashboard;