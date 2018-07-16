const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: String,
  location: Number,
  favoriteLiquor: String,
  favoriteDrink: String,
  savedDrinks: []
});

let User = mongoose.model("User", UserSchema);

module.exports = User;
