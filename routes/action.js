const { Router } = require("express");
const ActionController = require("../controllers/Action");
const router = Router();
const auth = require("../middlewares/auth");
const multer = require("multer");
const fs = require("fs-extra");
const helper = require("./../helpers/helper-util");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.params.id;
    const dirPath = `uploads/${userId}`;

    fs.ensureDir("uploads", err => {
      console.log(err);
    });

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }

    const sectionPath = path.join(dirPath, helper.randomId());
    fs.mkdirSync(sectionPath);

    cb(null, sectionPath);
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  // if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
  cb(null, true);
  // } else {
  // cb(null, false);
  // }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024
  },
  fileFilter
});

router.post(
  "/upload/:id",
  auth,
  upload.single("files"),
  ActionController.uploadFiles
);

router.get("/", auth, ActionController.getSuits);

module.exports = router;
