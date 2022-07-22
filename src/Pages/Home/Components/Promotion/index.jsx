import "./Promotion.scss";
import { Link } from "react-router-dom";

const Promotion = () => {
    return (
        <div
            className="dashboard-container-1"
            style={{
                backgroundImage: `url(asset/Home/Images/top.png)`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 120%"
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
                            Earn and Burn
                        </h2>
                        <p>
                            We help you find your dream skill that you
                            wanted to
                            <br />
                            it will be a splendid affair to remember.
                        </p>
                    </div>
                    <div className="top-container-btn">
                        <Link to="/advertiser-register">
                            <button className="inst-btn">Register as institute</button>
                        </Link>
                        <Link to="/institute-register">
                            <button className="adv-btn">Register as Advertiser</button>
                        </Link>
                    </div>
                </div>
                <div>
                    <img src="/assets/images/home/girl.png" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Promotion;