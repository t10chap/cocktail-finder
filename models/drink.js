const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let DrinkSchema = new Schema({
  name: String,
  location: Number,
  favoriteLiquor: String,
  favoriteDrink: String,
  savedDrinks: []
});

let Drink = mongoose.model("Drink", DrinkSchema);

module.exports = Drink;
