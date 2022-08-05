import React, { useState, useEffect, useContext } from "react"
import './Submission.scss'
import { UserContext } from "../../../../Provider/UserProvider"
import { useParams } from "react-router-dom"
import { getSubmission, setMark } from "../../../../Services/InstituteUtilities"
import { Button, Card } from "antd"
import Loader from '../../../../Components/Loader/index'
import toast, { Toaster } from 'react-hot-toast'
import { useMoralis } from "react-moralis"

const Submission = () => {
    const { authenticate, isAuthenticated, user } = useMoralis();
    // const { user, isLoading } = useContext(UserContext)
    const { courseId, streamId } = useParams();
    const [submission, setSubmission] = useState([]);
    const [mark, setMarks] = useState(0);
    const [loading, setIsLoading] = useState(false);

    const getAndSet = async () => {
        try {
            setIsLoading(true);
            console.log(streamId + " " + courseId);
            let data = await getSubmission(user.id, streamId, courseId)
            console.log(" this is ubs data", data);
            setSubmission(data);
            setIsLoading(false);
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getAndSet();
    }, [user]);

    const markIt = async (id, studentId) => {
        try {
            setIsLoading(true);
            await setMark(user.id, streamId, courseId, id, mark, studentId);
            setIsLoading(false);
            toast.success("Successfully marked it !!");
        } catch (err) {
            toast.error("Error while marking it");
            console.log(err.message);
        }
    }

    const backgroundStyling = {
        backgroundImage: `url("/asset/general/images/lfg-4.png")`,
        backgroundRepeat: "no-repeat",
        height: "100vh",
        backgroundSize: "100% 100%",
    };

    return (
        <div>
            <Loader isLoading={loading} message={"Loading all submissions..."} >
            <Toaster />
            <div className="submission-dashboard">
                <div className="submission-dashboard-bg" style={backgroundStyling}>
                    <h1>Submissions here: </h1>
                    <p> Mark and manage all submission here </p>
                </div>
                <div className="submission-dashboard-content">
            {submission.length === 0 ? <h3 className="no-submission"> No Submission yet </h3> :  null}
            <div className="submission-container">
                {submission.map((data, id) => {
                    return (
                        <div>
                            <Card className="submission-container-card" extra={ data.marked ? <p> Marked </p> : <p> Not Marked </p>}>
                                <Card.Meta title={"Assignment: #" + id + " Submission"} />
                                <p className="submissions">{data.ans2}</p>
                                <input type="number" placeholder="Enter marks out of 10" onChange={(e) => setMarks(e.target.value)} />
                                <button onClick={(e) => markIt(data.id, data.studentId)}> Mark it </button>
                            </Card>
                        </div>
                    )
                })}
            </div>
            </div>
            </div>
            </Loader>
        </div>
    )
}

export default Submission;
