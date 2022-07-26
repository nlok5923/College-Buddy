/* eslint-disable */
import React, { useState, useContext, useEffect } from "react";
import "./InstituteRegister.scss";
import { useHistory } from "react-router-dom";
import { SignInWithGoogle } from "../../Services/Auth"
import { UserContext } from "../../Provider/UserProvider";
import { Redirect } from "react-router-dom";
import { Modal } from "antd"
import { updateInstitute, getInstitute } from "../../Services/InstituteUtilities";
import { ContractContext } from "../../Provider/ContractProvider";

const Register = () => {
  const  contractData = useContext(ContractContext);
  const backgroundStyling = {
    backgroundImage: `url("asset/Login/Images/register-bg.png")`,
    backgroundRepeat: "no-repeat",
    height: "100vh",
    backgroundSize: "100% 100%",
  };

  const [inst, setInst] = useState({
    name: "",
    description: ""
  })

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = async () => {
    await updateInstitute(user.uid, inst.name, inst.description);
    setIsModalVisible(false);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  }

  const history = useHistory();
  const info = useContext(UserContext);
  const { user, isLoading } = info;
  const [redirect, setredirect] = useState(null);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const googleSignIn = async () => {
    try {
      await SignInWithGoogle("INST");
      if(!getInstitute(user.uid)) {
        setIsModalVisible(true);
      } 
    } catch (err) {
      console.log("Mishap ", err.message);
    }
  }

  const handleInstituteInfo = (e) => {
    setInst({
      ...inst,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <Modal title="Provide Info" visible={isModalVisible} onOk={() => handleOk()} onCancel={() => handleCancel()}>
        <div className="stream-container">
          <input type="text" placeholder="Enter institute name" name="name" onChange={(e) => handleInstituteInfo(e)} />
          <input type="text" placeholder="About inst" name="description" onChange={(e) => handleInstituteInfo(e)} />
        </div>
      </Modal>
      <div className="register">
        <div className="register-container">
          <div className="register-container-bg" style={backgroundStyling}>
            <h1>LAE</h1>
            <p>Dream, Learn and Grow with professional</p>
          </div>
          <div className="register-container-inputarea">
            <p>
              Already a member ? <a href="login">login</a>
            </p>
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
                    Creating an account means you’re okay with our Terms and
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