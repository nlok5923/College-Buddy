import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/index"
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
import PoapRequest from './Pages/Dashboard/AdvertiserDashboard/PoapRequests/index'
import POAWall from './Pages/Dashboard/StudentDashboard/POAWall/index'
import SendSomeToken from './Pages/SendSomeToken/index'
import ModuleResponse from "./Pages/Dashboard/AdvertiserDashboard/ModuleResponse";
import { MoralisProvider } from "react-moralis"

const App = () => {
  return (
    <div className="App">
      <UserProvider>
        <ContractProvider>
          <MoralisProvider appId={process.env.REACT_APP_MORALIS_APP_ID} serverUrl={process.env.REACT_APP_MORALIS_DAPP_URL}>
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
              <Route exact path="/advertiser-dashboard/:advtId" component={PoapRequest} />
              <Route exact path="/student-dashboard/:stdId" component={POAWall} />
              <Route exact path="/send" component={SendSomeToken} />
              <Route exact path="/advertiser-dashboard/module/responses" component={ModuleResponse} />
            </Switch>
          </Router>
          </MoralisProvider>
        </ContractProvider>
      </UserProvider>
    </div>
  );
}

export default App;
