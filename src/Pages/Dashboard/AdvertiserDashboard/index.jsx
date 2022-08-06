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

    const setLoading = (loadingState) => {
        setIsLoading(loadingState);
    }

    const backgroundStyling = {
        backgroundImage: `url("/asset/general/images/lfg-1.png")`,
        backgroundRepeat: "no-repeat",
        height: "100vh",
        backgroundSize: "100% 100%",
    };

    return (
        <div>
            <Loader isLoading={loading} message={"Loading advertiser dashboard"}>
                <div className="advt-dashboard">
                    <div className="advt-dashboard-bg" style={backgroundStyling}>
                        <h1> See all the institutes</h1>
                        <p>Choose among which institute you need to promote your advertisement </p>
                    </div>
                    <div className="advt-dashboard-content">
                        <Link to={`/advertiser-dashboard/${currentUserId}`}>
                            {/* <p className="poap-request"> */}
                                <button>
                                All POAP requests
                                    </button>
                            {/* </p> */}
                        </Link>
                        {/* .no-institutes */}
                        {instData.length === 0 ? <h3 className="no-institutes"> No institutes registered or check are you connected or not  </h3> : null}
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
                                        <PostCard style={{ marginTop: "10%" }} loadingState={setLoading} key={id} postData={item} />
                                    )}
                                />
                            </Card>
                        </div>
                    </div>
                </div>
            </Loader>
        </div>
    )
}

export default AdvertiserDashboard;