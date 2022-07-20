import React from "react";
import "./Footer.scss";
// import Role from "../../customHooks/role";
// import { useLocation } from "react-router-dom";

const Footer = () => {
  const backgroundStyling = {
    backgroundImage: `url("asset/Home/Images/footer.png")`,
    backgroundRepeat: "no-repeat",
    height: "60%",
    backgroundSize: "100% 100%",
  };
//   const location = useLocation();

//   const role = Role(location.pathname);

  return (
    <>
      <div style={backgroundStyling}>
        <div className="footer">
          <div className="footer-container">
            <div className="footer-container-logo">
              <h1>GOALEX</h1>
              <p>San Fransisco, CA 329831, USA.. +1 82398321</p>

              <h2>Privacy policy</h2>
              <h2>Terms of service</h2>
            </div>
            <div className="footer-container-intouch">
              <h1>Get in Touch</h1>
              <h3> goalex@gmail.com</h3>
              <div className="footer-container-intouch-social">
                <img src="/assets/svg/footer/twitter.svg" alt="twitter" />
                <img src="/assets/svg/footer/instagram.svg" alt="twitter" />
                <img src="/assets/svg/footer/youtube.svg" alt="twitter" />
                <img src="/assets/svg/footer/facebook.svg" alt="twitter" />
              </div>
            </div>
            <div className="footer-container-subscribe">
              <h1>Subscribe</h1>
              <div>
                <input name="name" /> <br />
                <input email="email" /> <br />
                <button>Subscribe</button>
              </div>
            </div>
            <div className="footer-container-contact">
              <h1>Contact Us</h1>
              <ul>
                <li>Resources</li>
                <li>Modules</li>
                <li>Pricing</li>
                <li>Courses</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;