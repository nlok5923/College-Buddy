import "./Navbar.scss";
import { useContext, useEffect } from "react";
import "antd/dist/antd.css";
import { Menu, Dropdown, Popover, Button } from "antd";
import { DownloadOutlined, UserOutlined, LinkOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ContractContext } from "../../Provider/ContractProvider";
import { signOut } from '../../Services/Auth'
import { UserContext } from "../../Provider/UserProvider";

const Navbar = () => {
    const { user, isLoading } = useContext(UserContext);
    const contractData = useContext(ContractContext);
    useEffect(() => {
        console.log(" this is contract ", contractData)
    }, [contractData])

    const logOutUser = async () => {
        try {
            signOut().then(() => {
                window.location.href = '/';
            })
        } catch(err) {
            console.log(err.message);
        }
    }
    
    return (
        <>
            <div className="navbar">
                <Link to="/" className="brand-name">
                    <span className="brand-name-blue">LAE</span>
                </Link>
                <ul className="nav-items">
                    <li>
                        <Link to="/about-us">
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Button type="primary" shape="round" icon={<LinkOutlined />} size={"medium"} onClick={() => contractData._initApp()}  >
                            Connect
                        </Button>
                    </li>
                    <li>
                        <Link to="/student-register">
                            <Button type="primary" shape="round" icon={<UserOutlined />} size={"medium"} >
                                Student Here
                            </Button>
                        </Link>
                    </li>

                    <li onClick={() => logOutUser()}>
                        <Link to="/">
                            <LogoutOutlined />  Logout
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