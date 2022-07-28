import React, { useState, useEffect, useContext } from "react"
import './Submission.scss'
import { UserContext } from "../../../../Provider/UserProvider"
import { useParams } from "react-router-dom"
import { getSubmission, setMark } from "../../../../Services/InstituteUtilities"
import { Button, Card } from "antd"

const Submission = () => {
    const { user, isLoading } = useContext(UserContext)
    const { courseId, streamId } = useParams();
    const [submission, setSubmission] = useState([]);
    const [mark, setMarks] = useState(0);

    const getAndSet = async () => {
        console.log(streamId + " " + courseId);
        let data = await getSubmission(user.uid, streamId, courseId)
        console.log(" this is ubs data", data);
        setSubmission(data);
    }

    useEffect(() => {
        getAndSet();
    }, [user, isLoading]);

    const markIt = async (id, studentId) => {
        try {
            await setMark(user.uid, streamId, courseId, id, mark, studentId);
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div>
            <h3 className="no-submission">
                {submission.length === 0 ? "No Submissions yet " : " "}
            </h3>
            <div className="submission-container">
                {submission.map((data, id) => {
                    return (
                        <div>
                            <Card>
                                <Card.Meta title={"Assignment: #" + id + " Solution"} />
                                <p className="submissions">{data.ans2}</p>
                                <input type="number" placeholder="Enter marks out of 10" onChange={(e) => setMarks(e.target.value)} />
                                <button onClick={(e) => markIt(data.id, data.studentId)}> Mark it </button>
                            </Card>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Submission;
