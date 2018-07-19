let db = require("../models");

// GET /api/drinks

const getDrinks = (req, res) => {
  db.Drink.find({}, (err, drinks) => {
    if (err) {
      return console.log(err);
    }
    res.json(drinks);
  });
};

// GET /api/drinks:id

const findOneDrink = (req, res) => {
  let id = req.params.id;
  db.Drink.findById({ _id: id }, (err, foundDrink) => {
    if (err) {
      return console.log(err);
    }
    res.json(foundDrink);
  });
};

// POST /api/newdrink

const createADrink = (req, res) => {
  console.log("Response", req.body);
  let newDrink = new db.Drink({
    strName: req.body.name,
    strInstructions: req.body.instructions,
    strInstructions: req.body.ingredient1,
    strIngredient2: req.body.ingredient2,
    strIngredient3: req.body.ingredient3,
    strIngredient4: req.body.ingredient4,
    strIngredient5: req.body.ingredient5,
    strIngredient6: req.body.ingredient6,
    strIngredient7: req.body.ingredient7,
    strIngredient8: req.body.ingredient8,
    strIngredient9: req.body.ingredient9,
    strIngredient10: req.body.ingredient10,
    strMeasure1: req.body.measure1,
    strMeasure2: req.body.measure2,
    strMeasure3: req.body.measure3,
    strMeasure4: req.body.measure4,
    strMeasure5: req.body.measure5,
    strMeasure6: req.body.measure6,
    strMeasure7: req.body.measure7,
    strMeasure8: req.body.measure8,
    strMeasure9: req.body.measure9,
    strMeasure10: req.body.measure10,
    strImage: req.body.image
  });

  //  save drink to database
  newDrink.save((err, drink) => {
    if (err) {
      console.log(err);
    }
    console.log("Saved ", drink);
    res.json(drink);
  });
};

module.exports = {
  show: getDrinks,
  find: findOneDrink,
  create: createADrink
};
