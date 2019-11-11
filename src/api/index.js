import AXIOS_API from './axios';
import handleError from './handleError';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import TodoList from './../build/contracts/TodoList.json';

class Api {
  constructor() {
    this.load();
    this.web3Provider = {};
    this.contracts = {};
    this.todoList = null;
    this.accounts = [];
  }

  async load() {
    await this.loadWeb3();
    await this.loadAccount();
    await this.loadContract();
    await this.loadTodoList();
  }

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  async loadWeb3() {
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

  async loadContract() {
    // Create a JavaScript version of the smart contract
    this.contracts.TodoList = TruffleContract(TodoList);
    // console.log(this.contracts.TodoList)
    this.contracts.TodoList.setProvider(window.web3Provider);

    // Hydrate the smart contract with values from the blockchain
    // this.todoList = await this.contracts.TodoList.deployed();
  }

  getCurrentProvider() {
    if (!window.web3) return 'unknown';

    if (window.web3.currentProvider.isMetaMask) return 'metamask';

    if (window.web3.currentProvider.isTrust) return 'trust';

    if (window.web3.currentProvider.isGoWallet) return 'goWallet';

    if (window.web3.currentProvider.isAlphaWallet) return 'alphaWallet';

    if (window.web3.currentProvider.isStatus) return 'status';

    if (window.web3.currentProvider.isToshi) return 'coinbase';

    if (typeof window.__CIPHER__ !== 'undefined') return 'cipher';

    if (window.web3.currentProvider.constructor.name === 'EthereumProvider')
      return 'mist';

    if (window.web3.currentProvider.constructor.name === 'Web3FrameProvider')
      return 'parity';

    if (
      window.web3.currentProvider.host &&
      window.web3.currentProvider.host.indexOf('infura') !== -1
    )
      return 'infura';

    if (
      window.web3.currentProvider.host &&
      window.web3.currentProvider.host.indexOf('localhost') !== -1
    )
      return 'localhost';

    return 'unknown';
  }

  async loadAccount() {
    // Set the current blockchain account
    this.accounts = await window.web3.eth.getAccounts();
  }

  async loadTodoList() {
    console.log(this.todoList);
    // const taskCount = await this.todoList.taskCount();
    // console.log(taskCount);
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
