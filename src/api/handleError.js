import * as webStorage from './webStorage';
export default class handleError {

  /**
   *
   */
  setUser(userInfo) {
    webStorage.local.set('userInfo', JSON.stringify(userInfo));
  }

  /**
   * Handle errors
   * @param error
   */
  _handleError(error) {
    if (!error) {
      console.warn('Error object not defined');
      throw new Error('Error object not defined');
    }

    // let statusCode = 500;

    // try {
    //   errorData = {
    //     data: error.response.data.error.message,
    //     color: 'error'
    //   };
    //   statusCode = error.response.status;
    // } catch (err) {
    //   errorData = {
    //     data: 'Something went wrong please try again.',
    //     color: 'error'
    //   };
    // }

    // switch (statusCode) {
    //   case 400:
    //     break;
    //   case 404:
    //     break;
    //   case 401:
    //     break;
    //   case 500:
    //     break;
    // }
    throw error;
  }
}
