let db = require("../models");

// GET /api/users

const getUsers = (req, res) => {
  db.User.find()
    .populate("drink")
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
    .populate("savedDrinks", "strDrink")
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
  db.User.findOne({ username: req.body.username }, (err, foundUser) =>{
    if(err) {
      console.log(err);
      return err;

    } else if(foundUser){
      res.status(400);
    }
    //
    // let newUser = {
    //   name: req.body.name,
    //   username: req.body.username,
    //   password: req.body.password,
    //   location: req.body.location,
    //   favoriteLiquor: req.body.favoriteLiquor,
    //   favoriteDrink: req.body.favoriteDrink
    // };

    db.User.create(req.body, (err, createdUser) => {
      console.log(createdUser);
      if(err){
        console.log(err);
        return err;
      } else{
        res.json(createdUser);
      }
    });
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
      } res.json(user);
    }
  );
};

// PUT /api/user/:username/:drinkId

const updateSavedDrinks = (req, res) => {
  let username = req.params.username;
  let drinkId = req.params.drinkId;

  db.User.findOne({ username: username }, (err, user) => {
    db.Drink.findOne({ idDrink: drinkId }, (err, drink) => {
      if (drink) {
        console.log("Drink to add: ", drink);
        if (user.savedDrinks.indexOf(drink) > -1) {
        } else {
          user.savedDrinks.push(drink);
          user.save();
        }
      } else {
        let newDrink = new db.Drink(req.body);
        newDrink.save((err, drink) => {
          if (err) {
            console.log(err);
            return err;

          }
          console.log("Saved ", drink);
          res.json(drink);
          // user.savedDrinks.push(drink);
        });
        user.savedDrinks.push(newDrink);
        user.save();
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
