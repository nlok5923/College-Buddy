import React, { useState, useContext, useEffect } from "react";
import './InstituteDashboard.scss'
import { Avatar, List, Modal } from 'antd';
import { AddStreams, fetchStreams } from "../../../Services/InstituteUtilities";
import { UserContext } from "../../../Provider/UserProvider";
import { Link } from "react-router-dom";

const InstituteDashboard = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [streamData, setStreamData] = useState({
        name: "",
        description: ""
    })
    const [streams, setStreams] = useState([]);

    const info = useContext(UserContext);
    const { user, isLoading } = info;

    const getAllStreams = async () => {
        try {
            let resp = await fetchStreams(user.uid);
            console.log(resp);
            setStreams(resp);
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        getAllStreams();
    }, [user, isLoading])

    const backgroundStyling = {
        backgroundImage: `url("asset/Registration/institute/stream-bg.png")`,
        backgroundRepeat: "no-repeat",
        height: "100vh",
        backgroundSize: "100% 100%",
    };

    const handleOk = async () => {
        console.log(streamData)
        await AddStreams(user.uid, streamData.name, streamData.description);
        setIsModalVisible(false);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    const OpenModal = () => {
        setIsModalVisible(true);
    }

    const handleStreamInfo = (e) => {
        console.log(streamData)
        setStreamData({
            ...streamData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <Modal title="Add Stream" visible={isModalVisible} onOk={() => handleOk()} onCancel={() => handleCancel()}>
                <div className="stream-container">
                    <input type="text" placeholder="Stream name" name="name" onChange={(e) => handleStreamInfo(e)} />
                    <input type="text" placeholder="stream code" name="description" onChange={(e) => handleStreamInfo(e)} />
                </div>
            </Modal>
            <div className="dashboard-inst">
                <div className="dashboard-inst-container">
                    <div className="dashboard-inst-container-bg" style={backgroundStyling}>
                        <h1>Hey Institute</h1>
                        <p>Add some streams</p>
                    </div>
                    <div className="dashboard-inst-container-inputarea">
                        <div className="dashboard-inst-container-inputarea-boxarea">
                            <h1>
                                <b>
                                    <strong>Add Streams</strong>
                                </b>
                            </h1>

                            <div className="dashboard-inst-input">
                                <List
                                    size="large"
                                    itemLayout="horizontal"
                                    dataSource={streams}
                                    renderItem={(item) => (
                                        <List.Item style={{ fontFamily: "montserrat", fontSize: "20px" }} actions={[<Link to={`/institute-dashboard/${item.id}`}> Add Courses </Link>]}>
                                            <List.Item.Meta
                                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                                title={<a href="https://ant.design">{item.name}</a>}
                                                description={item.description}
                                            />
                                        </List.Item>
                                    )}
                                />

                                <button onClick={OpenModal}>
                                    Add Stream
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstituteDashboard;