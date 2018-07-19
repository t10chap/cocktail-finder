let db = require("../models");

// GET /api/users

const getUsers = (req, res) => {
  db.User.find({}, (err, users) => {
    if (err) {
      return console.log(err);
    }
    res.json(users);
  });
};

// GET /api/users/:id

const findOneUser = (req, res) => {
  let id = req.params.id;
  db.Drink.findById({ _id: id }, (err, foundUser) => {
    if (err) {
      return console.log(err);
    }
    res.json(foundUser);
  });
};

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

// PUT /api/user/update/:id

const updateProfile = (req, res) => {
  let id = req.params.id;
  let update = req.body;

  db.User.findOneAndUpdate({ _id: id }, update, { new: true }, (err, user) => {
    if (err) {
      return console.log(err);
    }
    res.json(user);
  });
};

// PUT /api/user/:id/:drinkid

const updateSavedDrinks = (req, res) => {
  let userId = req.params.id;
  let drinkId = req.params.drinkid;

  db.User.findById({ _id: id }, (err, user) => {
    db.Drink.findOne({ _id: drinkId }, (err, drink) => {
      if (drink) {
        console.log("Drink to add: ", drink);
        user.savedDrinks.push(drink);
      } else {
        let newDrink = new db.Drink(req.body);
        user.savedDrinks.push(newDrink);
        newDrink.save((err, drink) => {
          if (err) {
            console.log(err);
          }
          console.log("Saved ", drink);
          res.json(drink);
        });
      }
    });
  });
};

module.exports = {
  show: getUsers,
  find: findOneUser,
  create: createANewUser,
  updateProfile: updateProfile,
  updateDrinks: updateSavedDrinks
};
