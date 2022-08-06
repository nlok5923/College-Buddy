/* eslint-disable */
import React, { useState, useContext, useEffect } from "react";
import "./AdvertiserRegister.scss";
import { message } from "antd";
import { useHistory } from "react-router-dom";
import { SignInWithGoogle, SignInWithMoralis } from "../../Services/Auth"
import { UserContext } from "../../Provider/UserProvider";
import { useMoralis } from "react-moralis";
import toast, { Toaster } from "react-hot-toast"

const Register = () => {

  const backgroundStyling = {
    backgroundImage: `url("/asset/Login/Images/register-bg.png")`,
    backgroundRepeat: "no-repeat",
    height: "100vh",
    backgroundSize: "100% 100%",
  };

  const history = useHistory();
  // const info = useContext(UserContext);
  // const { user, isLoading } = info;
  const [redirect, setredirect] = useState(null);
  const { authenticate, isAuthenticated, user } = useMoralis();

  useEffect(() => {
    if (user) {
      console.log("authenticate ", user);
      SignInWithMoralis(user.id, "ADVT")
      history.push('/advertiser-dashboard');
    }
    console.log(" this is user data ", user);
  }, [user]);

  const moralisSignIn = () => {
    try {
      // SignInWithGoogle("ADVT");
      if (!isAuthenticated) {
        authenticate();
        console.log(user);
      }
      // if(user) {
      // }
    } catch (err) {
      console.log("Mishap ", err.message);
    }
  }

  const handleSubmit = () => {
    try {
      toast.error("Email based auth is under work please use moralis for auth :)");
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div>
      <Toaster />
      <div className="register">
        <div className="register-container">
          <div className="register-container-bg" style={backgroundStyling}>
            <h1>LAE</h1>
            <p>Register with LAE and promote your content </p>
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
                  style={{
                    width: "180px",
                    height: "30px"
                  }}
                  onClick={() => moralisSignIn("ADVERTISER")}
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