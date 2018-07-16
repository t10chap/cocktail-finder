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
  image: String
});

let Drink = ("Drink", DrinkSchema);

module.exports = Drink;
