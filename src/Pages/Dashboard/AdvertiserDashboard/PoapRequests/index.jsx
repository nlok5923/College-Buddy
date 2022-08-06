import React, { useContext, useEffect, useState } from "react"
import './PoapRequests.scss';
import { Card, Avatar, Popover, List } from "antd";
import { DashboardFilled, SettingOutlined, LinkOutlined } from "@ant-design/icons";
import { UserContext } from "../../../../Provider/UserProvider";
import { getAllClaims, PoapClaimed } from "../../../../Services/AdvertiserUtilities";
import Axios from 'axios';
import { ContractContext } from "../../../../Provider/ContractProvider"
import Loader from '../../../../Components/Loader/index'
import toast, { Toaster } from 'react-hot-toast'
import { useMoralis } from "react-moralis"
import { Link } from "react-router-dom"

// REACT_APP_PINATA_API_KEY="5dbd25d2575c28d30c75"
// REACT_APP_PINATA_API_SECRET="31e6245d30d45e928d0bdc05fec2b83914663311976825e465d1a57fa1af5c7c"
const PoapRequest = () => {
    const { authenticate, isAuthenticated, user } = useMoralis();
    // const { user, isLoading } = useContext(UserContext);
    const contractData = useContext(ContractContext);
    const { Meta } = Card;
    const [loading, setIsLoading] = useState(false);
    const [req, setReq] = useState([]);
    const getAllClaimsRequest = async () => {
        try {
            if (user) {
                setIsLoading(true);
                let data = await getAllClaims(user.id);
                console.log("all claims ", data);
                setReq(data);
                setIsLoading(false);
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getAllClaimsRequest();
    }, [user])

    const getMetaDataUri = async (data) => {
        try {
            if (contractData.poaContract) {
                setIsLoading(true);
                const res = await Axios({
                    method: "post",
                    url: process.env.REACT_APP_PINATA_API_URL,
                    data: JSON.stringify({
                        name: data.name,
                        contribution: data.contribution,
                        about: data.about,
                        description: data.contribution, 
                        imageUrl: data.imageUrl,
                        image: data.imageUrl,
                    }),
                    headers: {
                        'pinata_api_key': process.env.REACT_APP_PINATA_API_KEY,
                        'pinata_secret_api_key': process.env.REACT_APP_PINATA_API_SECRET,
                        "Content-Type": "Application/json"
                    },
                });
                console.log(" these is res ", res.data.IpfsHash);
                let nftTxn = await contractData.poaContract.safeMint(data.address, res.data.IpfsHash, { gasLimit: 9000000 })
                let tn = await nftTxn.wait();
                await PoapClaimed(user.id, data.id);
                setIsLoading(false);
                toast.success("Poap minted successfully to " + data.address.slice(0, 7) + "...");
                getAllClaimsRequest();
            } else {
                toast.error("Please connect metamask first ");
            }
        } catch (err) {
            setIsLoading(false);
            toast.error("Some error occured");
            console.log(err.message);
        }
    }

    const backgroundStyling = {
        backgroundImage: `url("/asset/general/images/lfg-2.png")`,
        backgroundRepeat: "no-repeat",
        height: "100vh",
        backgroundSize: "100% 100%",
    };
    let poapReqCount = 0;

    return (
        <Loader isLoading={loading} message={"Loading all your POA..."}>
            <div className="poap-dashboard">
                <div className="poap-dashboard-bg" style={backgroundStyling}>
                    <h1> POA requests</h1>
                    <p>Check the legitimacy and issue the POA tokens </p>
                </div>
                <div className="poap-dashboard-content">
                    <div className="poap-page">
                        <Toaster />
                        {req.length === 0 ? <h3 className="no-request">
                            No Poap Request at the moment
                        </h3>
                            : <h2>
                                <b> All your Poap requests are lined up here  </b>
                            </h2>}

                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: (page) => {
                                    console.log(page);
                                },
                                pageSize: 1,
                            }}
                            dataSource={req}
                            renderItem={(data, id) => {
                                poapReqCount++;
                                return (<Card className="poap-page-query-card" title={`Poap Request #${poapReqCount}`}
                                    actions={[
                                        <Popover content={"Mint it"}> <SettingOutlined onClick={() => getMetaDataUri(data)} key="setting" /> </Popover>,
                                    ]}
                                    extra={data.claimed ? "Claimed" : "Not Claimed"}
                                >
                                    <h4> <b>
                                        Event name:
                                    </b>
                                    </h4>
                                    <p>{data.name}</p>
                                    <h4>
                                        <b>
                                            What event about:
                                        </b>
                                    </h4>
                                    <p>
                                        {data.about}
                                    </p>
                                    <h4> <b>
                                        How you contributed:
                                    </b>
                                    </h4>
                                    <p>{data.contribution}</p>
                                    <h4> <b>
                                        Image url:
                                    </b>
                                    </h4>
                                    <Link onClick={() => {
                                        window.location.href = data.imageUrl
                                    }}>
                                        <LinkOutlined /> Link to image file
                                    </Link>
                                    <Meta
                                        style={{ marginTop: "20px" }}
                                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                        title={"By " + data.address.slice(0, 7) + "..."}
                                    />
                                </Card>)

                            }}
                        >
                        </List>
                    </div>
                </div>
            </div>
        </Loader>
    )
}

export default PoapRequest;

