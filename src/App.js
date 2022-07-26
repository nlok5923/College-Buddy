import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/index"
import Footer from "./Components/Footer/index"
import AdvertiserRegister from "./Pages/AdvertiserRegister/index"
import InstituteRegister from "./Pages/InstituteRegister/index"
import Home from "./Pages/Home/index"
import UserProvider from "./Provider/UserProvider"
import InstituteDashboard from "./Pages/Dashboard/InstituteDashboard";
import AddCourses from "./Pages/Dashboard/InstituteDashboard/AddCourses";
import StudentDashboard from "./Pages/Dashboard/StudentDashboard/index"
import AdvertiserDashboard from "./Pages/Dashboard/AdvertiserDashboard/index"
import StudentRegister from "./Pages/StudentRegister/index"
import CoursePage from "./Pages/Dashboard/StudentDashboard/CoursePage";
import Submission from "./Pages/Dashboard/InstituteDashboard/Submission";
import ContractProvider from "./Provider/ContractProvider";

const App = () => {
  return (
    <div className="App">
      <UserProvider>
        <ContractProvider>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/advertiser-register" component={AdvertiserRegister} />
              <Route exact path="/institute-register" component={InstituteRegister} />
              <Route exact path="/institute-dashboard" component={InstituteDashboard} />
              <Route exact path="/institute-dashboard/:streamId" component={AddCourses} />
              <Route exact path="/institute-dashboard/:streamId/:courseId" component={Submission} />
              <Route exact path="/advertiser-dashboard" component={AdvertiserDashboard} />
              <Route exact path="/student-dashboard" component={StudentDashboard} />
              <Route exact path="/student-register" component={StudentRegister} />
              <Route exact path="/student-dashboard/course/:courseId" component={CoursePage} />
            </Switch>
            <Footer />
          </Router>
        </ContractProvider>
      </UserProvider>
    </div>
  );
}

export default App;
