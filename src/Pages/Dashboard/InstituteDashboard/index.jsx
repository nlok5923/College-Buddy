import React, { useState, useContext, useEffect } from "react";
import './InstituteDashboard.scss'
import { Avatar, List, Modal } from 'antd';
import { AddStreams, fetchStreams } from "../../../Services/InstituteUtilities";
import { UserContext } from "../../../Provider/UserProvider";
import { Link } from "react-router-dom";
import { ContractContext } from "../../../Provider/ContractProvider";
import toast, { Toaster } from 'react-hot-toast'
import { ethers } from "ethers";
import instituteManager from '../../../Ethereum/InstituteFundsManager.json'

const InstituteDashboard = () => {
    const contractData = useContext(ContractContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [instituteContract, setInstituteContract] = useState(null);
    const [address, setInstAddress] = useState('');
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

    const getInstituteContract = (_address) => {
        let ethProvider = new ethers.providers.Web3Provider(window.ethereum);
        let contractInstance = new ethers.Contract(_address, instituteManager.abi, ethProvider.getSigner(0));
        setInstituteContract(contractInstance);
    }

    const getInstituteAddress = async () => {
        try {
            let data = await contractData.contract.getALlInstitutesManager();
            console.log("resp from bc", data);
            setInstAddress(data[0][1]);
            getInstituteContract(data[0][1]);
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getInstituteAddress();
    }, [contractData])

    const backgroundStyling = {
        backgroundImage: `url("asset/Registration/institute/stream-bg.png")`,
        backgroundRepeat: "no-repeat",
        height: "100vh",
        backgroundSize: "100% 100%",
    };

    const handleOk = async () => {
        console.log(streamData)
        try {
            if (!instituteContract) {
                toast.error("Please connect metamask first and make sure you init institute first !!");
            } else {
                await AddStreams(user.uid, streamData.name, streamData.description);
                let txn = await instituteContract.addStreams(streamData.description);
                txn.wait();
                window.location.reload();
            }
            setIsModalVisible(false);
        } catch (err) {
            console.log("while adding streams", err.message);
        }
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

    const initInstitute = async () => {
        try {
            if (contractData.contract) {
                let txn = await contractData.contract.addInstitute(name, user.uid);
                txn.wait();
                window.location.reload();
            } else {
                toast.error("Please connect metamask !!");
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div>
            <Toaster />
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

                                <p>
                               Address: {address !== '' ? address.slice(0, 11) + "..." : "Please connect"}
                            </p>
                            </h1>
                            <div className="dashboard-inst-input">
                                {!address && <div>
                                    <input type="text" placeholder="Enter inst unique code" onChange={(e) => setName(e.target.value)} />
                                    <button onClick={() => initInstitute()}>
                                        Init Institute
                                    </button>
                                </div>
                                }
                                <List
                                    size="large"
                                    itemLayout="horizontal"
                                    dataSource={streams}
                                    renderItem={(item) => (
                                        <List.Item style={{ fontFamily: "montserrat", fontSize: "20px" }} actions={[<Link to={`/institute-dashboard/${item.id}`}> Add Assignments </Link>]}>
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