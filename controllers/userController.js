let db = require("../models");

// POST /api/newuser

const createANewUser = (req, res) => {
  let name = req.body.name;
  let location = req.body.location;
  let favLiquor = req.body.liquor;
  let favDrink = req.body.drink;

  db.User.create = {
    name: name,
    location: location,
    favoriteLiquor: favLiquor,
    favoriteDrink: favDrink
  };
};

// PUT /api/newuser/:id

const updateProfile = (req, res) => {
  let id = req.params.id;
  let update = req.body;

  db.findOneAndUpdate({ _id: id }, update, { new: true }, (err, user) => {
    if (err) {
      return console.log(err);
    }
    res.json(user);
  });
};

module.exports = {
  create: createANewUser,
  update: updateProfile
};
