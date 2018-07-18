$(document).ready(function() {
  let sidebarShown = false;
  $("#sidebar-icon").click(function() {
    $(this).toggleClass("open");
    if (!sidebarShown) {
      $("#sidebar").toggleClass("active");
      setTimeout(function() {
        $("#sidebar ul").toggleClass("hide");
      }, 400);
      sidebarShown = true;
    } else {
      $("#sidebar ul").toggleClass("hide");
      setTimeout(function() {
        $("#sidebar").toggleClass("active");
      }, 200);
      sidebarShown = false;
    }
  });

  let searchByNameUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
  let searchByIngredientUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
  let searchByIdUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
  let randomSearchUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/random.php";

  const displaySearch = response => {
    var drinkArr = response.drinks;
    drinkIndex = 0;
    currentDrink = drinkArr[drinkIndex];
    $(".rendered-results").empty();
    response.drinks.forEach(drink => {
      $(".rendered-results").append(`
        <div class="data">
        <h6>${drink.strDrink}</h6>
        <img src="${drink.strDrinkThumb}">
        <p>${drink.strInstructions}</p>
        <ul>
        </ul>
        </div>
        `);
      console.log(drink.idDrink);

      let arrOfVals = Object.values(drink);

      for (let i = 9; i <= 23; i++) {
        if (
          arrOfVals[i] == "" ||
          arrOfVals[i] == null ||
          arrOfVals[i].length == 0
        ) {
        } else {
          $(".rendered-results ul").append(`
              <li>${arrOfVals[i]} : ${arrOfVals[i + 15]}</li>
              `);
        }
      }
    });
  };

  const displaySearchList = response => {
    let drinkArr = response.drinks,
     drinksIndex = 0,
     currentDrink = drinkArr[drinksIndex];
    $(".rendered-results").empty();
    response.drinks.forEach(drink => {
      while(drinksIndex < 6){
      $(".rendered-results").append(`
        <div class="data">
        <h6>${drink.strDrink}</h6>
        <img src="${drink.strDrinkThumb}">
        <ul>
        </ul>
        </div>
        `);
        drinksIndex++;
      }
  })
};

  const displayError = (err1, err2, err3) => {
    console.log(err1);
    console.log(err2);
    console.log(err3);
  };

  $("input[type='submit']").on("click", function(e) {
    e.preventDefault();
    let url = "";
    let currentSearchSelection = $(".form-control").val();
    let userSearch = $("input[name='search']").val();

    let displayResults = $.ajax({
      method: "GET",
      url: url,
      success: displaySearch,
      error: displayError
    });

    let displayResultsList = $.ajax({
      method: "GET",
      url: url,
      success: displaySearchList,
      error: displayError
    });

    if (currentSearchSelection == "name") {
      url = searchByNameUrl + userSearch;
      displayResults;
    } else if (currentSearchSelection == "liquor") {
      url = searchByIngredientUrl + userSearch;
      displayResultsList;
    } else if (currentSearchSelection == "random") {
      url = randomSearchUrl;
      displayResults;
    }
  });
});
