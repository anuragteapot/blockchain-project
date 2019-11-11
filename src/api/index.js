import AXIOS_API from './axios';
import handleError from './handleError';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import Todo from './../build/contracts/TodoList.json';

class Api {
  constructor() {
    this.loadWeb3();
  }

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  async loadWeb3() {
    // Modern dapp browsers...

    // if (typeof web3 !== 'undefined') {
    //   this.web3Provider = window.web3.currentProvider;
    //   this.web3 = new Web3(window.web3.currentProvider);
    // } else {
    //   window.alert('Please connect to Metamask.');
    // }

    // console.log(this.web3.eth.accounts[0]);

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
      window.web3Provider = window.web3.currentProvider;
      window.web3 = new Web3(window.web3.currentProvider);
      // Acccounts always exposed
      window.web3.eth.sendTransaction({
        /* ... */
      });
    }
    // Non-dapp browsers...
    else {
      console.log(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      );
    }
  }

  async LOGIN(email, password) {
    try {
      return await AXIOS_API.post('/api/auth', {
        email,
        password
      });
    } catch (err) {
      new handleError()._handleError(err);
    }
  }

  async GET_USER() {
    try {
      return await AXIOS_API.get('/api/user');
    } catch (err) {
      new handleError()._handleError(err);
    }
  }

  async SIGNUP(email, password, name, age) {
    try {
      return await AXIOS_API.post('/api/user', {
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
