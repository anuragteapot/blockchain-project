import React, { Component } from "react";
import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import SignIn from "./components/signin";
import Main from "./components/main";
import SignUp from "./components/signup";
import CheckOut from "./components/checkout";
import { UserProvider } from "./context/userContext";
import { ContractProvider } from "./context/contractContext";
import SimpleSnackbar from "./components/SimpleSnackbar";
import Judge from "./components/judge";
import Profile from "./components/Profile";
import { ethers } from "ethers";
import Web3 from "web3";
import api from "./api";
import truffleContract from "truffle-contract";
import suitList from "./build/contracts/SuitList.json";
// import NotFound from './components/notfound';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storageData: [],
      web3: null,
      accounts: null,
      contract: null,
      user: {}
    };
  }

  stoh(string) {
    return ethers.utils.formatBytes32String(string);
  }

  htos(string) {
    return ethers.utils.parseBytes32String(string);
  }

  componentDidMount = async () => {
    const user = await api.GET_USER();

    if (user) {
      this.setState({
        user: user.data
      });
    }

    try {
      // Modern dapp browsers...
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          window.web3.eth.sendTransaction({
            /* ... */
          });
        } catch (error) {
          // User denied account access...
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        // Acccounts always exposed
        window.web3.eth.sendTransaction({
          /* ... */
        });
      }
      // Non-dapp browsers...
      else {
        console.log(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }

      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();

      const Contract = truffleContract(suitList);
      Contract.setProvider(web3.currentProvider);
      const instance = await Contract.deployed();

      this.setState(
        {
          web3,
          accounts,
          contract: instance
        },
        this.loadData
      );
    } catch (err) {
      console.log(err);
    }
  };

  loadData = async () => {
    const { contract } = this.state;

    const taskCount = await contract.suitCount();

    let result = [];
    for (let i = 1; i <= taskCount.toNumber(); i++) {
      const suit = await contract.suits(i);
      result.push(suit);
    }
    this.setState({
      storageData: result
    });
  };

  handleClick = async () => {
    const { accounts, contract } = this.state;
    const data = [
      "1",
      "2",
      "Anurag content",
      "anurag",
      "anurag",
      "anurag",
      "anurag",
      "anurag",
      "Passed"
    ];

    const hexData = data.map(val => this.stoh(val));
    await contract.createSuit(...hexData, { from: accounts[0] });
  };
  render() {
    return (
      <div className="App">
        <UserProvider value={{ ...this.state.user }}>
          <ContractProvider value={{ ...this.state }}>
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
          </ContractProvider>
        </UserProvider>
        <SimpleSnackbar></SimpleSnackbar>
      </div>
    );
  }
}

export default App;
