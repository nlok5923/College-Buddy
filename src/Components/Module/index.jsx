import React from "react"
import './Module.scss'
import { UploadOutlined } from "@ant-design/icons"

const ModuleCard = (props) => {
    return (
        <div className="module-card">
            <h1> Module: Name </h1>
            <div className="module-card-inputarea">
                <h4> 1) {props.data.q1} </h4>
                <input type="text" placeholder="Enter your answer here" name="q1" onChange={(e) => props.handleModuleAns(e)} />
                <h4> 2) {props.data.q2} </h4>
                <input type="text" placeholder='Enter your answer here' name="q2" onChange={(e) => props.handleModuleAns(e)} />
            </div>
            <button onClick={() => props.handleSubmit(props.data.id)} className="module-card-submit"> <UploadOutlined /> Submit </button>
        </div>
    )
}

export default ModuleCard;

{/* <Card type="inner" className="course-sub-card">
                      <h4 className="spn-modules"> Q1) {data.q1}</h4>
                      <input className="spn-modules" placeholder="Enter your answer here" name="q1" onChange={(e) => setResp({
                        ...resp,
                        [e.target.name]: e.target.value
                      })} />
                      <h4 className="spn-modules"> Q2) {data.q2} </h4>
                      <input placeholder='Enter your answer here' name="q2" onChange={(e) => setResp({
                        ...resp,
                        [e.target.name]: e.target.value
                      })} /> <br />
                      <Button className="spn-modules" onClick={() => handleModuleSubmit(data.id)}> Submit </Button>
                    </Card> */}