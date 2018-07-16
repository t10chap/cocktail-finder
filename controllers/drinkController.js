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

// const create = (req, res) => {
//   let name = req.body.name;
//   let instructions = req.body.instructions;
//   let ingredient
// };
