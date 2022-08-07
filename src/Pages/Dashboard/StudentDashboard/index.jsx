import './StudentDashboard.scss'
import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../Provider/UserProvider";
import { Card, Button } from 'antd'
import { studentEnroll, getStudent, submitAns, fetchPost, fetchEvent, claims, getScore, getShare, removeScore, saveModuleResp, register } from '../../../Services/StudentUtilities';
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
import ScoreGuage from "../../../Components/Gauge/index"
import AssignmentCard from '../../../Components/AssignmentCard';
import ModuleCard from '../../../Components/Module';

const StudentDashboard = () => {
  const { authenticate, isAuthenticated, user } = useMoralis();
  const [adv, setAdv] = useState([]);
  const owner = "0x52EDB0ba3448A1af1eF16f23cF43E08879B62fec";
  const [islastDay, setIsLastDay] = useState(false);
  const contractData = useContext(ContractContext);
  const history = useHistory();
  const [instBalance, setInstBalance] = useState(0);
  const [dbalance, setDbalance] = useState(0);
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
  const [instAddress, setInstAddress] = useState('');
  const [moduleResp, setModuleResp] = useState([]);

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
    // console.log(" this is module data retreived --------------------------------------------------", data);
    setModules(data);
  }

  const getAllEvents = async (id) => {
    let data = await fetchEvent(id);
    setEvents(data);
  }

  const getStudentScore = async (id) => {
    let data = await getScore(id);
    // setScore(data);
    setScore(78);
  }

  const getAndSetData = async () => {
    if (user && user.id) {
      let data = await getStudent(user.id);
      console.log("LAE", data);
      setStudentData({
        instId: data.instId.trim(),
        streamId: data.streamId.trim(),
        isRegistered: data.isRegistered
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
        setInstAddress(instituteAddress[0][1]);
        let contractInstance = new ethers.Contract(instituteAddress[0][1], InstititueManager.abi, ethProvider.getSigner(0));
        setContractInstance(contractInstance);
        let balance = await contractData.fDaixContract.balanceOf(contractData.address);
        console.log("Student balance ", parseInt(balance._hex));
        let dbalance = await contractData.fDaixContract.balanceOf(owner);
        setDbalance(parseInt(dbalance._hex / 1000000000000000000));
        // console.log(" this is not called =---------------------------------------------------------");
        setBalance(parseInt(balance._hex) / 1000000000000000000);
        let instbalance = await contractData.fDaixContract.balanceOf(instituteAddress[0][1]);
        setInstBalance(parseInt(instbalance._hex) / 1000000000000000000);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  const registerStudent = async () => {
    try {
      if (studentData.isRegistered) {
        toast.error("You are already registered !!");
      } else {
        if (contractData.contract) {
          setIsLoading(true);
          let txn = await instituteContract.registerStudent({ gasLimit: 9000000 });
          let rewardTxn = await txn.wait();
          let approveTxn = await instituteContract.approveSubscriptionForSubscriber(instAddress, { gasLimit: 9000000 });
          // let approveTxn = await instituteContract.approveSubscriptionForSubscriber(owner, { gasLimit: 9000000 });
          let approveTxnReceipt = await approveTxn.wait();
          console.log(" this is approve txn receipt ", approveTxnReceipt);
          console.log(" this is used.id ", user.id);
          await register(user.id);
          toast.success("Student registration done");
          setIsLoading(false);
        } else {
          toast.error("Please connect metamask first");
        }
      }
    } catch (err) {
      toast.error("Something bad happened");
      console.log(err.message);
    }
  }

  useEffect(() => {
    getCurrentInstitute();
  }, [contractData])

  const handleAns = async (courseId) => {
    try {
      console.log(" this is ans and courseid ", ans.ans2, "  ", courseId);
      setIsLoading(true);
      await submitAns(studentData.instId, studentData.streamId, courseId, ans.ans2, user.id);
      toast.success("Ans submitted successfully !!");
      setIsLoading(false);
      getAllAssignments(studentData.instId, studentData.streamId);
    } catch (err) {
      toast.error("Some error occured");
      console.log(err.message);
    }
  }

  const handleModuleSubmit = async (moduleId, moduleResp) => {
    console.log(" this is module id ", moduleId);
    console.log(" this is module resp ", moduleResp);
    try {
      console.log(" this is institute contract ", instituteContract);
      // console.log("module id ", moduleId + " " + " this is respon " + resp);
      if (instituteContract) {
        // console.log(" this is resp ", resp);
        // let moduelCount = await instituteContract.getModuleCount();
        // console.log(" this is module count ", parseInt(moduelCount._hex))
        await saveModuleResp(studentData.instId.trim(), moduleId.trim(), moduleResp, user.id)
        setIsLoading(true);
        let txn = await instituteContract.getReward({ gasLimit: 9000000 });
        let rewardTxn = await txn.wait();
        await getAllModules(studentData.instId.trim(), user.id);
        setIsLoading(false);
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
        if (poap.imageUrl) {
          setIsLoading(true);
          console.log(" this is address ", contractData.address);
          await claims(currentAdvtId, poap, contractData.address);
          setIsLoading(false);
          toast.success("Claimed placed successfully !!");
          setPoapClaimModal(false);
        } else {
          toast.error("Wait for image to be uploaded");
        }
      }
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
        newShare = isNaN(newShare) ? 0 : newShare;
        console.log("new share ", newShare)
        let oldShare = await instituteContract.shareUnits(contractData.address);
        console.log("old share", parseInt(oldShare._hex));
        oldShare = parseInt(oldShare._hex);
        // newShare = 100;
        console.log(newShare + ' ' + oldShare + ' ' + newShare);
        if (newShare > oldShare) {
          let txn = await instituteContract.gainShare(contractData.address, newShare - oldShare);
          let shareTxn = await txn.wait();
        } else {
          let txn = await instituteContract.loseShare(contractData.address, oldShare - newShare);
          let shareTxn = await txn.wait();
        }
        await removeScore(user.id);
        setIsLoading(false);
        toast.success("Added your share too !!");
        getStudentScore();
      } else {
        toast.error("Please connect to metamask first");
      }
      // shareUnits
    } catch (err) {
      console.log(err.message)
    }
  }

  // const handleMultiModuleResp = () => {

  // }

  return (
    <div>
      <Toaster />
      <Loader isLoading={loading} message={"Loading student dashboard"} >
        <div className="LAE">
          <Modal title="Enter inst and stream id" visible={isModalVisible} onOk={() => handleOk()} onCancel={() => handleCancel()}>
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
              <textarea type="text" className="desc-textarea" placeholder="About Event" name="about" onChange={(e) => setPoap({
                ...poap,
                [e.target.name]: e.target.value
              })} />
              <textarea type="text" className="desc-textarea" placeholder="Your Contributions/Learning" name="contribution" onChange={(e) => setPoap({
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
                <ScoreGuage score={parseFloat(parseInt(score) / 100)} />
                {islastDay && (
                  <p onClick={() => updateShare()}>   <EditOutlined /> <span>
                    Update Share
                  </span>
                  </p>
                )}
                <button onClick={() => registerStudent()}>
                  <FormOutlined /> <span>
                    Register Me
                  </span>
                </button> <br />
                <Link to={`/student-dashboard/${user ? user.id : "/"}`}>
                  <button>
                    <TrophyOutlined /> <span>
                      Your POA Tokens
                    </span>
                  </button>
                </Link>
              </div>
              <Card className='LAE-container-bg-card' style={{ fontFamily: "montserrat" }} title="All your assignments">
                {assignments.length === 0 ? <h3 className="no-work">
                  No assignments for you now
                </h3>
                  : null}
                {
                  assignments.map((data, id) => (
                    <AssignmentCard style={{ marginTop: "5%" }} key={id} data={data} handleAnsSubmit={(assignId) => handleAns(assignId)} handleAnsChange={(e) => handleChange(e)} />
                  ))
                }
              </Card>
            </div>
            <div className="LAE-container-inputarea">
              <Card style={{ fontFamily: "montserrat", fontWeight: "bolder" }} title='Your Feed'>
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
                    }}
                      cover={
                        <img
                          alt="example"
                          src={data.url || "Dummy"}
                        />
                      }
                    >
                      <Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title={data.name}
                        description={data.description}
                      />
                      <p style={{ marginTop: "4%", fontSize: "12px" }}> <i> {data.dnt.slice(11, 16) + " | " + data.dnt.slice(0, 10)} </i> </p>
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
              <p className="LAE-container-modules-balance">
                <MoneyCollectOutlined /> <span>
                  incentives Received: {balance.toFixed(2)} fDAIx
                </span>
              </p>
              <Card style={{ fontFamily: "montserrat" }} title="Sponsored Modules">
                {modules.length === 0 ? <h3 className="no-modules">
                  No Sponsored modules ATM for you
                </h3>
                  :
                  modules.map((data, id) => (
                    <ModuleCard 
                     data={data} handleSubmit={(moduleId, moduleResp) => handleModuleSubmit(moduleId, moduleResp)} />
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

