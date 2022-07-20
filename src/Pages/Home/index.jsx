import "./Home.scss";
import TopContainer from "./Components/TopContainer/TopContainer";
import OfferComponent from "./Components/Offer/Offer";
import Collaborations from "./Components/Collaborations/Collaborations";

const Dashboard = () => {
  return (
    <div>
      <TopContainer />
      <div className="collaboration-container">
        <Collaborations />
      </div>
      <div className="offer-container">
        <OfferComponent />
      </div>
    </div>
  );
};

export default Dashboard;