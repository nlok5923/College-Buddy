import React from "react";
import "./Footer.scss";

const Footer = () => {
  const backgroundStyling = {
    backgroundImage: `url("/asset/Home/Images/footer-new.png")`,
    backgroundRepeat: "no-repeat",
    height: "60%",
    backgroundSize: "100% 100%",
  };

  return (
    <>
      <div style={backgroundStyling}>
        <div className="footer">
          <div className="footer-container">
            <div className="footer-container-logo">
              <h1>LAE</h1>
              <p>Ahmedabad Gandhinagar 382421, India +918871719893</p>

              <h2>Privacy policy</h2>
              <h2>Terms of service</h2>
            </div>
            <div className="footer-container-intouch">
              <h1>Get in Touch</h1>
              <h3> LAE@gmail.com</h3>
              <div className="footer-container-intouch-social">
                <img src="/asset/Footer/svg/twitter.svg" alt="twitter" />
                <img src="/asset/Footer/svg/instagram.svg" alt="twitter" />
                <img src="/asset/Footer/svg/youtube.svg" alt="twitter" />
                <img src="/asset/Footer/svg/facebook.svg" alt="twitter" />
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