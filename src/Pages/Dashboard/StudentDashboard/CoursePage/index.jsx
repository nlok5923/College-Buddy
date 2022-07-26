import React from "react"
import './CoursePage.scss'

const CoursePage = () => {
    return(
        <div className="course-page">
            <h3>Enter title </h3> <br />
            <input type="text" placeholder="Enter assignment title" />
            <h3> Enter Atomic essay </h3> <br />
            <textarea type="text" placeholder="Enter whole of your essay here" />
            <button> Submit </button>
        </div>
    )
}

export default CoursePage;