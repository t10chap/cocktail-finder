let db = require("../models");

// GET /api/users

const getUsers = (req, res) => {
  db.User.find()
    .populate("drink")
    .exec((err, users) => {
      if (err) {
        return console.log(err);
      }
      res.json(users);
    });
};

// GET /api/users/:username

const findOneUser = (req, res) => {
  let username = req.params.username;
  db.User.findOne({ username: username })
    .populate("drink")
    .exec((err, foundUser) => {
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
    favoriteDrink: favDrink,
    savedDrinks: []
  };
};

// PUT /api/user/update/:username

const updateProfile = (req, res) => {
  let username = req.params.username;
  let update = req.body;

  db.User.findOneAndUpdate(
    { username: username },
    update,
    { new: true },
    (err, user) => {
      if (err) {
        return console.log(err);
      }
      res.json(user);
    }
  );
};

// PUT /api/user/:username/:drinkname

const updateSavedDrinks = (req, res) => {
  let username = req.params.username;
  let drinkname = req.params.drinkName;

  db.User.findOne({ username: username }, (err, user) => {
    db.Drink.findOne({ name: drinkname }, (err, drink) => {
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
