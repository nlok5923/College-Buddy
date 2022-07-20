/* eslint-disable */
import React, { useState } from "react";
import "./InstituteRegister.scss";
// import axios from "axios";
import { message } from "antd";
import { useHistory } from "react-router-dom";
// import useAuth from "../../customHooks/auth";
// import signInWithGoogle from "../../services/googleAuth";

const Register = () => {
//   const history = useHistory();
//   const [loading, setLoading] = useState(false);
//   const { saveUserId } = useAuth();
  const backgroundStyling = {
    backgroundImage: `url("assets/images/register/register-bg.png")`,
    backgroundRepeat: "no-repeat",
    height: "100vh",
    backgroundSize: "100% 100%",
  };

//   const [userInfo, setUserInfo] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

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
//       "http://localhost:5000/auth/register",
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
      <div className="register">
        <div className="register-container">
          <div className="register-container-bg" style={backgroundStyling}>
            <h1>GOALEX</h1>
            <p>Dream, Learn and Grow with professional</p>
          </div>
          <div className="register-container-inputarea">
            <p>
              Already a member ? <a href="login">login</a>
            </p>
            <div className="register-container-inputarea-boxarea">
              <h1>
                <b>
                  <strong>Register to Goalex</strong>
                </b>
              </h1>
              <div className="register-with-google">
                <img
                  src="/assets/svg/register/google.svg"
                  alt="google"
                //   onClick={registerWithGoogle}
                />
              </div>
              <img
                src="assets/images/login/divider.png"
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