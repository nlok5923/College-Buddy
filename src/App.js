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

const App = () => {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/advertiser-login" component={AdvertiserLogin} />
            <Route exact path="/advertiser-register" component={AdvertiserRegister} />
            <Route exact path="/institute-login" component={InstituteLogin} />
            <Route exact path="/institute-register" component={InstituteRegister} />
          </Switch>
          <Footer />
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
