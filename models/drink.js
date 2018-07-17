const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let DrinkSchema = new Schema({
  idDrink: STRING,
  strDrink: STRING,
  strVideo: STRING,
  strCategory: STRING,
  strIBA: STRING,
  strAlcoholic: STRING,
  strGlass: STRING,
  strInstructions: STRING,
  strDrinkThumb: STRING,
  strIngredient1: STRING,
  strIngredient2: STRING,
  strIngredient3: STRING,
  strIngredient4: STRING,
  strIngredient5: STRING,
  strIngredient6: STRING,
  strIngredient7: STRING,
  strIngredient8: STRING,
  strIngredient9: STRING,
  strIngredient10: STRING,
  strIngredient11: STRING,
  strIngredient12: STRING,
  strIngredient13: STRING,
  strIngredient14: STRING,
  strIngredient15: STRING,
  strMeasure1: STRING,
  strMeasure2: STRING,
  strMeasure3: STRING,
  strMeasure4: STRING,
  strMeasure5: STRING,
  strMeasure6: STRING,
  strMeasure7: STRING,
  strMeasure8: STRING,
  strMeasure9: STRING,
  strMeasure10: STRING,
  strMeasure11: STRING,
  strMeasure12: STRING,
  strMeasure13: STRING,
  strMeasure14: STRING,
  strMeasure15: STRING,
  dateModified: STRING
});

let Drink = ("Drink", DrinkSchema);

module.exports = Drink;
