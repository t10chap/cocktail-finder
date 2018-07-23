let db = require("../models");

// GET /api/drinks

const getDrinks = (req, res) => {
  db.Drink.find({}, (err, drinks) => {
    if (err) {
      console.log(err);
      return err;
    }
    res.json(drinks);
  });
};

// GET /api/drinks/:id

const findOneDrink = (req, res) => {
  let id = req.params.id;
  console.log(id);
  db.Drink.findOne({ idDrink: id }, (err, foundDrink) => {
    if (err) {
      console.log(err);
      return err;
    }
    res.json(foundDrink);
  });
};

// POST /api/:user/newdrink
let id = 1;
const createADrink = (req, res) => {
  let username = req.params.user;
  console.log(req.body.name);
  db.Drink.findOne({ strDrink: req.body.name }, (err, foundDrink) => {
    if (err) {
      console.log(err);
      return err;
    }
    if (foundDrink) {
      console.log("not crashing!");
      res.sendStatus(400);
    } else {
      console.log("Response", req.body);
      let newDrink = new db.Drink({
        strDrink: req.body.name,
        idDrink: ++id,
        strVideo: null,
        strCategory: null,
        strIBA: null,
        strAlcoholic: null,
        strGlass: null,
        strInstructions: req.body.instructions,
        strDrinkThumb: undefined,
        strIngredient1: req.body.ingredient1,
        strIngredient2: req.body.ingredient2,
        strIngredient3: req.body.ingredient3,
        strIngredient4: req.body.ingredient4,
        strIngredient5: req.body.ingredient5,
        strIngredient6: req.body.ingredient6,
        strIngredient7: req.body.ingredient7,
        strIngredient8: req.body.ingredient8,
        strIngredient9: req.body.ingredient9,
        strIngredient10: req.body.ingredient10,
        strIngredient11: null,
        strIngredient12: null,
        strIngredient13: null,
        strIngredient14: null,
        strIngredient15: null,
        strMeasure1: req.body.measure1,
        strMeasure2: req.body.measure2,
        strMeasure3: req.body.measure3,
        strMeasure4: req.body.measure4,
        strMeasure5: req.body.measure5,
        strMeasure6: req.body.measure6,
        strMeasure7: req.body.measure7,
        strMeasure8: req.body.measure8,
        strMeasure9: req.body.measure9,
        strMeasure10: req.body.measure10
      });

      newDrink.save();
      console.log("finding the user");
      db.User.findOne({ username: username }, (err, user) => {
        if (err) {
          console.log(err);
          return err;
        }
        user.savedDrinks.push(newDrink);
        console.log("found the user", user);
        console.log(user.savedDrinks.length);
        user.save();
      });

      res.json(newDrink);
    }
  });
};

module.exports = {
  show: getDrinks,
  find: findOneDrink,
  create: createADrink
};
