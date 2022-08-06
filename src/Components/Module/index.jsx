import React, { useState, useEffect } from "react"
import './Module.scss'
import { UploadOutlined } from "@ant-design/icons"

const ModuleCard = (props) => {

  const [moduleResp, setModuleResp] = useState([]);

  const handleModuleResp = (moduleId, e) => {
    let oldResponseData = [...moduleResp];
    oldResponseData[moduleId - 1] = e.target.value
    setModuleResp(oldResponseData);
    console.log(" updating response ", oldResponseData);
  }
  console.log(" there are props ", props);

  return (
    <div className="module-card">
      <h1> Module: {props.data.name} </h1>
      <div className="module-card-inputarea">
        {props.data.questions.map((question, id) => (
          <>
            <h4> {++id + ") " + question}  </h4>
            <input type="text" placeholder="Enter your answer here" onChange={(e) => handleModuleResp(id, e)} />
          </>
        ))
        }
      </div>
      <button  className="module-card-submit" onClick={() => props.handleSubmit(props.data.id, moduleResp)}> <UploadOutlined /> Submit </button>
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