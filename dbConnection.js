const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const signUpRoute = require("./routes/signUpRoute");
// const reportingRoute = require("./routes/reportingRoute")
const historialTraslados = require("./routes/historialTrasladosRoute");
const routesUnidades = require("./routes/unidades");
const transferRoutes = require("./routes/transferRoutes");
const usersRouter = require("./routes/users");
const assetsRouter = require("./routes/assetsRoutes");

mongoose
  .connect(
    "mongodb+srv://elucas:OloTgqAUFVWJoNH3@cluster0.nlm2yvy.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Database Connected"))
  .catch((error) => {
    console.error("fail connecting to database", error);
  });

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cors({}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  response.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.get("/", (request, response) => {
  response.send("Hello, world!");
});

app.use(signUpRoute);
// app.use(reportingRoute);
app.use(historialTraslados);
app.use(usersRouter);
app.use(routesUnidades);
app.use(transferRoutes);
app.use(assetsRouter);

app.listen(PORT, () => {
  console.log(`Using the port ${PORT}`);
});

// Routes
