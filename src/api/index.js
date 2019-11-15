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
      return await AXIOS_API.post(`/api/action/upload${id}`, formData, {
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
