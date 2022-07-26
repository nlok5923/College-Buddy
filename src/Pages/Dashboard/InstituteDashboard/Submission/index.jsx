import React, { useState, useEffect, useContext } from "react"
import './Submission.scss'
import { UserContext } from "../../../../Provider/UserProvider"
import { useParams } from "react-router-dom"
import { getSubmission, setMark } from "../../../../Services/InstituteUtilities"
import { Button } from "antd"

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

    const markIt = async (id) => {
        try {
            await setMark(user.uid, streamId, courseId, id, mark);
        } catch(err) {
            console.log(err.message);
        }
    }

    return (        
        <div>
            <div className="submission-container">
                {submission.map((data, id) => {
                    return(
                        <div>
                            <h3>{data.ans1}</h3>
                            <h3>{data.ans2}</h3>
                            <input type="number" placeholder="Enter marks out of 10" onChange={(e) => setMarks(e.target.value)} />
                            <Button onClick = {(e) => markIt(data.id) }> Mark it </Button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Submission;
