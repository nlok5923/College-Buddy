import './StudentDashboard.scss'
import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../Provider/UserProvider";
import { Card, Button } from 'antd'
import { studentEnroll, getStudent, submitAns, fetchPost } from '../../../Services/StudentUtilities';
import { fetchCourses, getModules } from '../../../Services/InstituteUtilities';
import { getImageUrl } from '../../../Services/AdvertiserUtilities';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';
import { ethers } from 'ethers';

const StudentDashboard = () => {

  const [adv, setAdv] = useState([]);

  const history = useHistory();
  const info = useContext(UserContext);
  const { user, isLoading } = info;
  const [redirect, setredirect] = useState(null);
  const [courseId, setCourseId] = useState('');
  const [studentData, setStudentData] = useState({
    instId: "",
    streamId: "",
  })
  const [ans, setAns] = useState({
    ans1: "",
    ans2: ""
  })
  const [modules, setModules] = useState([]);

  const [assignments, setAssignments] = useState([]);

  const { Meta } = Card;

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
        instId: data.instId,
        streamId: data.streamId
      })
      getAllAssignments(data.instId, data.streamId);
      getAllAdvertisements(data.instId);
      getAllModules(data.instId);
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

  const handleAns = async (courseId) => {
    await submitAns(studentData.instId, studentData.streamId, courseId, ans.ans1, ans.ans2, user.uid);
  }

  const handleModuleSubmit = () => {
    try {
      let ethProvider = new ethers.providers.Web3Provider(window.ethereum);
      //! give him address and you are done ig 
      let contractInstance = new ethers.Contract(props.postData.address, instituteManager.abi, ethProvider.getSigner(0));
    } catch(err) {

    }
  }

  return (
    <div>
      <div className="LAE">
        <div className="LAE-container">
          <div className="LAE-container-bg">
            <h3> Total token earned: 100 LAE</h3> 
            <h3> Your performance score: 100</h3>
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
            <Card>
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
          <div className="LAE-container-inputarea">
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
              renderItem={(item) => (
                <List.Item
                  key={item.name}
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
      </div>
    </div>
  );
};

export default StudentDashboard;

  