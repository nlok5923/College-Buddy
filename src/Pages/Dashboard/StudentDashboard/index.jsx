import './StudentDashboard.scss'
import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../Provider/UserProvider";
import { Card, Button } from 'antd'
import { studentEnroll, getStudent, submitAns, fetchPost } from '../../../Services/StudentUtilities';
import { fetchCourses, getModules } from '../../../Services/InstituteUtilities';
import { getImageUrl } from '../../../Services/AdvertiserUtilities';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Modal } from 'antd';
import { ethers } from 'ethers';
import { ContractContext } from '../../../Provider/ContractProvider';
import InstititueManager from '../../../Ethereum/InstituteFundsManager.json'
import toast, { Toaster } from "react-hot-toast"

const StudentDashboard = () => {

  const [adv, setAdv] = useState([]);
  const contractData = useContext(ContractContext);
  const history = useHistory();
  const info = useContext(UserContext);
  const { user, isLoading } = info;
  const [redirect, setredirect] = useState(null);
  const [courseId, setCourseId] = useState('');
  const [instituteContract, setContractInstance] = useState(null);
  const [studentData, setStudentData] = useState({
    instId: "",
    streamId: "",
  })
  const [ans, setAns] = useState({
    ans1: "",
    ans2: ""
  })
  const [modules, setModules] = useState([]);
  const [balance, setBalance] = useState(0);

  const [assignments, setAssignments] = useState([]);

  const { Meta } = Card;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getAllAssignments = async (instId, streamId) => {
    try {
      console.log(instId + " " + streamId);
      console.log(instId.length, " ", streamId.length);
      let data = await fetchCourses(instId, streamId);
      console.log("LAE data", data);
      setAssignments(data);
    } catch (err) {
      console.log(err.message);
    }
  }

  const getAllAdvertisements = async (id) => {
    let data = await fetchPost(id);
    console.log(data);
    setAdv(data);
  }

  const getAllModules = async (id) => {
    let data = await getModules(id);
    console.log(" this is module data retreived ", data);
    setModules(data);
  }

  const getAndSetData = async () => {
    if (user && user.uid) {
      let data = await getStudent(user.uid);
      console.log("LAE", data);
      setStudentData({
        instId: data.instId.trim(),
        streamId: data.streamId.trim()
      })

      if (data.instId && data.streamId) {
        console.log(" this is updated student data ", studentData);
        getAllAssignments(data.instId.trim(), data.streamId.trim());
        getAllAdvertisements(data.instId.trim());
        getAllModules(data.instId.trim());
      } else {
        toast.error("Make sure to add inst Id and streamId ");
        // studentEnroll
        setIsModalVisible(true);
      }
    }
  }

  useEffect(() => {
    getAndSetData()
  }, [user, isLoading]);

  const handleChange = (e) => {
    setAns({
      ...ans,
      [e.target.name]: e.target.name
    })
  }

  const getAddress = (instituteData) => {
    console.log("in get address", instituteData)
    console.log(" this is again studnt data ", studentData)
    let res = instituteData.filter((data) => data[2] === studentData.instId);
    return res;
  }

  const getCurrentInstitute = async () => {
    try {
      if (contractData.contract) {
        let instituteData = await contractData.contract.getALlInstitutesManager();
        let ethProvider = new ethers.providers.Web3Provider(window.ethereum);
        let instituteAddress = getAddress(instituteData);
        console.log(" this is institue address ", instituteAddress[0][1]);
        //! give him address and you are done ig 
        let contractInstance = new ethers.Contract(instituteAddress[0][1], InstititueManager.abi, ethProvider.getSigner(0));
        setContractInstance(contractInstance);
        let balance = await contractData.laeContract.balanceOf(contractData.address);
        console.log("Student balance ", parseInt(balance._hex));
        setBalance(parseInt(balance._hex) / 1000000000000000000);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getCurrentInstitute();
  }, [contractData])

  const handleAns = async (courseId) => {
    await submitAns(studentData.instId, studentData.streamId, courseId, ans.ans1, ans.ans2, user.uid);
  }

  const handleModuleSubmit = async () => {
    try {
      console.log(" this is institute contract ", instituteContract);
      if (instituteContract) {
        let txn = await instituteContract.getReward();
        txn.wait();
      } else {
        toast.error("Please connect metamask ");
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleOk = async () => {
    await studentEnroll(user.uid, studentData.instId, studentData.streamId);
    setIsModalVisible(false);
    window.location.reload();
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  }

  return (
    <div>
      <Toaster />
      <div className="LAE">
        <Modal title="Add Post" visible={isModalVisible} onOk={() => handleOk()} onCancel={() => handleCancel()}>
          <div className="stream-container">
            <input type="text" placeholder="Enter Institute Id" name="instId" onChange={(e) => setStudentData({
              ...studentData,
              [e.target.name]: e.target.value
            })} />
            <input type="text" placeholder="Enter Stream Id" name="streamId" onChange={(e) => setStudentData({
              ...studentData,
              [e.target.name]: e.target.value
            })} />
          </div>
        </Modal>
        <div className="LAE-container">
          <div className="LAE-container-bg">
            <div className="LAE-container-inputarea-performance">
              <p>Performance score: 89  </p>
            </div>
            <p> Total token earned: {balance} LAE</p>
            <Card title="All you assignments">
              {
                assignments.map((data, id) => (
                  <Card type="inner" className="course-sub-card" title={`assignment ${id + 1}`} >
                    <h4>{data.name}</h4> <br />
                    <input placeholder='Enter ans for q1' name="ans1" onChange={(e) => handleChange(e)} />
                    <h4>{data.code}</h4> <br />
                    <input placeholder='Enter ans for q2' name="ans2" onChange={(e) => handleChange(e)} /> <br /> <br />
                    <Button onClick={() => handleAns(data.id)}> Submit </Button>
                  </Card>
                ))
              }
            </Card>
          </div>
          <div className="LAE-container-inputarea">
            <div>
              <List
                itemLayout="vertical"
                size="large"
                pagination={{
                  onChange: (page) => {
                    console.log(page);
                  },
                  pageSize: 3,
                }}
                dataSource={adv}
                renderItem={(item, id) => (
                  <List.Item
                    key={item.name + id}
                    actions={[
                      // <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                      // <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                      // <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                    ]}
                    extra={
                      <img
                        width={272}
                        alt="logo"
                      // src={item.fileName}
                      />
                    }
                  >
                    <List.Item.Meta
                      avatar={<Avatar />}
                      title={item.name}
                      description={item.description}
                    />
                    {item.content}
                  </List.Item>
                )}
              />
            </div>
          </div>

          <div className='LAE-container-modules'>
            <Card title="Avalaible modules">
              {
                modules.map((data, id) => (
                  <Card type="inner" className="course-sub-card">
                    <h4> {data.q1}</h4>
                    <input placeholder="Enter your answer here" />
                    <h4> {data.q2} </h4>
                    <input placeholder='Enter your answer here' />
                    <Button onClick={() => handleModuleSubmit()}> Submit </Button>
                  </Card>
                ))
              }
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

