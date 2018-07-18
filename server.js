// ************ SERVER JS ***********

// Set up express

const express = require("express");
const app = express();

// Set up body parser

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// CORS

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Allow express to use public files

app.use(express.static("public"));

let db = require("./models");
let controllers = require("./controllers");

// ******** ROUTES ***********

// HTML route

app.get("/", (req, res) => {
  res.sendFile("views/index.html", { root: __dirname });
});

app.get("/homepage", (req, res) => {
  res.sendFile("views/homepage.html", { root: __dirname });
});

app.get("/dashboard", (req, res) => {
  res.sendFile("views/dashboard.html", { root: __dirname });
});
// API Endpoints

app.get("/api/drinks/:id", controllers.drink.find);

app.post("/api/newuser", controllers.user.create);
app.post("/api/newdrink", controllers.drink.create);

app.put("/api/user/update/:id", controllers.user.updateProfile);
app.put("/api/user/:id/:drinkId", controllers.user.updateDrinks);

// ********** SERVER *********

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
