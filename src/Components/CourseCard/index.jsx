import React from "react";
import './CourseCard.scss'
import { LinkOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

const CourseCard = (props) => {
    const { Meta } = Card;
    return (
        <div>
            <Card
                className="course-card"
                style={{
                    width: 300,
                    padding: "10px"
                }}
                cover={
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                }
            >
                <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={"Assignment: " + props.postData.name}
                    description={props.postData.id}
                    style={{ fontWeight: "bold" }}
                />
                <button className="resp-btn"> &#8594; </button>
            </Card>
        </div>
    )
}

export default CourseCard;