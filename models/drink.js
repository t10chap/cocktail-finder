const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let DrinkSchema = new Schema({
  name: String,
  instructions: String,
  ingredient1: String,
  ingredient2: String,
  ingredient3: String,
  ingredient4: String,
  ingredient5: String,
  ingredient6: String,
  ingredient7: String,
  ingredient8: String,
  ingredient9: String,
  ingredient10: String,
  ingredient11: String,
  ingredient12: String,
  ingredient13: String,
  ingredient14: String,
  ingredient15: String,
  measure1: String,
  measure2: String,
  measure3: String,
  measure4: String,
  measure5: String,
  measure6: String,
  measure7: String,
  measure8: String,
  measure9: String,
  measure10: String,
  measure11: String,
  measure12: String,
  measure13: String,
  measure14: String,
  measure15: String,
  image: String
});

let Drink = ("Drink", DrinkSchema);

module.exports = Drink;
