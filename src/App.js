import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/index"
import Footer from "./Components/Footer/index"

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
