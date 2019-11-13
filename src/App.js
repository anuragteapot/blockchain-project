import React, { Component } from "react";
import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import SignIn from "./components/signin";
import Main from "./components/main";
import SignUp from "./components/signup";
import CheckOut from "./components/checkout";
import { UserProvider } from "./context/userContext";
import api from "./api";
import SimpleSnackbar from "./components/SimpleSnackbar";
import Judge from "./components/judge";
import Profile from "./components/Profile";
import { ethers } from "ethers";
// import NotFound from './components/notfound';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  stoh(string) {
    return ethers.utils.formatBytes32String(string);
  }

  async componentDidMount() {
    const user = await api.GET_USER();
    if (user) {
      this.setState({
        user: user.data
      });
    }

    const data = await api.getSuit();
    console.log(data);

    await api.SuitList.createSuit(
      this.stoh("ff"),
      this.stoh("gg"),
      this.stoh("Anurag content"),
      this.stoh("anurag"),
      this.stoh("anurag"),
      this.stoh("anurag"),
      this.stoh("anurag"),
      this.stoh("anurag"),
      this.stoh("Passed")
    );
    console.log(ethers.utils.parseBytes32String(data[0].accusedContent));
  }

  render() {
    return (
      <div className="App">
        <UserProvider value={{ ...this.state.user }}>
          <Router>
            <div>
              <Route exact path="/" component={Main} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/new" component={CheckOut} />
              <Route path="/judge" component={Judge} />
              <Route path="/profile" component={Profile} />
              {/* <Route path='*'  component={NotFound} /> */}
            </div>
          </Router>
        </UserProvider>
        <SimpleSnackbar></SimpleSnackbar>
      </div>
    );
  }
}

export default App;
