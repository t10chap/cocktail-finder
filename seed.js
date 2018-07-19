let db = require("./models");

let drinkList = [
  {
    idDrink: 01,
    strDrink: "Gabe mixture",
    strVideo: null,
    strCategory: null,
    strIBA: null,
    strAlcoholic: null,
    strGlass: null,
    strInstructions: null,
    strDrinkThumb: null,
    strIngredient1: "Tequila",
    strIngredient2: "Vodka",
    strIngredient3: "Rum",
    strIngredient4: "Gin",
    strIngredient5: "Triple Sec",
    strIngredient6: "Peach Schnapps",
    strIngredient7: "Blue Curacao",
    strIngredient8: "",
    strIngredient9: null,
    strIngredient10: null,
    strIngredient11: null,
    strIngredient12: null,
    strIngredient13: null,
    strIngredient14: null,
    strIngredient15: null,
    strMeasure1: "1 Shot",
    strMeasure2: "1 Shot",
    strMeasure3: "1 Shot",
    strMeasure4: "1 Shot",
    strMeasure5: "1 Shot",
    strMeasure6: "1 Shot",
    strMeasure7: "A generous pour",
    strMeasure8: null,
    strMeasure9: null,
    strMeasure10: null,
    strMeasure11: null,
    strMeasure12: null,
    strMeasure13: null,
    strMeasure14: null,
    strMeasure15: null,
    dateModified: null
  }
];

let userList = [
  {
    name: "Test",
    username: "Abcd",
    password: "1234",
    location: 92110,
    favoriteLiquor: "Tequila",
    favoriteDrink: "Patron",
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
  });
});

db.User.remove({}, (err, users) => {
  db.User.create(userList, (err, users) => {
    if (err) {
      return console.log("ERROR", err);
    }
    console.log("All users: ", users);
    console.log("Created ", users.length, " users");
    process.exit();
  });
});
