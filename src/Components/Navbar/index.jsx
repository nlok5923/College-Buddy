import "./Navbar.scss";
// import { Link, useLocation } from "react-router-dom";
import "antd/dist/antd.css";
import { Menu, Dropdown, Popover, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
// import Role from '../../customHooks/role'

const Navbar = () => {
    //   const location = useLocation();
    //   const categories = [
    //     "Web Development",
    //     "Mobile Development",
    //     "Blockchain",
    //     "Machine Learning",
    //     "DSA",
    //   ];


    //   const role = Role(location.pathname);

    //   const menu = (
    //     <Menu>
    //       {categories.map((category) => {
    //         return (
    //           <Menu.Item key={category}>
    //             <a rel="noopener noreferrer" href="https://www.antgroup.com">
    //               {category}
    //             </a>
    //           </Menu.Item>
    //         );
    //       })}
    //     </Menu>
    //   );

    const content = (
        <div>
            <Button>Logout</Button>
        </div>
    );
    return (
        <>
            <div className="navbar">
                <div to="/" className="brand-name">
                    <span className="brand-name-blue">GOAL</span>EX
                </div>
                <ul className="nav-items">
                    <li>
                        <div>Featured</div>
                    </li>
                    <li>
                        <div className="login-btn">
                            Login
                        </div>
                    </li>
                    <li>
                        <div className="register-btn">
                            Signup
                        </div>
                    </li>
                </ul>:
                <ul className="nav-items">
                    <li>
                        <div>
                            Creator
                        </div>
                    </li>
                    <li>
                        <div>
                            My Course
                        </div>
                    </li>
                    <li>
                        <Button type="primary" shape="round" icon={<DownloadOutlined />} size={"medium"} >
                            Connect
                        </Button>
                    </li>
                    <li>
                        <div>
                            Featured
                        </div>
                    </li>
                    <li>
                        {/* <Popover placement="bottomRight" title="Jignest" content={content}> */}
                        <img className="nav-profile-img" src="/assets/svg/creator-dashboard/man.svg" alt="" />
                        <span className="nav-profile-name">Jignesh</span>
                        {/* </Popover> */}
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;