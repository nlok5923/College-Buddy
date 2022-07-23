import React, { useState, useContext, useEffect } from "react";
import './AddCourses.scss'
import CourseCard from "../../../../Components/CourseCard";
import { Button, Modal } from 'antd'
import { DownloadOutlined } from "@ant-design/icons";
import { UserContext } from "../../../../Provider/UserProvider";
import { useParams } from "react-router-dom";
import { AddCourses, fetchCourses } from "../../../../Services/InstituteUtilities";

const AddCoursesComponent = () => {
    const info = useContext(UserContext);
    const { user, isLoading } = info;
    let { streamId } = useParams();
    const [courseData, setCourseData] = useState({name: "", code: "", description: ""});
    const [courses, setCourses] = useState([]);

    const getCourses = async () => {
        const data = await fetchCourses(user.uid, streamId);
        console.log(" these are the obtained courses ", data);
        setCourses(data);
    }

    useEffect(() => {
        getCourses();
    }, [user, isLoading])

    
    const handleModalChange = (e) => {
        setCourseData({
            ...courseData,
            [e.target.name]: e.target.value
        })
    }

    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleOk = async () => {
        await AddCourses(user.uid, streamId, courseData.name, courseData.code, courseData.description);
        setIsModalVisible(false);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    const OpenModal = () => {
        setIsModalVisible(true);
    }

    return (
        <div>
            {/* <h1> Stream name</h1> */}
            <Modal title="Add Course" visible={isModalVisible} onOk={() => handleOk()} onCancel={() => handleCancel()}>
                <div className="course-container">
                    <input type="text" placeholder="Course name" name="name" onChange={(e) => handleModalChange(e)} />
                    <input type="text" placeholder="course code" name="code" onChange={(e) => handleModalChange(e)} />
                    <input type="text" placeholder="Course tagline" name="description" onChange={(e) => handleModalChange(e)} />
                </div>
            </Modal>
            <Button type="primary" className="course-card-btn" shape="round" icon={<DownloadOutlined />} size={"large"} onClick={OpenModal}>
                Add Streams
            </Button>
            <div className="add-course-container" style={{
                display: "grid",
                width: "80%",
                gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
                gridColumnGap: "3vw",
                gridRowGap: "30px",
                marginTop: "1%",
                marginLeft: "2%",
            }}>
                {courses.map((data, id) => <CourseCard style={{ marginLeft: "10px", padding: "10px" }} key={id} postData={data} />)}
            </div>
        </div>
    )
}

export default AddCoursesComponent;