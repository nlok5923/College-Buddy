import React from "react";
import './InstituteDashboard.scss'
import { Avatar, List } from 'antd';

const InstituteDashboard = () => {

    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];

    const backgroundStyling = {
        backgroundImage: `url("asset/Registration/institute/stream-bg.png")`,
        backgroundRepeat: "no-repeat",
        height: "100vh",
        backgroundSize: "100% 100%",
    };

    return (
        <div>
            <div className="dashboard-inst">
                <div className="dashboard-inst-container">
                    <div className="dashboard-inst-container-bg" style={backgroundStyling}>
                        <h1>Hey Institute</h1>
                        <p>Add some streams</p>
                    </div>
                    <div className="dashboard-inst-container-inputarea">
                        <div className="dashboard-inst-container-inputarea-boxarea">
                            <h1>
                                <b>
                                    <strong>Add Streams</strong>
                                </b>
                            </h1>

                            <div className="dashboard-inst-input">
                                <List
                                    size="large"
                                    itemLayout="horizontal"
                                    dataSource={data}
                                    renderItem={(item) => (
                                        <List.Item style={{ fontFamily: "montserrat", fontSize: "20px" }} actions={[<a key="list-loadmore-edit">Add Courses</a>]}>
                                            <List.Item.Meta
                                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                                title={<a href="https://ant.design">{item.title}</a>}
                                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                            />
                                        </List.Item>
                                    )}
                                />

                                <button>
                                    Add Stream
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstituteDashboard;