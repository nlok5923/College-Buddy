import React from "react"
import './AssignmentCard.scss'
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons"
import { Popover } from "antd"

const AssignmentCard = (props) => {
    return (
        <div className="assignment">
            <Popover content={props.data.name}>
            <h1> Assignment: {props.data.name.slice(0, 12) + "..."} </h1>
            </Popover>
            <span>
                <h3> File: <button onClick={() => {
                    window.location.href = props.data.code
                }} > <DownloadOutlined /> Download </button> </h3>
            </span>
            <div className="assignment-txtarea">
                <textarea className='assignment-ans-txtarea' placeholder='Enter ans for the assignment' name="ans2" onChange={(e) => props.handleAnsChange(e)} />
            </div>
            <button onClick={() => props.handleAnsSubmit(props.data.id)} className="assignment-submit"> <UploadOutlined /> Submit </button>
        </div>
    )
}

export default AssignmentCard;

{/* <Card type="inner" className="course-sub-card" title={`Assignment: ${data.name}`} >
<Button onClick={() => {
  window.location.href = data.code
}}> Download Assignment </Button>
<textarea className='assignment-ans-txtarea' placeholder='Enter ans for the assignment' name="ans2" onChange={(e) => handleChange(e)} /> <br /> <br />
<Button onClick={() => handleAns(data.id)}> Submit </Button>
</Card> */}