const multer = require("multer");
const path = require("path");

const menuStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/menu"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const mainStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/main"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const menuUpload = multer({ storage: menuStorage });
const mainUpload = multer({ storage: mainStorage });

module.exports = { menuUpload, menuStorage };
