import './StudentDashboard.scss'
import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../Provider/UserProvider";
import { Card, Button } from 'antd'
import { studentEnroll } from '../../../Services/StudentUtilities';

const StudentDashboard = () => {

  const history = useHistory();
  const info = useContext(UserContext);
  const { user, isLoading } = info;
  const [redirect, setredirect] = useState(null);
  const [courseId, setCourseId] = useState('');

  const { Meta } = Card;

  useEffect(() => {
    console.log(user);
  }, [user]);

  const enroll = async () => {
    await studentEnroll(courseId, user.uid);
  }

  return (
    <div>
      <div className="sdb">
        <div className="sdb-container">
          <div className="sdb-container-bg">
            <Card title="Card title">
              {
                [1, 2, 3, 4].map((data, id) => (
                  <Card type="inner" className="course-sub-card" title="Inner Card title" extra={<a href="#">More</a>}>
                    Inner Card content
                  </Card>
                ))
              }
            </Card>
          </div>
          <div className="sdb-container-inputarea">
            <input type="text" placeholder="Enter class id" onChange={(e) => setCourseId(e.target.value)} />
              <button onClick={() => enroll()}> Join </button>
            {
              [1, 2, 3, 4, 5].map((data, id) => {
                return (
                  <Card
                    key={id}
                    style={{
                      width: 800,
                    }}
                    className="sdb-container-inputarea-card"
                    cover={
                      <img
                        alt="example"
                        src={`asset/Home/Images/footer.png`}
                      />
                    }
                  >
                    <Meta
                      // avatar={}
                      title={"caption text"}
                      description={`By #username`}
                    />
                  </Card>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;