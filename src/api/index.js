import AXIOS_API from './axios';
import handleError from './handleError';

class Api {
  constructor() {
    // this.GET_USER('anuragvnsk@gmail.com', 'anurag');
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
