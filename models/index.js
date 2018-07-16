const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/cocktail-finder",
  { useNewUrlParser: true }
);

let Drink = require("./drink.js");
let User = require("./user.js");

module.exports = {
  User: User,
  Drink: Drink
};
