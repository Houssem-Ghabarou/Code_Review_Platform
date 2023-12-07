require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const http = require("http");
const passport = require("passport");
const { connectToMongoDB } = require("./services/mongodb");
const userRoutes = require("./routes/user-routes.js");

connectToMongoDB();

const app = express();
// middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

//routes
app.use("/api/user", userRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
//server
const server = http.createServer(app);

server.listen(process.env.PORT_SERVER || 3000, () => {
  console.log(`server listneing on port ${process.env.PORT_SERVER} `);
});
