import React, { useState, useContext, useEffect } from "react"
import { Redirect } from "react-router-dom";
import { UserContext } from "../../Provider/UserProvider"
import Promotion from "./Components/Promotion/index"
import "./Home.scss";

const Home = () => {
  const info = useContext(UserContext);
  const { user, isLoading } = info;
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    console.log(user);
    if (user && !isLoading) {
      if (user.role === "ADVT") {
        setRedirect("/advertiser-dashboard");
      } else if (user.role === "INST") {
        setRedirect("/institute-dashboard");
      } else if (user.role === "STD") {
        setRedirect("/student-dashboard");
      }
    }
  }, [user, isLoading])

  if(redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <div>
      <Promotion />
    </div>
  );
};

export default Home;