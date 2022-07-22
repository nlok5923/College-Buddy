import "./Home.scss";
import Promotion from "./Components/Promotion/index"
// import TopContainer from "./Components/TopContainer/TopContainer";
// import OfferComponent from "./Components/Offer/Offer";
// import Collaborations from "./Components/Collaborations/Collaborations";

const Home = () => {
  return (
    <div>
      <Promotion />
      {/* <TopContainer />
      <div className="collaboration-container">
        <Collaborations />
      </div>
      <div className="offer-container">
        <OfferComponent />
      </div> */}
    </div>
  );
};

export default Home;