import AXIOS_API from './axios';
import handleError from './handleError';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import TodoList from './../build/contracts/TodoList.json';

class Api {
  constructor() {
    this.load();
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

  async loadWeb3() {
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
    } else if (window.web3) {
      window.web3Provider = window.web3.currentProvider;
      window.web3 = new Web3(window.web3.currentProvider);
      // Acccounts always exposed
      window.web3.eth.sendTransaction({
        /* ... */
      });
    } else {
      console.log(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      );
    }
  }

  async loadContract() {
    this.contracts.TodoList = TruffleContract(TodoList);
    this.contracts.TodoList.setProvider(window.web3.currentProvider);

    // Hydrate the smart contract with values from the blockchain
    this.todoList = await this.contracts.TodoList.deployed();
  }

  async loadAccount() {
    // Set the current blockchain account
    this.accounts = await window.web3.eth.getAccounts();
    window.web3.eth.defaultAccount = this.accounts[0];
  }

  async loadTodoList() {
    console.log(this.todoList);
    console.log(await this.todoList.createTask('Anurag'));
    // window.location.reload();
    // const taskCount = await this.todoList.taskCount();
    // console.log(taskCount.toNumber());

    // console.log(await this.todoList.tasks(1));
    // for (var i = 1; i <= taskCount; i++) {
    //   const task = await this.todoList.tasks(i);
    //   const taskId = task[0].toNumber();
    //   console.log(taskId);
    // }
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
