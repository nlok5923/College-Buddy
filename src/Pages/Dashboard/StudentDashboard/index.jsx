import './StudentDashboard.scss'
import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../Provider/UserProvider";
import { Card, Button } from 'antd'
import { studentEnroll, getStudent, submitAns, fetchPost, fetchEvent, claims, getScore, getShare, removeScore, saveModuleResp } from '../../../Services/StudentUtilities';
import { fetchStudentCourses, getModules } from '../../../Services/InstituteUtilities';
import { getImageUrl, uploadPoapImage } from '../../../Services/AdvertiserUtilities';
import { EditOutlined, MoneyCollectOutlined, TrophyOutlined, RiseOutlined, MoneyCollectFilled, FormOutlined } from '@ant-design/icons';
import { Avatar, List, Modal } from 'antd';
import { ethers } from 'ethers';
import { ContractContext } from '../../../Provider/ContractProvider';
import InstititueManager from '../../../Ethereum/InstituteFundsManager.json'
import toast, { Toaster } from "react-hot-toast"
import { Link } from 'react-router-dom';
import { isLastDayOfMonth } from '../../../Services/Utils'
import Loader from '../../../Components/Loader';
import { useMoralis } from "react-moralis"

const StudentDashboard = () => {
  const { authenticate, isAuthenticated, user } = useMoralis();
  const [adv, setAdv] = useState([]);
  const [islastDay, setIsLastDay] = useState(false);
  const contractData = useContext(ContractContext);
  const history = useHistory();
  // const info = useContext(UserContext);
  // const { user, isLoading } = info;
  const [redirect, setredirect] = useState(null);
  const [courseId, setCourseId] = useState('');
  const [poapImage, setPoapImage] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [resp, setResp] = useState({
    q1: "",
    q2: ""
  });
  const [poap, setPoap] = useState({
    name: '',
    about: '',
    contribution: '',
    imageUrl: ''
  });
  const [poapClaimModal, setPoapClaimModal] = useState(false);
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
  const [events, setEvents] = useState([]);
  const [balance, setBalance] = useState(0);
  const [currentAdvtId, setCurrentAdvtId] = useState('');
  const [score, setScore] = useState(0);

  const [assignments, setAssignments] = useState([]);

  const { Meta } = Card;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getAllAssignments = async (instId, streamId) => {
    try {
      console.log(instId + " " + streamId);
      console.log(instId.length, " ", streamId.length);
      let data = await fetchStudentCourses(instId, streamId, user.id);
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

  const getAllModules = async (id, stdId) => {
    let data = await getModules(id, stdId);
    console.log(" this is module data retreived ", data);
    setModules(data);
  }

  const getAllEvents = async (id) => {
    let data = await fetchEvent(id);
    setEvents(data);
  }

  const getStudentScore = async (id) => {
    let data = await getScore(id);
    setScore(data);
  }

  const getAndSetData = async () => {
    if (user && user.id) {
      let data = await getStudent(user.id);
      console.log("LAE", data);
      setStudentData({
        instId: data.instId.trim(),
        streamId: data.streamId.trim()
      })

      if (data.instId && data.streamId) {
        console.log(" this is updated student data ", studentData);
        getAllAssignments(data.instId.trim(), data.streamId.trim());
        getAllAdvertisements(data.instId.trim());
        getAllModules(data.instId.trim(), user.id);
        getAllEvents(data.instId.trim());
        getStudentScore(user.id);
      } else {
        toast.error("Make sure to add inst Id and streamId ");
        // studentEnroll
        setIsModalVisible(true);
      }
    }
  }

  useEffect(() => {
    console.log("called it ");
    getAndSetData()
    let today = new Date();
    if (isLastDayOfMonth(today)) {
      setIsLastDay(true);
    } else setIsLastDay(false);
  }, [user]);

  const handleChange = (e) => {
    setAns({
      ...ans,
      [e.target.name]: e.target.value
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
        console.log(" this is contract ", contractData.contract);
        let instituteData = await contractData.contract.getALlInstitutesManager();
        let ethProvider = new ethers.providers.Web3Provider(window.ethereum);
        let instituteAddress = getAddress(instituteData);
        console.log(" this is institue address ", instituteAddress[0][1]);
        let contractInstance = new ethers.Contract(instituteAddress[0][1], InstititueManager.abi, ethProvider.getSigner(0));
        setContractInstance(contractInstance);
        let balance = await contractData.fDaixContract.balanceOf(contractData.address);
        console.log("Student balance ", parseInt(balance._hex));
        setBalance(parseInt(balance._hex) / 1000000000000000000);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  const registerStudent = async () => {
    try {
      if(contractData.contract) {
        let txn = await instituteContract.registerStudent({ gasLimit: 9000000 });
        let rewardTxn = await txn.wait();
      } else {
        toast.error("Please connect metamask first");
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getCurrentInstitute();
  }, [contractData])

  const handleAns = async (courseId) => {
    try {
      setIsLoading(true);
      await submitAns(studentData.instId, studentData.streamId, courseId, ans.ans2, user.id);
      toast.success("Ans submitted successfully !!");
      setIsLoading(false);
    } catch (err) {
      toast.error("Some error occured");
      console.log(err.message);
    }
  }

  const handleModuleSubmit = async (moduleId) => {
    try {
      console.log(" this is institute contract ", instituteContract);
      if (instituteContract) {
        console.log(" this is resp ", resp);
        await saveModuleResp(studentData.instId.trim(), moduleId.trim(), resp, user.id)
        setIsLoading(true);
        let txn = await instituteContract.getReward({ gasLimit: 9000000 });
        let rewardTxn = await txn.wait();
        setIsLoading(false);
        window.location.reload();
      } else {
        toast.error("Please connect metamask ");
      }
    } catch (err) {
      toast.error("Some error occured");
      console.log(err.message);
      setIsLoading(false);
    }
  }

  const handleOk = async () => {
    try {
      setIsLoading(true);
      await studentEnroll(user.id, studentData.instId.trim(), studentData.streamId.trim());
      setIsModalVisible(false);
      setIsLoading(false);
      toast.success("Student data updated successfully");
      window.location.reload();
    } catch (err) {
      toast.error("Some error occured")
      console.log(err.message);
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  }

  const handlePoapClaim = async () => {
    try {
      if (!contractData.contract) {
        toast.error("Please connect to metamask first");
      } else {
        setIsLoading(true);
        console.log(" this is address ", contractData.address);
        await claims(currentAdvtId, poap, contractData.address);
        setIsLoading(false);
        toast.success("Claimed placed successfully !!");
      }
      setPoapClaimModal(false);
    } catch (err) {
      toast.error("Some error occured !!");
      console.log(err.message)
    }
  }

  const handleClaimCancel = () => {
    setPoapClaimModal(false);
  }

  const handlePoapImage = async (e) => {
    setPoapImage(e.target.files[0]);
    let fileName = await uploadPoapImage(e.target.files[0]);
    let _imageUrl = await getImageUrl("itemimage", fileName);
    console.log(" this is image url ", _imageUrl);
    setPoap({
      ...poap,
      imageUrl: _imageUrl
    });
  }

  const updateShare = async () => {
    try {
      // console.log("update share called ");
      if (contractData.address) {
        setIsLoading(true);
        let newShare = await getShare(user.id);
        console.log("new share ", newShare)
        let oldShare = await contractData.idaContract.shareUnits(contractData.address);
        console.log("old share", oldShare);
        oldShare = parseInt(oldShare._hex);
        // console.log(newShare + ' ' + oldShare);
        if (newShare > oldShare) {
          let txn = await contractData.idaContract.gainShare(contractData.address, newShare - oldShare);
          let shareTxn = await txn.wait();
        } else {
          let txn = await contractData.idaContract.loseShare(contractData.address, oldShare - newShare);
          let shareTxn = await txn.wait();
        }
        await removeScore(user.id);
        setIsLoading(false);
        toast.success("Added your share too !!");
        window.location.reload();
      } else {
        toast.error("Please connect to metamask first");
      }
      // shareUnits
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleModuleChange = (e) => {
    setResp({
      ...resp,
      [e.target.name]: e.target.value
    })
    console.log(" this is updated resp ", resp);
  }

  return (
    <div>
      <Toaster />
      <Loader isLoading={loading}>
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

          <Modal title="Claim Poap" visible={poapClaimModal} onOk={() => handlePoapClaim()} onCancel={() => handleClaimCancel()}>
            <div className="stream-container">
              <input type="text" placeholder="Event name" name="name" onChange={(e) => setPoap({
                ...poap,
                [e.target.name]: e.target.value
              })} />
              <input type="text" placeholder="About Event" name="about" onChange={(e) => setPoap({
                ...poap,
                [e.target.name]: e.target.value
              })} />
              <input type="text" placeholder="Your Contributions/Learning" name="contribution" onChange={(e) => setPoap({
                ...poap,
                [e.target.name]: e.target.value
              })} />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handlePoapImage(e)}
              ></input>
            </div>
          </Modal>

          <div className="LAE-container">
            <div className="LAE-container-bg">
              <div className="LAE-container-inputarea-performance">
                {islastDay && (
                  <p onClick={() => updateShare()}>   <EditOutlined /> <span>
                    Update Share
                  </span>
                  </p>
                )}
                <p> <RiseOutlined /> <span>
                  Score: {score}
                </span>
                </p>
                <p> <MoneyCollectOutlined /> <span>
                  Balance: {balance.toFixed(2)} fDAIx
                </span>
                </p>
                <p onClick={() => registerStudent()}>
                <FormOutlined /> <span>
                  Register Me
                </span>
                </p>
                <Link to={`/student-dashboard/${user ? user.id : "/"}`}>
                  <p> <TrophyOutlined /> <span>
                    Your POA Tokens
                  </span>
                  </p>
                </Link>
              </div>
              <Card className='LAE-container-bg-card' title="All your assignments">
                {
                  assignments.map((data, id) => (
                    <Card type="inner" className="course-sub-card" title={`Assignment: ${data.name}`} >
                      <Button onClick={() => {
                        window.location.href = data.code
                      }}> Download Assignment </Button>
                      <textarea className='assignment-ans-txtarea' placeholder='Enter ans for the assignment' name="ans2" onChange={(e) => handleChange(e)} /> <br /> <br />
                      <Button onClick={() => handleAns(data.id)}> Submit </Button>
                    </Card>
                  ))
                }
              </Card>
            </div>
            <div className="LAE-container-inputarea">
              <Card title='All Advertisements'>
                {adv.map((data, id) => {
                  return (
                    <Card
                      style={{
                        width: 630,
                      }}
                      className="spn-modules"
                      cover={
                        <img
                          alt="example"
                          src={data.fileName}
                        />
                      }
                    >
                      <Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title={data.name}
                        description={data.description}
                      />
                    </Card>
                  )
                })}
                {events.map((data, id) => {
                  return (
                    <Card style={{
                      width: 630,
                      marginTop: "3%"
                    }}>
                      <Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title={data.name}
                        description={data.description}
                      />
                      <p style={{ marginTop: "4%" }}> <i> {data.dnt} </i> </p>
                      <button onClick={() => {
                        setCurrentAdvtId(data.advtId);
                        setPoapClaimModal(true);
                      }} >
                        Claim PAOP
                      </button>
                      <button onClick={() => {
                        window.open(data.link, "_blank")
                      }}>Event link</button>
                    </Card>
                  )
                })}
              </Card>
            </div>

            <div className='LAE-container-modules'>
              <Card title="Sponsored Modules">
                { modules.length === 0 ? <p> 
                No Sponsored modules ATM for you
                </p>
                : 
                  modules.map((data, id) => (
                    <Card type="inner" className="course-sub-card">
                      <h4 className="spn-modules"> Q1) {data.q1}</h4>
                      <input className="spn-modules" placeholder="Enter your answer here" name="q1" onChange={(e) => setResp({
                        ...resp,
                        [e.target.name]: e.target.value
                      })}  />
                      <h4 className="spn-modules"> Q2) {data.q2} </h4>
                      <input placeholder='Enter your answer here' name="q2" onChange={(e) => setResp({
                        ...resp,
                        [e.target.name]: e.target.value
                      })} /> <br />
                      <Button className="spn-modules" onClick={() => handleModuleSubmit(data.id)}> Submit </Button>
                    </Card>
                  ))
                }
              </Card>
            </div>
          </div>
        </div>
      </Loader>
    </div>
  );
};

export default StudentDashboard;

