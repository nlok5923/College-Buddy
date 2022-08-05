import React from "react";
import './CourseCard.scss'
import { LinkOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { deleteAssignment } from '../../Services/InstituteUtilities'
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";

const CourseCard = (props) => {
    const { Meta } = Card;

    const deleteCurrentAssignment = async () => {
        try {
            await deleteAssignment(props.instId, props.streamId, props.postData.id);
            toast.success("Successfully deleted assignment !");
            props.fetchCourses();
        } catch (err) {
            toast.error("Something bad occured");
            console.log(err.message);
        }
    }

    return (
        <div>
            <Toaster />
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
                <div className="course-card-btn-align">
                    <button className="delete-btn" onClick={() => deleteCurrentAssignment()}>
                        <DeleteOutlined />
                    </button>
                    <Link to={`/institute-dashboard/${props.streamId}/${props.postData.id}`} >
                        <button className="resp-btn"> &#8594; </button>
                    </Link>
                </div>
            </Card>
        </div>
    )
}

export default CourseCard;