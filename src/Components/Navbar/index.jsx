import "./Navbar.scss";
import { useContext, useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Menu, Dropdown, Popover, Button } from "antd";
import { DownloadOutlined, UserOutlined, LinkOutlined, LogoutOutlined, FileDoneOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ContractContext } from "../../Provider/ContractProvider";
import { signOut } from '../../Services/Auth'
import { UserContext } from "../../Provider/UserProvider";
import { useMoralis } from "react-moralis";

const Navbar = () => {
    const { user, isLoading } = useContext(UserContext);
    const contractData = useContext(ContractContext);
    const [isVisitor, setIsVisitor] = useState(true);

    useEffect(() => {
        console.log(" this is contract ", contractData)
    }, [contractData])
    const { logout, isAuthenticating } = useMoralis();

    const logOutUser = async () => {
        try {
            logout().then(() => {
                window.location.href = "/";
            })
        } catch(err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        if(user) {
            setIsVisitor(false);
        }
    }, [])
    
    return (
        <>
            <div className="navbar">
                <Link to="/" className="brand-name">
                    <span className="brand-name-blue"> <img style={{ display: "inline-block", marginTop: "-7px", height:"30px", width: "100px" }} src="/asset/logo/logo.png" alt="LAE logo" /></span>
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