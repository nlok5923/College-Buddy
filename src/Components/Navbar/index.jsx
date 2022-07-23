import "./Navbar.scss";
import "antd/dist/antd.css";
import { Menu, Dropdown, Popover, Button } from "antd";
import { DownloadOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Navbar = () => {

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
                        <Button type="primary" shape="round" icon={<DownloadOutlined />} size={"medium"} >
                            Connect
                        </Button>
                    </li>
                    <li>
                        <UserOutlined />
                        <span className="nav-profile-name">{"0x4da0k..."}</span>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;