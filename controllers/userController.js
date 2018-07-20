let db = require("../models");

// GET /api/users

const getUsers = (req, res) => {
  db.User.find()
    .populate("savedDrinks", "strDrink idDrink")
    .exec((err, users) => {
      if (err) {
        console.log(err);
        return err;
      }
      res.json(users);
    });
};

// GET /api/users/:username

const findOneUser = (req, res) => {
  db.User.findOne({ username: req.params.username })
    .populate("savedDrinks", "strDrink idDrink")
    .exec((err, foundUser) => {
      if (err) {
        console.log(err);
        return err;
      }
      res.json(foundUser);
    });
};

// POST /api/newuser

const createANewUser = (req, res) => {
  db.User.findOne({ username: req.body.signUpUsername }, (err, foundUser) => {
    if (err) {
      console.log(err);
      return err;
    }
    if (foundUser) {
      console.log("not crashing!");
      res.sendStatus(400);
    } else {
      let newUser = {
        name: req.body.name,
        username: req.body.signUpUsername,
        password: req.body.signUpPassword,
        location: req.body.location,
        favoriteLiquor: req.body.favLiquor,
        favoriteDrink: req.body.favDrink
      };

      db.User.create(newUser, (err, createdUser) => {
        console.log(createdUser);
        if (err) {
          console.log(err);
          return err;
        } else {
          res.json(createdUser);
        }
      });
    }
  });
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
        console.log(err);
        return err;
      }
      res.json(user);
    }
  );
};

// PUT /api/user/add/:username/:drinkId

const addADrink = (req, res) => {
  let username = req.params.username;
  let drinkId = req.params.drinkId;

  db.User.findOne({ username: username }, (err, user) => {
    db.Drink.findOne({ idDrink: drinkId }, (err, drink) => {
      if (drink) {
        console.log("Drink to add: ", drink);
        if (user.savedDrinks.indexOf(drink) > -1) {
          //for loop here
          console.log("Drink already saved");
        } else {
          user.savedDrinks.push(drink);
          user.save();
        }
      } else {
        console.log("Creating a new drink");
        let newDrink = new db.Drink(req.body);
        newDrink.save((err, drink) => {
          if (err) {
            console.log(err);
            return err;
          }
          console.log("Saved ", drink);
          res.json(drink);
        });
        user.savedDrinks.push(newDrink);
        user.save();
      }
    });
  });
};

// PUT /api/user/remove/:username/:drinkId

const remove = (drinkToRemove, arr) => {
  let i = arr.indexOf(drinkToRemove);
  if (i >= 0) {
    arr.splice(i, 1);
  }
  return arr;
};

const removeADrink = (req, res) => {
  let username = req.params.username;
  let drinkId = req.params.drinkId;
  db.User.findOne({ username: username }, (err, user) => {
    db.Drink.findOne({ idDrink: drinkId }, (err, drinkToRemove) => {
      if (drinkToRemove) {
        console.log("Drink to remove: ", drink);
        remove(drinkToRemove, user.savedDrinks);
        user.save();
        res.status(200);
      }
    });
  });
};

// DELETE /api/users/:username

const deleteAccount = (req, res) => {
  let username = req.params.username;
  db.User.findOneAndRemove({username: username}, (err, removedUser) => {
    if(err){
      console.log(err);
      return err;
    }
    res.json(removedUser);
  })
}

module.exports = {
  show: getUsers,
  find: findOneUser,
  create: createANewUser,
  updateProfile: updateProfile,
  addDrinks: addADrink,
  removeDrinks: removeADrink,
  removeProfile: deleteAccount,
};
