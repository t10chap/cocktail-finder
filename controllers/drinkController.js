let db = require("../models");

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

// POST /api/drinks

const createADrink = (req, res) => {
  let name = req.body.name;
  let instructions = req.body.instructions;
  let ingredient1 = req.body.ingredient1;
  let ingredient2 = req.body.ingredient2;
  let ingredient3 = req.body.ingredient3;
  let ingredient4 = req.body.ingredient4;
  let ingredient5 = req.body.ingredient5;
  let ingredient6 = req.body.ingredient6;
  let ingredient7 = req.body.ingredient7;
  let ingredient8 = req.body.ingredient8;
  let ingredient9 = req.body.ingredient9;
  let ingredient10 = req.body.ingredient10;
  let measure1 = req.body.measure1;
  let measure2 = req.body.measure2;
  let measure3 = req.body.measure3;
  let measure4 = req.body.measure4;
  let measure5 = req.body.measure5;
  let measure6 = req.body.measure6;
  let measure7 = req.body.measure7;
  let measure8 = req.body.measure8;
  let measure9 = req.body.measure9;
  let measure10 = req.body.measure10;

  db.Drink.create({
    name: name,
    instructions: instructions,
    ingredient1: ingredient1,
    ingredient2: ingredient2,
    ingredient3: ingredient3,
    ingredient4: ingredient4,
    ingredient5: ingredient5,
    ingredient6: ingredient6,
    ingredient7: ingredient7,
    ingredient8: ingredient8,
    ingredient9: ingredient9,
    ingredient10: ingredient10,
    measure1: measure1,
    measure2: measure2,
    measure3: measure3,
    measure4: measure4,
    measure5: measure5,
    measure6: measure6,
    measure7: measure7,
    measure8: measure8,
    measure9: measure9,
    measure10: measure10
  });
};

module.exports = {
  find: findOneDrink,
  create: createADrink
};
