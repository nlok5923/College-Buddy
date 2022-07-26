/* eslint-disable */
import React, { useState, useContext, useEffect } from "react";
import "./StudentRegister.scss";
import { useHistory } from "react-router-dom";
import { SignInWithGoogle } from "../../Services/Auth"
import { UserContext } from "../../Provider/UserProvider";
import { Redirect } from "react-router-dom";
import { Modal } from "antd"
import { studentEnroll, getStudent } from "../../Services/StudentUtilities";

const Register = () => {

  const backgroundStyling = {
    backgroundImage: `url("asset/Login/Images/register-bg.png")`,
    backgroundRepeat: "no-repeat",
    height: "100vh",
    backgroundSize: "100% 100%",
  };

  const [studentData, setStudentData] = useState({
    instId: "",
    streamId: ""
  })

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = async () => {
    await studentEnroll(user.uid, studentData.instId, studentData.streamId);
    setIsModalVisible(false);
    history.push('/student-dashboard');
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  }

  const handleStudentInfo = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value
    })
  }

  const info = useContext(UserContext);
  const { user, isLoading } = info;
  const [redirect, setredirect] = useState(null);

  useEffect(() => {
    console.log(user);
  }, [user, isLoading]);

  const googleSignIn = async () => {
    try {
      await SignInWithGoogle("STD");
      let studentData = await getStudent(user.uid);
      if(!studentData) {
        setIsModalVisible(true);
      }
    } catch (err) {
      console.log("Mishap ", err.message);
    }
  }

  return (
    <div>
      <Modal title="Add Stream" visible={isModalVisible} onOk={() => handleOk()} onCancel={() => handleCancel()}>
        <div className="stream-container">
          <input type="text" placeholder="Enter institute ID" name="instId" onChange={(e) => handleStudentInfo(e)} />
          <input type="text" placeholder="Enter Stream ID" name="streamId" onChange={(e) => handleStudentInfo(e)} />
        </div>
      </Modal>
      <div className="register">
        <div className="register-container">
          <div className="register-container-bg" style={backgroundStyling}>
            <h1>LAE</h1>
            <p>Register and get rewarded for your work</p>
          </div>
          <div className="register-container-inputarea">
            <div className="register-container-inputarea-boxarea">
              <h1>
                <b>
                  <strong>Register to LAE</strong>
                </b>
              </h1>
              <div className="register-with-google">
                <img
                  src="/asset/Login/svg/google.svg"
                  alt="google"
                  onClick={() => googleSignIn("INSTITUTE")}
                />
              </div>
              <img
                src="asset/Login/Images/divider.png"
                alt="divider"
                className="register-divider"
              />
              <div className="register-input">
                <form
                // onSubmit={saveInfo}
                >
                  <h3>
                    <b>Name</b>
                  </h3>
                  <input
                    name="name"
                    type="text"
                    required
                  // onChange={handleInput}
                  />
                  <h3>
                    <b>Email address</b>
                  </h3>
                  <input
                    name="email"
                    type="email"
                    required
                  // onChange={handleInput}
                  />
                  <h3>
                    <b>Password</b>
                  </h3>
                  <input
                    name="password"
                    type="password"
                    required
                  // onChange={handleInput}
                  />
                  <h5>
                    Creating an account means you're okay with our Terms and
                    <a href="shit"> Privacy Policy</a>
                  </h5>
                  <button type="submit">
                    Create Account
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;