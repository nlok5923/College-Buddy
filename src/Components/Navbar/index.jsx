import "./Navbar.scss";
import { useContext, useEffect } from "react";
import "antd/dist/antd.css";
import { Menu, Dropdown, Popover, Button } from "antd";
import { DownloadOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ContractContext } from "../../Provider/ContractProvider";

const Navbar = () => {
    const contractData = useContext(ContractContext);
    useEffect(() => {
        console.log(" this is contract ", contractData)
    }, [contractData])
    return (
        <>
            <div className="navbar">
                <Link to="/" className="brand-name">
                    <span className="brand-name-blue">TokenX</span>
                </Link>
                <ul className="nav-items">
                    <li>
                        <Link to="/services">
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link to="/about-us">
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Button type="primary" shape="round" icon={<DownloadOutlined />} size={"medium"} onClick={() => contractData._initApp()}  >
                            Connect
                        </Button>
                    </li>
                    <li>
                        <Link to="/student-register">
                            <Button type="primary" shape="round" icon={<DownloadOutlined />} size={"medium"} >
                                Student Here
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <UserOutlined />
                        <span className="nav-profile-name">{contractData != undefined ? contractData.address.slice(0, 7) + "..." : "Please connect"}</span>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;