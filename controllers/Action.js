const mongoose = require("mongoose");
const SuitModel = mongoose.model("Suit");
const logs = require("../helpers/logs");
const httpStatus = require("../helpers/httpStatus");

class Action {
  createSuit(req, res) {
    if (!req.body) {
      return res.status(httpStatus.NO_CONTENT).send();
    }
    const suit = { ...req.body };

    try {
      SuitModel.create(suit, (err, created) => {
        if (err) {
          logs(`Error: ..:: ${err.message} ::..`, "error");
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            error: err.message
          });
        }
        logs(`Created suit [${created._id}]`);
        res.status(httpStatus.CREATED).json(created);
      });
    } catch (e) {
      logs(`Error: ..:: ${e.message} ::..`, "error");
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        error: e.message
      });
    }
  }

  async getSuit(req, res) {
    if (!req.body) {
      return res.status(httpStatus.NO_CONTENT).send();
    }

    try {
      const data = await SuitModel.find().sort({ openDate: -1 });
      res.status(httpStatus.CREATED).json(data);
    } catch (e) {
      logs(`Error: ..:: ${e.message} ::..`, "error");
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        error: e.message
      });
    }
  }

  async updateSuit(req, res) {
    const newData = { ...req.body };
    try {
      SuitModel.findByIdAndUpdate(newData._id, newData, function(err, updated) {
        if (err) {
          logs(`Error: ..:: ${err} ::..`, "error");
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            error: err
          });
        }
        SuitModel.findById(updated._id, (err, suit) => {
          return res.json(suit);
        });
      });
    } catch (e) {
      logs(`Error: ..:: ${e.message} ::..`, "error");
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        error: e.message
      });
    }
  }

  uploadFiles = (req, res) => {
    res.json({
      message: "success",
      text: "File has been uploaded.",
      file: req.file
    });
  };
}
module.exports = new Action();
