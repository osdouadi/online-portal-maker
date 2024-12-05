require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const systemConfig = require("./config/system-config");
const dbConnect = require("./database/connection");


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use(cors());
app.options("*", cors());
app.use(cookieParser());
app.use(morgan("tiny"));
app.use("/public", express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  req.requestedTime = new Date().toISOString();
  next();
});

dbConnect();

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

const port = systemConfig.port || systemConfig.altPort;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
