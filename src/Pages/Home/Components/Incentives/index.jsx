import "./Incentives.scss";
import { Link } from "react-router-dom";
import { HomeOutlined, UserSwitchOutlined } from "@ant-design/icons";

const Incentives = () => {
    return (
        <div className="benefits">
            <div
                className="benefits"
                style={{
                    backgroundImage: `url(/asset/general/images/bg-1.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100vw 100%"
                }}
            >
                <div className="benefits-heading">
                <h1> <u>
                What's in it ?
                </u>
                     </h1>
                </div>

                <div className="benefits-container">
                    <div className="benefits-container-institutes">
                        <img  style={{
                            height:"90px",
                            width: "90px"
                        }} src="/asset/general/images/teaching.png" alt="teaching" />
                        <h2>
                            For Institutes
                            </h2>
                    <ul>
                    <li>
                    <p> Institute can take on their course activities as they do </p>
                        </li>
                      <li>
                      <p> Students getting engaged more in order to improve their performance score. </p>
                        </li>
                      <li>
                      <p>  Fully autonomous platform with single setup fee. </p>
                        </li>
                    </ul>
                    </div>

                    {/* <div>
                        <img src="/asset/general/images/LAE.png" className="rotate-logo" alt="logo" />
                    </div> */}

                    <div className="benefits-container-students">
                        <img style={{
                            height:"90px",
                            width: "90px"
                        }} src="/asset/general/images/money.png" alt="money" />
                        <h2> 
                        For Students
                            </h2>
                    <ul>
                        <li>
                        <p> Comparative performance tracking for students </p>
                        </li>
                        <li>
                        <p> Incentivizing students with tokens which have an intrinsic value </p>
                        </li>
                        <li>
                        <p> Can earn via completing tokenized modules or improving performance score. </p>
                        </li>
                        <li>
                        <p> Student can claim POAP tokens for the session they had attended. </p>
                        </li>
                    </ul>
                    </div>
                </div>
                <img style={{ marginLeft: "26%" }} src="/asset/general/images/stick.png" alt="stick" />
            </div>
        </div>
    );
};

export default Incentives;