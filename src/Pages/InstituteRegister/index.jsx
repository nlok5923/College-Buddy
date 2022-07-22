/* eslint-disable */
import React, { useState, useContext, useEffect } from "react";
import "./InstituteRegister.scss";
import { useHistory } from "react-router-dom";
import { SignInWithGoogle } from "../../Services/Auth"
import { UserContext } from "../../Provider/UserProvider";

const Register = () => {

  const backgroundStyling = {
    backgroundImage: `url("asset/Login/Images/register-bg.png")`,
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