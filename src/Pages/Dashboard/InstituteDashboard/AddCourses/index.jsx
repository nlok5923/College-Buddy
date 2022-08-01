import React, { useState, useContext, useEffect } from "react";
import './AddCourses.scss'
import CourseCard from "../../../../Components/CourseCard";
import { Button, Modal } from 'antd'
import { DownloadOutlined, FileAddOutlined } from "@ant-design/icons";
import { UserContext } from "../../../../Provider/UserProvider";
import { useParams } from "react-router-dom";
import { AddCourses, fetchCourses } from "../../../../Services/InstituteUtilities";
import { Link } from "react-router-dom";
import Loader from '../../../../Components/Loader/index'
import toast, { Toaster } from 'react-hot-toast'
import { useMoralis } from "react-moralis"

const AddCoursesComponent = () => {
    // const info = useContext(UserContext);
    // const { user, isLoading } = info;
    let { streamId } = useParams();
    const { authenticate, isAuthenticated, user } = useMoralis();
    const [courseData, setCourseData] = useState({ name: "" });
    const [file, setFile] = useState(null);
    const [courses, setCourses] = useState([]);
    const [loading, setIsLoading] = useState(false);

    const getCourses = async () => {
        setIsLoading(true);
        if(user && streamId) {
            console.log("this is user id and stream id ", user.id + " " + streamId)
            const data = await fetchCourses(user.id, streamId);
            // console.log("all keys", Object.keys(data))
            console.log(" these are the obtained courses ", JSON.stringify(data));
            // console.log(" this is obtained data length ", data[0])
            setCourses(data);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        console.log(" this is called ");
        getCourses();
    }, [user])


    const handleModalChange = (e) => {
        setCourseData({
            ...courseData,
            [e.target.name]: e.target.value
        })
    }

    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleOk = async () => {
        try {
            setIsLoading(true);
            await AddCourses(user.id, streamId, courseData.name, file);
            setIsModalVisible(false);
            setIsLoading(false);
            toast.success("Assignment added successfully ");
            window.location.reload();
        } catch (err) {
            toast.error("Error happened while adding assignment");
            console.log(err.message);
        }
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    const OpenModal = () => {
        setIsModalVisible(true);
    }

    return (
        <div>
            <Loader isLoading = {loading} >
                <Toaster />
            <Modal title="Add Assignment" visible={isModalVisible} onOk={() => handleOk()} onCancel={() => handleCancel()}>
                <div className="course-container">
                    <input type="text" placeholder="Assignment name" name="name" onChange={(e) => handleModalChange(e)} />
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                ></input>
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
                {/* { courses.length } */}
                {courses.length === 0 ? "No Assignments added till now" : null }
                {courses.map((data, id) => <Link to={`/institute-dashboard/${streamId}/${data.id}`} >
                    <CourseCard style={{ marginLeft: "10px", padding: "10px" }} key={id} postData={data} cardId={id + 1} />
                </Link>
                )}
            </div>
            </Loader>
        </div>
    )
}

export default AddCoursesComponent;