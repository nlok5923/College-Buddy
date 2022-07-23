import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/index"
import Footer from "./Components/Footer/index"
import AdvertiserLogin from "./Pages/AdvertiserLogin/index"
import AdvertiserRegister from "./Pages/AdvertiserRegister/index"
import InstituteLogin from "./Pages/InstituteLogin/index"
import InstituteRegister from "./Pages/InstituteRegister/index"
import Home from "./Pages/Home/index"
import UserProvider from "./Provider/UserProvider"
import InstituteRegisterForm from './Pages/InstituteRegister/RegistrationForm/index'
import InstituteDashboard from "./Pages/Dashboard/InstituteDashboard";
import AddCourses from "./Pages/Dashboard/InstituteDashboard/AddCourses";
import StudentDashboard from "./Pages/Dashboard/StudentDashboard/index"
import AdvertiserDashboard from "./Pages/Dashboard/AdvertiserDashboard/index"

const App = () => {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/advertiser-login" component={AdvertiserLogin} />
            <Route exact path="/advertiser-register" component={AdvertiserRegister} />
            <Route exact path="/institute-login" component={InstituteLogin} />
            <Route exact path="/institute-register" component={InstituteRegister} />
            <Route exact path="/institute-register/:instId" component={InstituteRegisterForm} />
            <Route exact path="/institute-dashboard" component={InstituteDashboard} />
            <Route exact path="/institute-dashboard/:streamId" component={AddCourses} />
            <Route exact path="/advertiser-dashboard" component={AdvertiserDashboard} />
            <Route exact path="/student-dashboard" component={StudentDashboard} />
          </Switch>
          <Footer />
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
