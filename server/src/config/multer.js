const multer = require("multer");
const fs = require("fs");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname == "avatar") {
      console.log("i m here");
      cb(null, "src/public/avatar/");
    } else {
      let path = "src/public/datasets/" + req.body.type + "/" + req.body.name;
      fs.mkdirSync(path, { recursive: true });
      cb(null, path);
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var uploads = multer({
  storage: storage,
  fileFilter(req, file, cb) {
    var type = req.body.type;
    var avatar = file.fieldname;
    if (type == "images") {
      if ((file.mimetype !== "image/jpeg") & (file.mimetype !== "image/png")) {
        return cb(new Error("Please upload image in jpeg or png format"));
      }
      return cb(undefined, true);
    }

    if (type == "2d") {
      if (file.mimetype !== "text/csv") {
        return cb(new Error("Please upload a csv file"));
      }
      return cb(undefined, true);
    }

    if (type == "audio") {
      if (file.mimetype !== "audi/x-wav") {
        return cb(new Error("Please upload a .wav file "));
      }
      return cb(undefined, true);
    }

    if (avatar) {
      if ((file.mimetype !== "image/jpeg") & (file.mimetype !== "image/png")) {
        return cb(new Error("Please upload image in jpeg or png format"));
      }
      return cb(undefined, true);
    }
    return cb(new Error("something went wrong in multer"));
  },
});

module.exports = uploads;
