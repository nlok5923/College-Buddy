import React from "react";
import './AddCourses.scss'
import CourseCard from "../../../../Components/CourseCard";

const AddCourses = () => {
    return (
        <div>
            {/* <h1> Stream name</h1> */}
        <div className="add-course-container" style={{ 
            display: "grid",
            width: "80%",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gridColumnGap: "3vw",
            gridRowGap: "30px",
            marginTop: "3%",
            marginLeft: "2%",
         }}>
            {[1,2,3,4,5,6].map((data, id) => <CourseCard style={{ marginLeft: "10px", padding: "10px" }} key={id} postData={data} />)}
        </div>
        </div>
    )
}

export default AddCourses;