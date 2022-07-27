import { Card, Modal } from 'antd';
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../Provider/UserProvider';
import { addPost, addModule } from '../../Services/AdvertiserUtilities';
import { ethers } from 'ethers';
import instituteManager from "../../Ethereum/InstituteFundsManager.json"
import { ContractContext } from '../../Provider/ContractProvider';
import toast, { Toaster } from "react-hot-toast"
import { UsergroupAddOutlined, ScheduleOutlined } from "@ant-design/icons"

const { Meta } = Card;
const PostCard = (props) => {
    const contractData = useContext(ContractContext);
    const { user, isLoading } = useContext(UserContext);
    const [module, setModule] = useState({
        q1: "",
        q2: ""
    });

    const [count, setCount] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [cardData, setCardData] = useState({
        title: "",
        description: ""
    })
    const [image, setImage] = useState(null);

    const handleOk = async () => {
        try {
            await addPost(props.postData.instId, cardData.title, cardData.description, image);
            if (!window.ethereum) {
                toast.error("Please connect metamask first");
                setIsModalVisible(false);
            } else {
                let ethProvider = new ethers.providers.Web3Provider(window.ethereum);
                let contractInstance = new ethers.Contract(props.postData.address, instituteManager.abi, ethProvider.getSigner(0));
                await contractData.laeContract.transfer(props.postData.address, String(200 * 1000000000000000000));
                await contractInstance.depositFundsToStream(props.postData.streamInfo[0], "201");
                setIsModalVisible(false);
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
        await addModule(props.postData.instId, module.q1, module.q2);
        try {
            if (!window.ethereum) {
                toast.error("Please connect metamask first");
                setModalVisible(false);
            } else {
                let ethProvider = new ethers.providers.Web3Provider(window.ethereum);
                let contractInstance = new ethers.Contract(props.postData.address, instituteManager.abi, ethProvider.getSigner(0));
                await contractData.laeContract.transfer(props.postData.address, String(100 * count * 1000000000000000000));
                await contractInstance.addModule(count, "CSE", String(100 * count));
                setModalVisible(false);
            }
        } catch(err) {
            console.log(err.message);
        }
        setModalVisible(false);
    }

    const handleModuleCancel = () => {
        setModalVisible(false);
    }

    return <Card
        hoverable
        style={{
            width: 240,
        }}
        cover={<img alt="post" src={`http://cdn.differencebetween.net/wp-content/uploads/2018/03/Difference-Between-Institute-and-University--768x520.jpg`} />}
        actions={[
            <UsergroupAddOutlined onClick={() => setIsModalVisible(true)} key="promote" />,
            <ScheduleOutlined  onClick={() => setModalVisible(true)} key="modules" />,
          ]}
    > <Toaster />
        <Modal title="Add Post" visible={isModalVisible} onOk={() => handleOk()} onCancel={() => handleCancel()}>
            <div className="stream-container">
                <input type="text" placeholder="Post name" name="title" onChange={(e) => handlePostInfo(e)} />
                <input type="text" placeholder="Post description " name="description" onChange={(e) => handlePostInfo(e)} />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImage(e)}
                ></input>
                <h3> Avalaible Streams</h3>
                {props.postData.streamInfo.map((stream, id) => <p> {stream} </p>)}
            </div>
        </Modal>

        <Modal title="Create tokenized module" visible={modalVisible} onOk={() => handleModuleLock()} onCancel={() => handleModuleCancel()}>
            <div className="stream-container">
                <input type="text" placeholder="Enter question 1" name="q1" onChange={(e) => setModule({
                    ...module,
                    [e.target.name]: e.target.value
                })} />
                <input type="text" placeholder="Enter question 2" name="q2" onChange={(e) => setModule({
                    ...module,
                    [e.target.name]: e.target.value
                })} />
                <input type="number" placeholder="Enter number of modules" onChange={(e) => setCount(e.target.value)} />
            </div>
        </Modal>

        <Meta title={props.postData.name} description={props.postData.address} />
    </Card>
};

export default PostCard;