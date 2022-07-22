import "./Navbar.scss";
import "antd/dist/antd.css";
import { Menu, Dropdown, Popover, Button } from "antd";
import { DownloadOutlined, UserOutlined } from "@ant-design/icons";

const Navbar = () => {

    return (
        <>
            <div className="navbar">
                <div to="/" className="brand-name">
                    <span className="brand-name-blue">TokenX</span>
                </div>
                <ul className="nav-items">
                    <li>
                        <div>
                            Services
                        </div>
                    </li>
                    <li>
                        <div>
                            About Us
                        </div>
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