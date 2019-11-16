import AXIOS_API from "./axios";
import handleError from "./handleError";

class Api {
  constructor() {}

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

  async UPLOAD(id, formData) {
    try {
      return await AXIOS_API.post(`/api/action/upload/${id}`, formData, {
        retry: 3,
        retryDelay: 1000,
        onUploadProgress: e => {
          console.log(Math.round((e.loaded * 100) / e.total));
        }
      });
    } catch (err) {
      new handleError()._handleError(err);
    }
  }

  async GET_CASE() {
    try {
      return await AXIOS_API.get(`/api/action/suit/get`);
    } catch (err) {
      new handleError()._handleError(err);
    }
  }

  async ADD_CASE(data) {
    try {
      return await AXIOS_API.post(`/api/action/suit/create`, data);
    } catch (err) {
      new handleError()._handleError(err);
    }
  }

  async UPDATE_CASE(data) {
    try {
      return await AXIOS_API.post(`/api/action/suit/update`, data);
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

  async SIGNUP(email, password, name, age, type) {
    try {
      return await AXIOS_API.post("/api/user", {
        email,
        password,
        age,
        name,
        type
      });
    } catch (err) {
      new handleError()._handleError(err);
    }
  }
}

export default new Api();
