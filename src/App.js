import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/index";
import AdvertiserRegister from "./Pages/AdvertiserRegister/index";
import InstituteRegister from "./Pages/InstituteRegister/index";
import Home from "./Pages/Home/index";
import UserProvider from "./Provider/UserProvider";
import InstituteDashboard from "./Pages/Dashboard/InstituteDashboard";
import AddCourses from "./Pages/Dashboard/InstituteDashboard/AddCourses";
import StudentDashboard from "./Pages/Dashboard/StudentDashboard/index";
import AdvertiserDashboard from "./Pages/Dashboard/AdvertiserDashboard/index";
import StudentRegister from "./Pages/StudentRegister/index";
import CoursePage from "./Pages/Dashboard/StudentDashboard/CoursePage";
import Submission from "./Pages/Dashboard/InstituteDashboard/Submission";
import ContractProvider from "./Provider/ContractProvider";
import PoapRequest from "./Pages/Dashboard/AdvertiserDashboard/PoapRequests/index";
import POAWall from "./Pages/Dashboard/StudentDashboard/POAWall/index";
import SendSomeToken from "./Pages/SendSomeToken/index";
import ModuleResponse from "./Pages/Dashboard/AdvertiserDashboard/ModuleResponse";
import AboutUs from "./Pages/AboutUs/index";
import { MoralisProvider } from "react-moralis";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [chain.polygonMumbai, chain.ropsten, chain.goerli],
  [
    alchemyProvider({ alchemyId: process.env.REACT_APP_GOERLI_API_URL }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const App = () => {
  return (
    <div className="App">
      {/* <WagmiConfig client={wagmiClient}> */}
      {/* <RainbowKitProvider chains={chains}> */}
      <UserProvider>
        <ContractProvider>
          <MoralisProvider
            appId={process.env.REACT_APP_MORALIS_APP_ID}
            serverUrl={process.env.REACT_APP_MORALIS_DAPP_URL}
          >
            <Router>
              <Navbar />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route
                  exact
                  path="/advertiser-register"
                  component={AdvertiserRegister}
                />
                <Route
                  exact
                  path="/institute-register"
                  component={InstituteRegister}
                />
                <Route
                  exact
                  path="/institute-dashboard"
                  component={InstituteDashboard}
                />
                <Route
                  exact
                  path="/institute-dashboard/:streamId"
                  component={AddCourses}
                />
                <Route
                  exact
                  path="/institute-dashboard/:streamId/:courseId"
                  component={Submission}
                />
                <Route
                  exact
                  path="/advertiser-dashboard"
                  component={AdvertiserDashboard}
                />
                <Route
                  exact
                  path="/student-dashboard"
                  component={StudentDashboard}
                />
                <Route
                  exact
                  path="/student-register"
                  component={StudentRegister}
                />
                <Route
                  exact
                  path="/student-dashboard/course/:courseId"
                  component={CoursePage}
                />
                <Route
                  exact
                  path="/advertiser-dashboard/:advtId"
                  component={PoapRequest}
                />
                <Route
                  exact
                  path="/student-dashboard/:stdId"
                  component={POAWall}
                />
                <Route exact path="/send" component={SendSomeToken} />
                <Route
                  exact
                  path="/advertiser-dashboard/module/responses"
                  component={ModuleResponse}
                />
                <Route exact path="/about-us" component={AboutUs} />
              </Switch>
            </Router>
          </MoralisProvider>
        </ContractProvider>
      </UserProvider>
      {/* </RainbowKitProvider> */}
      {/* </WagmiConfig> */}
    </div>
  );
};

export default App;
