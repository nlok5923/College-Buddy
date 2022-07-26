import React, { useState, useContext, useEffect } from "react";
import './AddCourses.scss'
import CourseCard from "../../../../Components/CourseCard";
import { Button, Modal } from 'antd'
import { DownloadOutlined, FileAddOutlined } from "@ant-design/icons";
import { UserContext } from "../../../../Provider/UserProvider";
import { useParams } from "react-router-dom";
import { AddCourses, fetchCourses } from "../../../../Services/InstituteUtilities";
import { Link } from "react-router-dom";

const AddCoursesComponent = () => {
    const info = useContext(UserContext);
    const { user, isLoading } = info;
    let { streamId } = useParams();
    const [courseData, setCourseData] = useState({ name: "", code: "", description: "" });
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
        window.location.reload();
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    const OpenModal = () => {
        setIsModalVisible(true);
    }

    return (
        <div>
            <Modal title="Add Assignment" visible={isModalVisible} onOk={() => handleOk()} onCancel={() => handleCancel()}>
                <div className="course-container">
                    <input type="text" placeholder="Question 1" name="name" onChange={(e) => handleModalChange(e)} />
                    <input type="text" placeholder="Question 2" name="code" onChange={(e) => handleModalChange(e)} />
                </div>
            </Modal>
            <Button type="primary" className="course-card-btn" shape="round" icon={<FileAddOutlined />} size={"large"} onClick={() => OpenModal()}>
                Add Assignment
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
                {courses.map((data, id) => <Link to={`/institute-dashboard/${streamId}/${data.id}`} >
                    <CourseCard style={{ marginLeft: "10px", padding: "10px" }} key={id} postData={data} cardId={id + 1} />
                </Link>
                )}
            </div>
        </div>
    )
}

export default AddCoursesComponent;