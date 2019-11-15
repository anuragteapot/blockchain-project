class Action {
  uploadFiles = (req, res) => {
    res.json({
      message: "success",
      text: "File has been uploaded.",
      file: req.file
    });
  };

  getSuits(req, res, next) {
    res.json({
      a: "Anurag Action"
    });
    next();
  }
}
module.exports = new Action();
