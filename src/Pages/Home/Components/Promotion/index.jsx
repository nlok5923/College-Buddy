import "./Promotion.scss";
import { Link } from "react-router-dom";
import { HomeOutlined, UserSwitchOutlined } from "@ant-design/icons";

const Promotion = () => {
    return (
        <div
            className="dashboard-container-1"
            style={{
                backgroundImage: `url(/asset/Home/Images/top-new.png)`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%"
            }}
        >
            <div
                className="inner-top-div"
            >
                <div>
                    <div className="top-container-left-text">
                        <h2>
                            Learn <br />
                            And <br />
                            Earn Token 
                        </h2>
                        <p>
                            Get involved in course activities
                            <br />
                            and get rewarded based on your performance 
                        </p>
                    </div>
                    <div className="top-container-btn">
                        <Link to="/institute-register">
                            <button className="inst-btn">  <HomeOutlined />  Login as institute</button>
                        </Link>
                        <Link to="/advertiser-register">
                            <button className="adv-btn">  <UserSwitchOutlined /> Login as Advertiser</button>
                        </Link>
                    </div>
                </div>
                <div>
                    <img style={{
                        marginLeft: "25.4%"
                    }} src="/asset/general/images/template.png" alt="template" />
                </div>
            </div>
        </div>
    );
};

export default Promotion;