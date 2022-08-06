/* eslint-disable */
import React, { useState, useContext, useEffect } from "react";
import "./InstituteRegister.scss";
import { useHistory } from "react-router-dom";
import { SignInWithGoogle, SignInWithMoralis } from "../../Services/Auth"
import { UserContext } from "../../Provider/UserProvider";
import { Redirect } from "react-router-dom";
import { Modal } from "antd"
import { updateInstitute, getInstitute } from "../../Services/InstituteUtilities";
import { ContractContext } from "../../Provider/ContractProvider";
import { useMoralis } from "react-moralis";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const { authenticate, isAuthenticated, user } = useMoralis();
  const contractData = useContext(ContractContext);
  const backgroundStyling = {
    backgroundImage: `url("/asset/Login/Images/register-bg.png")`,
    backgroundRepeat: "no-repeat",
    height: "100vh",
    backgroundSize: "100% 100%",
  };

  const [inst, setInst] = useState({
    name: "",
    description: ""
  })

  const [isModalVisible, setIsModalVisible] = useState(false);

  const history = useHistory();

  const handleOk = async () => {
    await updateInstitute(user.id, inst.name, inst.description);
    setIsModalVisible(false);
    history.push("/institute-dashboard");
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  }

  // const info = useContext(UserContext);
  // const { user, isLoading } = info;
  const [redirect, setredirect] = useState(null);

  const handleSubmit = () => {
    try {
      toast.error("Email based auth is under work please use moralis for auth :)");
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    if(user) {
      console.log("authenticate ", user);
      SignInWithMoralis(user.id, "INST")
      history.push('/institute-dashboard');
    }
    console.log(" this is user data ", user);
  }, [user]);

  const moralisSignIn = () => {
    try {
      // SignInWithGoogle("ADVT");
      if(!isAuthenticated) {
        authenticate();
        console.log(user);
      }
      // if(user) {
      // }
    } catch(err) {
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
      <Toaster />
      <div className="register">
        <div className="register-container">
          <div className="register-container-bg" style={backgroundStyling}>
            <h1>LAE</h1>
            <p>Register and manage your evaluations </p>
          </div>
          <div className="register-container-inputarea">
            <div className="register-container-inputarea-boxarea">
              <h1>
                <b>
                  <strong>Welcome to LAE !!</strong>
                </b>
              </h1>
              <div className="register-with-google">
                <img
                  src="/asset/general/images/moralis.png"
                  alt="moralis"
                  style = {{ 
                    width: "180px",
                    height: "30px"
                   }}
                  onClick={() => moralisSignIn("INSTITUTE")}
                />
              </div>
              <img
                src="/asset/Login/Images/divider.png"
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
                  <button type="submit" onClick={() => handleSubmit()}>
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