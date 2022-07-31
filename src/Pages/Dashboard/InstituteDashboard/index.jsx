import React, { useState, useContext, useEffect } from "react";
import './InstituteDashboard.scss'
import { Avatar, List, Modal } from 'antd';
import { AddStreams, fetchStreams, updateInstitute, getInstitute } from "../../../Services/InstituteUtilities";
import { UserContext } from "../../../Provider/UserProvider";
import { Link } from "react-router-dom";
import { ContractContext } from "../../../Provider/ContractProvider";
import toast, { Toaster } from 'react-hot-toast'
import { ethers } from "ethers";
import instituteManager from '../../../Ethereum/InstituteFundsManager.json'
import Loader from '../../../Components/Loader/index'

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
    const [loading, setIsLoading] = useState(false);
    const [streams, setStreams] = useState([]);
    const [instInfoModal, setInstInfoModal] = useState(false);
    const [inst, setInst] = useState({
        name: '',
        description: ''
    })

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

    const getInstInfo = async () => {
        let data = await getInstitute(user.uid);
        console.log(" this is inst data ", data);
        if(!data) {
            setInstInfoModal(true);
        }
    }
    useEffect(() => {
        getAllStreams();
        if(user && !isLoading) {
            getInstInfo();
        }
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
                setIsLoading(true);
                let txn = await instituteContract.addStreams(streamData.description);
                let receipt = await txn.wait();
                setIsLoading(false);
                toast.success("Stream added successfully !!");
                window.location.reload();
            }
            setIsModalVisible(false);
        } catch (err) {
            toast.error("Something bad happened !!");
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
                setIsLoading(true);
                // contractData.address is the institute's contract address
                let txn = await contractData.contract.addInstitute(name, user.uid, contractData.address);
                let receipt = await txn.wait();
                setIsLoading(false);
                toast.success("Institute added successfully !!");
                window.location.reload();
            } else {
                toast.error("Please connect metamask !!");
            }
        } catch (err) {
            toast.error("Something bad happened !!");
            console.log(err.message);
        }
    }

    const handleInstOk = async () => {
        try {
            await updateInstitute(user.uid, inst.name, inst.description);
            setInstInfoModal(false);
            toast.success("Institute info updated successfully !!");
        } catch (err) {
            toast.error("Error updating institute info !!");
            console.log(err.message);
        }
    }

    const handleInstCancel = () => {
        setInstInfoModal(false);
    }

    const handleInstituteInfo = (e) => {
        setInst({
            ...inst,
            [e.target.name]: e.target.value
          })
    }

    return (
        <div>
            <Toaster />
            <Loader isLoading={loading}>
            <Modal title="Add Stream" visible={isModalVisible} onOk={() => handleOk()} onCancel={() => handleCancel()}>
                <div className="stream-container">
                    <input type="text" placeholder="Stream name" name="name" onChange={(e) => handleStreamInfo(e)} />
                    <input type="text" placeholder="stream code" name="description" onChange={(e) => handleStreamInfo(e)} />
                </div>
            </Modal>
            <Modal title="Provide Info" visible={instInfoModal} onOk={() => handleInstOk()} onCancel={() => handleInstCancel()}>
                <div className="stream-container">
                    <input type="text" placeholder="Enter institute name" name="name" onChange={(e) => handleInstituteInfo(e)} />
                    <textarea className="desc-textarea" type="text" placeholder="About inst" name="description" onChange={(e) => handleInstituteInfo(e)} />
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
                                    <strong>Init & Add Streams</strong>
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
                                <h4>Institute Id: {user ? user.uid: null}</h4>
                                <List
                                    style = {{ 
                                        marginTop: "20px"
                                     }}
                                    size="large"
                                    itemLayout="horizontal"
                                    dataSource={streams}
                                    renderItem={(item) => (
                                        <List.Item style={{ fontFamily: "montserrat", fontSize: "20px" }} actions={[<span>Stream Id: {item.id}</span>, <Link to={`/institute-dashboard/${item.id}`}> Add Assignments </Link>]}>
                                            <List.Item.Meta
                                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                                title={<a>{item.name}</a>}
                                                description={item.description}
                                            />
                                            {/* <h5> {item.id} </h5> */}
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
            </Loader>
        </div>
    )
}

export default InstituteDashboard;