/* eslint-disable */
import React, { useState } from "react";
import "./AdvertiseLogin.scss";
// import axios from "axios";
import { message } from "antd";
import { useHistory } from "react-router-dom";
// import useAuth from "../../customHooks/auth";
// import signInWithGoogle from "../../services/googleAuth";

const Login = () => {
//   const history = useHistory();
//   const [loading, setLoading] = useState(false);
//   const { saveUserId } = useAuth();
  const backgroundStyling = {
    backgroundImage: `url("assets/images/login/login-bg.png")`,
    backgroundRepeat: "no-repeat",
    height: "100vh",
    backgroundSize: "100% 100%",
  };
//   const [userInfo, setUserInfo] = useState({ email: "", password: "" });

//   const handleInput = (e) => {
//     setUserInfo({
//       ...userInfo,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSignInResponse = (res) => {
//     if (res.err) {
//       message.error(res.err);
//     } else {
//       saveUserId(res.userId);
//       history.push("/featured");
//     }
//   };

//   const saveInfo = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const response = await axios.post(
//       "http://localhost:5000/auth/login",
//       userInfo
//     );
//     setLoading(false);
//     handleSignInResponse(response.data);
//   };
//   const registerWithGoogle = async () => {
//     signInWithGoogle(handleSignInResponse);
//   };
  return (
    <div>
      <div className="login">
        <div className="login-container">
          <div className="login-container-bg" style={backgroundStyling}>
            <h1>GOALEX</h1>
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
                  src="/assets/svg/register/google.svg"
                  alt="google"
                //   onClick={registerWithGoogle}
                />
              </div>
              <img
                src="assets/images/login/divider.png"
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