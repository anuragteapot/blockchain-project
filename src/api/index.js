import AXIOS_API from "./axios";
import handleError from "./handleError";
import Web3 from "web3";
import TruffleContract from "truffle-contract";
import SuitList from "./../build/contracts/SuitList.json";

class Api {
  constructor() {
    this.contracts = {};
    this.SuitList = null;
    this.accounts = [];
  }

  async getSuit() {
    await this.loadWeb3();
    await this.loadAccount();
    await this.loadContract();
    return await this.loadSuitList();
  }

  async loadWeb3() {
    if ("ethereum" in window) {
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
    } else if ("web3" in window) {
      window.web3Provider = window.web3.currentProvider;
      window.web3 = new Web3(window.web3.currentProvider);
      // Acccounts always exposed
      window.web3.eth.sendTransaction({
        /* ... */
      });
    } else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadContract() {
    if ("web3" in window) {
      this.contracts.SuitList = TruffleContract(SuitList);
      this.contracts.SuitList.setProvider(window.web3.currentProvider);

      // Hydrate the smart contract with values from the blockchain
      this.SuitList = await this.contracts.SuitList.deployed();
    }
  }

  async loadAccount() {
    if ("web3" in window) {
      // Set the current blockchain account
      this.accounts = await window.web3.eth.getAccounts();
      window.web3.eth.defaultAccount = this.accounts[0];
    }
  }

  async loadSuitList() {
    const taskCount = await this.SuitList.suitCount();
    let result = [];
    for (let i = 1; i <= taskCount.toNumber(); i++) {
      const suit = await this.SuitList.suits(i);
      result.push(suit);
    }
    return result;
  }

  async LOGIN(email, password) {
    try {
      return await AXIOS_API.post("/api/auth", {
        email,
        password
      });
    } catch (err) {
      new handleError()._handleError(err);
    }
  }

  async GET_USER() {
    try {
      return await AXIOS_API.get("/api/user");
    } catch (err) {
      new handleError()._handleError(err);
    }
  }

  async SIGNUP(email, password, name, age) {
    try {
      return await AXIOS_API.post("/api/user", {
        email,
        password,
        age,
        name
      });
    } catch (err) {
      new handleError()._handleError(err);
    }
  }
}

export default new Api();
