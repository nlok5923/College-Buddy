import React, { useContext, useEffect, useState } from "react"
import './PoapRequests.scss';
import { Card, Avatar, Popover } from "antd";
import { DashboardFilled, SettingOutlined } from "@ant-design/icons";
import { UserContext } from "../../../../Provider/UserProvider";
import { getAllClaims } from "../../../../Services/AdvertiserUtilities";
import Axios from 'axios';
import { ContractContext } from "../../../../Provider/ContractProvider"

// REACT_APP_PINATA_API_KEY="5dbd25d2575c28d30c75"
// REACT_APP_PINATA_API_SECRET="31e6245d30d45e928d0bdc05fec2b83914663311976825e465d1a57fa1af5c7c"
const PoapRequest = () => {
    const { user, isLoading } = useContext(UserContext);
    const contractData = useContext(ContractContext);
    const { Meta } = Card;
    const [req, setReq] = useState([]);
    const getAllClaimsRequest = async () => {
        try {
            if(user) {
                let data = await getAllClaims(user.uid);
                console.log("all claims ", data);
                setReq(data);
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
            const res = await Axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
                data: JSON.stringify({
                    name: data.name,
                    contribution: data.contribution,
                    about: data.about,
                    imageUrl: data.imageUrl
                }),
                headers: {
                    'pinata_api_key': "5dbd25d2575c28d30c75",
                    'pinata_secret_api_key': "31e6245d30d45e928d0bdc05fec2b83914663311976825e465d1a57fa1af5c7c",
                    "Content-Type": "Application/json"
                },
            });
            console.log(" these is res ", res.data.IpfsHash);
            await contractData.poaContract.safeMint(data.address, res.data.IpfsHash)
            
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="poap-page">
            <h2><b>
                All you Poap requests are lined up here:
            </b>
            </h2>
            <div className="poap-page-query">
                {
                    req.map((data, id) => <Card className="poap-page-query-card" title={`Poap Request #${id + 1}`}
                        actions={[
                            <Popover content={"Mint it"}> <SettingOutlined onClick={() => getMetaDataUri(data)}  key="setting" /> </Popover>,
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
                        <p> {data.imageUrl} </p>
                        <Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title={"By " + data.address.slice(0, 7) + "..."}
                        />
                    </Card>
                    )
                }
            </div>
        </div>
    )
}

export default PoapRequest;

