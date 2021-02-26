const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const mongoDbStore = require("connect-mongodb-session")(session);
const checkUser = require("./middlewares/check-user");
require("dotenv").config();
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/girls_in_ict";
const PORT = process.env.PORT || 3000;
const articleRoute = require("./routes/article.route");
const pagesRoute = require("./routes/smartgirls.route");
const authroute = require("./routes/auth.route");
const multer = require("multer");

const store = new mongoDbStore(
  {
    uri: MONGO_URI,
    collection: "session",
  },
  (err) => {
    if (err) console.log(err);
  }
);

const fileFilter = (req, file, cb) => {
  if (
    (file.mimetype === "image/jpg",
    file.mimetype === "image/jpeg",
    file.mimetype === "image/png")
  ) {
    return cb(null, true);
  }
  cb(null, false);
};
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.filename);
  },
});
//MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(
  multer({ fileFilter: fileFilter, storage: fileStorage }).single("image")
);
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Content-Type, X-Requested-With"
//   ); // res.setHeader('Access-Control-Allow-Credentials', true)
//   next();
// });
app.use(
  session({
    secret: "callback wizard",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(checkUser);
//ROUTES
app.use("/article", articleRoute);
app.use(pagesRoute);
app.use("/account", authroute);
app.use("/", (req, res, next) => {
  res.status(200).json({ message: "Welcome to Smartgirls in ICT" });
  next;
});

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err._message ? err._message : err.message;
  if (err != null) {
    res.status(status).json({ message: message });
  }
  console.log(err);
  next();
});

mongoose.connect(
  MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      console.error(error);
    }
    app.listen(PORT, () => {
      console.log(`Application Up and running on PORT: ${PORT}`);
    });
  }
);
