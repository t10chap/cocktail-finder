let db = require("./models");

let drinkList = [];

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
