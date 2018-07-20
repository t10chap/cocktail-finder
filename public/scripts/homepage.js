// $(document).ready(function() {

// *********** Access username from local storage **********
var username = localStorage.getItem("username");
// ********** Render username **********
$("#username").html(username);

// ********** User saved drinks **********
let savedDrinks = [];

// ********* Sidebar animation **********
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

// ********** Used for searching by name and random **********
const displayDrink = response => {
  let drinkArr = response.drinks;
  let drinkIndex = 0;
  let currentSearchSelection = $(".form-control").val();

  $(".results").empty()
    .append(`<i class="fa fa-arrow-left fa-2x back" aria-hidden="true"></i>
                <h3>Results</h3>
                <i class="fa fa-arrow-right fa-2x forward" aria-hidden="true">
                </i>
                <section class="rendered-results">
                </section>`);
  if (currentSearchSelection == "name") {
    render(drinkArr, drinkIndex, 2);
  } else if (currentSearchSelection == "random") {
    render(drinkArr, drinkIndex, 1);
  }

  //Add click listeners

  $("input[type='submit']").on("click", function(e) {
    e.preventDefault();
    drinkIndex = 0;
  });

  $("#results").on("click", ".back", function() {
    console.log("clicked");
    console.log(drinkIndex);
    if (drinkIndex == 0) {
      console.log("No previous results");
    } else {
      drinkIndex -= 2;
      render(drinkArr, drinkIndex, 2);
    }
  });

  $("#results").on("click", ".forward", function() {
    console.log("clicked");
    console.log(drinkIndex);
    drinkIndex += 2;
    render(drinkArr, drinkIndex, 2);
  });
};

// ********** Used for seaching by ingredient **********
const displayDrinksList = response => {
  let drinkArr = response.drinks;
  let drinkIndex = 0;
  let currentSearchSelection = $(".form-control").val();
  $(".results").empty()
    .append(`<i class="fa fa-arrow-left fa-2x listback" aria-hidden="true"></i>
                <h3>Results</h3>
                <i class="fa fa-arrow-right fa-2x listforward" aria-hidden="true">
                </i>
                <section class="rendered-results">
                </section>`);

  render(drinkArr, drinkIndex, 6);

  //Add click listeners

  $("input[type='submit']").on("click", function(e) {
    e.preventDefault();
    drinkIndex = 0;
  });

  $("#results").on("click", ".listback", function() {
    if (drinkIndex == 0) {
      console.log("clicked");
      console.log(drinkIndex);
      console.log("No previous results");
    } else {
      drinkIndex -= 6;
      console.log("clicked");
      console.log(drinkIndex);
      render(drinkArr, drinkIndex, 6);
    }
  });

  $("#results").on("click", ".listforward", function() {
    console.log("clicked");
    console.log(drinkIndex);
    drinkIndex += 6;
    render(drinkArr, drinkIndex, 6);
  });
};

// ********** Rendering drinks **********
const render = (arr, index, numberToAppend) => {
  $(".rendered-results").empty();
  for (let i = index; i < index + numberToAppend; i++) {
    $(".rendered-results").append(`
        <div class="data">
        <h6>${arr[i].strDrink}</h6>
        <img src="${arr[i].strDrinkThumb}">
        <p>${
          arr[i].strInstructions === undefined ? "" : arr[i].strInstructions
        }</p>

        <ul>
        </ul>
        <button id="save" data-value="${arr[i].strDrink}" 
        data-id="${arr[i].idDrink}">Save!</button>
        </div>
        `);

    console.log(arr[i].idDrink);
    let arrOfVals = Object.values(arr[i]);

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
  }
};

// ********** Handle errors **********
const displayError = (err1, err2, err3) => {
  console.log(err1);
  console.log(err2);
  console.log(err3);
};

// ********** Render saved drinks in sidebar **********
const renderSavedDrinks = array => {
  $(".saved-drinks").empty();
  savedDrinks.forEach(drink => {
    $(".saved-drinks").append(`<li>${drink}</li>`);
  });
};

// ********** Create database model **********
const createModel = response => {
  console.log("Attempting to create model");
  $.ajax({
    method: "PUT",
    url: `http://localhost:3000/api/user/${$("#username").text()}/${
      response.drinks[0].idDrink
    }`,
    data: response.drinks[0],
    success: function() {
      console.log("Created the model!");
    },
    error: displayError
  });
};

// ********** URL to search by ID **********
let searchByIdUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

// ********** Listen for save click **********
$("#results").on("click", "#save", function() {
  console.log("clicked save");
  savedDrinks.push($(this).data("value"));
  renderSavedDrinks(savedDrinks);

  $.ajax({
    method: "GET",
    url: searchByIdUrl + $(this).data("id"),
    success: createModel,
    error: displayError
  });
});

// ********** URLs to search by Name, Ingredient, Random **********
let searchByNameUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
let searchByIngredientUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
let randomSearchUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

// ********** Listen for search submit **********
$("input[type='submit']").on("click", function(e) {
  e.preventDefault();
  let url = "";
  let currentSearchSelection = $(".form-control").val();
  let userSearch = $("input[name='search']").val();

  if (currentSearchSelection == "name") {
    url = searchByNameUrl + userSearch;
    $.ajax({
      method: "GET",
      url: url,
      success: displayDrink,
      error: displayError
    });
  } else if (currentSearchSelection == "liquor") {
    url = searchByIngredientUrl + userSearch;
    $.ajax({
      method: "GET",
      url: url,
      success: displayDrinksList,
      error: displayError
    });
  } else if (currentSearchSelection == "random") {
    url = randomSearchUrl;
    $.ajax({
      method: "GET",
      url: url,
      success: displayDrink,
      error: displayError
    });
  }
});

// ********** Sidebar home button ************

// ********** Sidebar logout button ************
localStorage.clear();

// });
