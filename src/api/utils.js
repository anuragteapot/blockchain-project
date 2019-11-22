/* eslint-disable no-useless-escape */
import md5 from "md5";
import { resolve } from "dns";

export default new (class utils {
  constructor() {
    this.regMobile = /^\d{10}$/;
    this.regName = /^[a-zA-Z ]*$/;
    this.regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.regDate = /^\d{4}[./-]\d{2}[./-]\d{2}$/;
  }
  randomChars(len = 6) {
    let text = "";
    const possible = "abcdefghjkmnpqrstuvwxyz0123456789";

    for (let i = 0; i < len; i += 1)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  getUidV4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0;
      var v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // Debounce Api
  debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this;
      var args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  /**
   *Description:	Simple method to handle an event
   *and fire off a function
   **/
  eventHandler(evt) {
    const file = evt.target.files[0];
    return new Promise((resolve, rejects) => {
      this.fileHash(file, md5, function(x) {
        resolve(x);
      });
    });
  }

  /**
   *Description:	Simple method to handle an event
   *and fire off a function
   **/
  fileHandler(file) {
    return new Promise((resolve, rejects) => {
      this.fileHash(file, md5, function(x) {
        resolve(x);
      });
    });
  }

  /**
   *Description: The actual function to calculate the hash
   *Arguments:
   *file:	a file from a file input load event
   *hasher:	hashing algorithm
   *callback:	function that does something with the hash
   **/
  fileHash(file, hasher, callback) {
    //Instantiate a reader
    var reader = new FileReader();

    //What to do when we gets data?
    reader.onload = function(e) {
      var hash = hasher(e.target.result);
      callback(hash);
    };

    reader.readAsBinaryString(file);
  }

  time_ago(previousDate) {
    var current = new Date();
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previousDate;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + " seconds ago";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + " minutes ago";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + " hours ago";
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + " days ago";
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + " months ago";
    } else {
      return Math.round(elapsed / msPerYear) + " years ago";
    }
  }
})();
