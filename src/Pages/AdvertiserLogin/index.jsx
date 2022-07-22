/* eslint-disable */
import React, { useState, useContext, useEffect } from "react";
import "./AdvertiserLogin.scss";
import { message } from "antd";
import { useHistory } from "react-router-dom";
import { SignInWithGoogle } from "../../Services/Auth"
import { UserContext } from "../../Provider/UserProvider";

const Login = () => {

  const backgroundStyling = {
    backgroundImage: `url("asset/Login/Images/login-bg.png")`,
    backgroundRepeat: "no-repeat",
    height: "100vh",
    backgroundSize: "100% 100%",
  };

  const history = useHistory();
  const info = useContext(UserContext);
  const { user, isLoading } = info;
  const [redirect, setredirect] = useState(null);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const googleSignIn = () => {
    try {
      SignInWithGoogle();
    } catch(err) {
      console.log("Mishap ", err.message);
    }
  }

  return (
    <div>
      <div className="login">
        <div className="login-container">
          <div className="login-container-bg" style={backgroundStyling}>
            <h1>TokenPop</h1>
            <p>Dream, Learn and Grow with professional</p>
          </div>
          <div className="login-container-inputarea">
            <p>
              Not a member ? <a href="/register">Register</a>
            </p>
            <div className="login-container-inputarea-boxarea">
              <h1>
                <b>
                  <strong>Login to Goalex</strong>
                </b>
              </h1>
              <div className="login-with-google">
                <img
                  src="/asset/Login/svg/google.svg"
                  alt="google"
                  onClick={() => googleSignIn("ADVERTISER")}
                />
              </div>
              <img
                src="asset/Login/Images/divider.png"
                alt="divider"
                className="login-divider"
              />
              <div className="login-input">
                <form 
                // onSubmit={saveInfo}
                >
                  <h3>
                    <b>Email address</b>
                  </h3>
                  <input
                    name="email"
                    type="email"
                    // onChange={handleInput}
                    required
                  />
                  <h3>
                    <b>Password</b>
                  </h3>
                  <input
                    name="password"
                    type="password"
                    // onChange={handleInput}
                    required
                  />
                  <h3>
                    <a href="forgot"> Forgot password</a>
                  </h3>
                  <button type="submit">
                    {/* {loading ? "Loading..." :  */}
                    Login
                    {/* // } */}
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

export default Login;