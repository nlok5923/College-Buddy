import React, { useState, useContext, useEffect } from "react"
import { Redirect } from "react-router-dom";
import { UserContext } from "../../Provider/UserProvider"
import Promotion from "./Components/Promotion/index"
import "./Home.scss";
import Footer from '../../Components/Footer/index'
import Services from "./Components/Services/index";
import Incentives from "./Components/Incentives/index";
import AdvertiserFacilities from "./Components/Facilities";
// import { ContractContext } from "../../Provider/ContractProvider";

const Home = () => {
  const info = useContext(UserContext);
  const { user, isLoading } = info;
  const [redirect, setRedirect] = useState(null);
  // const contractData = useContext(ContractContext);

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
      <Services />
      <Incentives />
      <AdvertiserFacilities />
      <Footer />
    </div>
  );
};

export default Home;