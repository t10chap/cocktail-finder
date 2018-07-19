let db = require("./models");

let drinkList = [];

let userList = [
  {
    name: Test,
    location: 92110,
    favoriteLiquor: Tequila,
    favoriteDrink: Patron,
    savedDrinks: []
  }
];

db.Drink.remove({}, (err, drinks) => {
  db.Drink.create(drinkList, (err, drinks) => {
    if (err) {
      return console.log("ERROR", err);
    }
    console.log("All drinks: ", drinks);
    console.log("Created ", drinks.length, " drinks");
    process.exit();
  });
});

db.User.remove({}, (err, users) => {
  db.Drink.create(userList, (err, users) => {
    if (err) {
      return console.log("ERROR", err);
    }
    console.log("All users: ", users);
    console.log("Created ", users.length, " users");
    process.exit();
  });
});
