const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: String,
  username: String,
  password: String,
  location: Number,
  favoriteLiquor: String,
  favoriteDrink: String,
  savedDrinks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Drink"
    }
  ]
});

let User = mongoose.model("User", UserSchema);

module.exports = User;
