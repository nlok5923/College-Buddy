import { Card, Modal, Avatar, List, Space, Popover } from 'antd';
import './InstituteCard.scss'
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../Provider/UserProvider';
import { addPost, addModule, addEvent, uploadPoapImage, getImageUrl } from '../../Services/AdvertiserUtilities';
import { ethers } from 'ethers';
import instituteManager from "../../Ethereum/InstituteFundsManager.json"
import { ContractContext } from '../../Provider/ContractProvider';
import toast, { Toaster } from "react-hot-toast"
import { FileDoneOutlined, UsergroupAddOutlined, ScheduleOutlined, VideoCameraOutlined, AppstoreAddOutlined, MinusSquareOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { useMoralis } from "react-moralis"

const { Meta } = Card;
const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
const PostCard = (props) => {
    const { authenticate, isAuthenticated, user } = useMoralis();
    const contractData = useContext(ContractContext);
    // const { user, isLoading } = useContext(UserContext);
    const [module, setModule] = useState({
        q1: "",
        q2: "",
        name: "",
    });

    const [multiModule, setMultiModule] = useState([]);

    const handleMutliModuleChange = (questionIndex, e) => {
        let oldQuestions = [...multiModule];
        console.log(" this is question index ", questionIndex + "   " + oldQuestions.length);
        oldQuestions[questionIndex - 1].q = e.target.value;
        setMultiModule(oldQuestions);
    }

    const [moduleName, setModuleName] = useState('');

    const handleAddQuestion = () => {
        let oldModuleData = [...multiModule];
        oldModuleData.push({
            q: ''
        });
        console.log(" updating the multimodule data ", multiModule);
        setMultiModule(oldModuleData);
    }

    const handleDeleteQuestion = () => {
        let oldModuleData = [...multiModule];
        oldModuleData = oldModuleData.slice(0, -1);
        setMultiModule(oldModuleData);
    }

    const [event, setEvent] = useState({
        name: '',
        description: '',
        link: '',
        dnt: ''
    })
    const [eventImage, setEventImage] = useState();
    const [count, setCount] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [eventModal, setEventModal] = useState(false);
    const [cardData, setCardData] = useState({
        title: "",
        description: ""
    })
    const [image, setImage] = useState(null);
    // const 

    const handleOk = async () => {
        try {
            await addPost(props.postData.instId, cardData.title, cardData.description, image, user.id);
            if (!window.ethereum) {
                toast.error("Please connect metamask first");
                setIsModalVisible(false);
            } else {
                props.loadingState(true);
                let ethProvider = new ethers.providers.Web3Provider(window.ethereum);
                let contractInstance = new ethers.Contract(props.postData.address, instituteManager.abi, ethProvider.getSigner(0));
                // await contractData.laeContract.transfer(props.postData.address, String(200 * 1000000000000000000));
                // fDaixContract
                let amt = 2;
                let txn = await contractData.fDaixContract.transfer(props.postData.address, ethers.utils.parseEther(String(amt)));
                let receipt = await txn.wait();
                let streamTxn = await contractInstance.depositFundsToStream(String(amt), { gasLimit: 9000000 });
                let streamReceipt = streamTxn.wait();
                props.loadingState(false);
                setIsModalVisible(false);
                toast.success("Post added successfully");
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleCancel = () => {
        console.log("clicked oncancel !!");
        setIsModalVisible(false);
    }

    const handlePostInfo = (e) => {
        setCardData({
            ...cardData,
            [e.target.name]: e.target.value
        })
    }

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    }
    //! also add time limit for advertisement as a property 

    const handleModuleLock = async () => {
        console.log(" this is mutli module data ", multiModule);
        await addModule(props.postData.instId, multiModule, user.id, moduleName);
        try {
            if (!window.ethereum) {
                toast.error("Please connect metamask first");
                setModalVisible(false);
            } else {
                props.loadingState(true);
                let ethProvider = new ethers.providers.Web3Provider(window.ethereum);
                let contractInstance = new ethers.Contract(props.postData.address, instituteManager.abi, ethProvider.getSigner(0));
                let amt = 2 * count;
                let txn = await contractData.fDaixContract.transfer(props.postData.address, ethers.utils.parseEther(String(amt)), { gasLimit: 9000000 });
                let receipt = await txn.wait();
                // await contractData.fDaixContract.transfer(contractData.distributeTokenAddress, ethers.utils.parseEther(amt));
                let addModuleTxn = await contractInstance.addModule(String(count), String(amt), { gasLimit: 9000000 });
                let addModuleReceipt = await addModuleTxn.wait();
                props.loadingState(false);
                setModalVisible(false);
                toast.success("Modules added successfully");
            }
        } catch (err) {
            toast.error("Some error occurred");
            setModalVisible(false);
            props.loadingState(false);
            console.log(err.message);
        }
        setModalVisible(false);
    }

    const handleEvent = async () => {
        try {
            let imageName = await uploadPoapImage(eventImage);
            let imageUrl = await getImageUrl("itemimage", imageName);
            console.log(" this is image url before uplaod ", imageUrl);
            if (imageUrl) {
                await addEvent(props.postData.instId, event.name, event.description, event.link, user.id, event.dnt, imageUrl);
                if (!window.ethereum) {
                    toast.error("Please connect metamask first");
                    setEventModal(false);
                } else {
                    props.loadingState(true);
                    // taking 200 LAE from user to mint an event
                    let ethProvider = new ethers.providers.Web3Provider(window.ethereum);
                    let contractInstance = new ethers.Contract(props.postData.address, instituteManager.abi, ethProvider.getSigner(0));
                    let amt = 2;
                    //! amount = 2
                    let txn = await contractData.fDaixContract.transfer(props.postData.address, ethers.utils.parseEther(String(amt)));
                    let receipt = await txn.wait();
                    let depositTxn = await contractInstance.depositFundsToStream(String(amt), { gasLimit: 9000000 });
                    let depositTn = await depositTxn.wait();
                    console.log(" this is tream info ", props.postData.streamInfo[0])
                    props.loadingState(false);
                    toast.success("Event added successfully ");
                    setEventModal(false);
                }
            } else {
                toast.error("Image not uploaded yet");
            }
        } catch (err) {
            toast.error("Some error occurred");
            setEventModal(false);
            console.log(err.message);
        }
    }

    const handleModuleCancel = () => {
        setModalVisible(false);
        setEventModal(false);
    }

    const onDateChange = (e) => {
        setEvent({
            ...event,
            dnt: e.target.value
        })
    }

    const handlEventImage = (e) => {
        setEventImage(e.target.files[0]);
    }

    return <List.Item
        key={props.postData.name}
        actions={[
            <Popover content={"Promote Advertisement"}>
                <UsergroupAddOutlined style={{ fontSize: "30px" }} onClick={() => setIsModalVisible(true)} key="promote" />
            </Popover>,
            <Popover content={"Take Survey"}>
                <ScheduleOutlined style={{ fontSize: "30px" }} onClick={() => setModalVisible(true)} key="modules" />
            </Popover>,
            <Popover content={"Promote Events"}>
                <VideoCameraOutlined style={{ fontSize: "30px" }} onClick={() => setEventModal(true)} key='event' />
            </Popover>,
            <Popover content={"Student Responses"}>
                <Link to="/advertiser-dashboard/module/responses">
                    <FileDoneOutlined style={{ fontSize: "30px" }} key="responses" />
                </Link>
            </Popover>,
        ]}
        extra={
            <img
                width={272}
                alt="logo"
                src={`http://cdn.differencebetween.net/wp-content/uploads/2018/03/Difference-Between-Institute-and-University--768x520.jpg`}
            />
        }
    >
        <List.Item.Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={props.postData.displayName}
            description={props.postData.address}
        />
        {props.postData.about}
        {/* {item.content} */}

        <Toaster />
        <Modal title="Add Post" visible={isModalVisible} onOk={() => handleOk()} onCancel={() => handleCancel()}>
            <div className="stream-container">
                <input type="text" placeholder="Post name" name="title" onChange={(e) => handlePostInfo(e)} />
                <textarea className="desc-textarea" type="text" placeholder="Post Description" name="description" onChange={(e) => handlePostInfo(e)} />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImage(e)}
                ></input>
                <h3> Avalaible Streams</h3>
                {props.postData.streamInfo.map((stream, id) => <p> {stream} </p>)}
            </div>
        </Modal>

        {/* handleAddQuestion */}

        <Modal title="Create tokenized survey" visible={modalVisible} onOk={() => handleModuleLock()} onCancel={() => handleModuleCancel()}>
            <div className="stream-container">
                <input type="number" placeholder="Enter number of responses" onChange={(e) => setCount(e.target.value)} />
                <input type="text" placeholder="name" name="name" onChange={(e) => setModuleName(e.target.value)} />
                {multiModule.map((data, id) => {
                    return (
                        <input 
                        type="text" 
                        placeholder={"Enter question " + (++id)}
                        onChange={(e) => handleMutliModuleChange(id, e)}
                        />  
                    )
                })}
                <div className='module-btn'>
                <button className="add-module delete-module-btn" onClick={() => handleDeleteQuestion()}>
                    <MinusSquareOutlined />
                </button> 
                <button className="add-module" onClick={() => handleAddQuestion()}>
                    <AppstoreAddOutlined />
                </button>   
                </div>
            </div>
        </Modal>

        <Modal title="Create POAP based event" visible={eventModal} onOk={() => handleEvent()} onCancel={() => handleModuleCancel()}>
            <div className="stream-container">
                <input type="text" placeholder="Event name" name="name" onChange={(e) => setEvent({
                    ...event,
                    [e.target.name]: e.target.value
                })} />
                <textarea type="text" placeholder="Event description" className="desc-textarea" name="description" onChange={(e) => setEvent({
                    ...event,
                    [e.target.name]: e.target.value
                })} />
                <input type="text" placeholder="Event Link" name="link" onChange={(e) => setEvent({
                    ...event,
                    [e.target.name]: e.target.value
                })} />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlEventImage(e)}
                ></input>
                <input type="datetime-local" name="datetime" onChange={(e) => onDateChange(e)} />
            </div>
        </Modal>

    </List.Item>
};

export default PostCard;