// *********** Access username from local storage **********
var username = localStorage.getItem("username");
// ********** Render username **********
$("#username").html(username);

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

// ********** Sidebar logout button ************
$("#logout").on("click", function() {
  localStorage.clear();
});

// ********** Handle ajax errors ************
const error = (err1, err2, err3) => {
  console.log(err1);
  console.log(err2);
  console.log(err3);
};

// ********** Render user data ************
const renderUserData = response => {
  $("#name").html(`Name: ${response.name}`);
  $("#location").html(`Location: ${response.location}`);
  $("#favLiquor").html(`Favorite Liquor: ${response.favoriteLiquor}`);

  response.savedDrinks.forEach(drink => {
    $("#savedDrinksList").append(`
      <li "class="renderedDrink"><span id="${drink.idDrink}">${
      drink.strDrink
    }</span> - <a id="delete" href="#">Remove</a></li>
    `);
  });
};

$.ajax({
  method: "GET",
  url: "https://cocktailfinder.herokuapp.com/api/users/" + username,
  success: renderUserData,
  error: error
});

// ********** Listen for remove drink clicks ************
const removeSuccess = response => {
  console.log("Drink removed from user database");
};

$("#savedDrinksList").on("click", "#delete", function(e) {
  e.preventDefault();
  let drinkname = $(this)
    .prev()
    .text();
  $(this)
    .parent()
    .remove();

  $.ajax({
    method: "PUT",
    url: `https://cocktailfinder.herokuapp.com/api/user/remove/${username}/${drinkname}`,
    success: removeSuccess,
    error: error
  });
});

// ********** Render selected drink ************
const renderSelectedDrink = response => {
  let drink = response;
  let image =
    drink.strDrinkThumb === undefined
      ? `<p>No current image</p>`
      : `<img src="${drink.strDrinkThumb}">`;
  $("#selectedDrink").empty().append(`
   <h2>${drink.strDrink}</h2>
   ${image}
   <p>${drink.strInstructions}</p>
   <ul>
   </ul>
  `);
  let arrOfVals = Object.values(drink);
  for (let i = 10; i <= 23; i++) {
    if (
      arrOfVals[i] == "" ||
      arrOfVals[i] == null ||
      arrOfVals[i].length == 0
    ) {
    } else {
      $("#selectedDrink ul").append(
        `<li>${arrOfVals[i]} : ${arrOfVals[i + 15]}</li>`
      );
    }
  }
};

// *********** Create Drink and Render New Saved List Data *************

const addNewDrinkToSavedList = response => {
  $("#savedDrinksList").empty();
  response.savedDrinks.forEach(drink => {
    $("#savedDrinksList").append(`
      <li "class="renderedDrink">
      <span id="${drink.idDrink}">${
      drink.strDrink
    }</span> - <a id="delete" href="#">Remove</a>
      </li>`);
  });

  $("#idModal").modal("hide");
};

const createNewDrinkSuccess = () => {
  $.ajax({
    method: "GET",
    url: `https://cocktailfinder.herokuapp.com/api/users/${username}`,
    success: addNewDrinkToSavedList,
    error: error
  });
};

$("#savedDrinksList").on("click", "span", function() {
  let id = $(this).attr("id");
  $.ajax({
    method: "GET",
    url: "https://cocktailfinder.herokuapp.com/api/drinks/" + id,
    success: renderSelectedDrink,
    error: error
  });
});

$(".newDrinkForm").on("submit", function(e) {
  e.preventDefault();
  let newDrinkData = $(this).serialize();
  $.ajax({
    method: "POST",
    url: `https://cocktailfinder.herokuapp.com/api/${username}/newdrink`,
    data: newDrinkData,
    success: createNewDrinkSuccess,
    error: error
  });
});

// *********** Delete button *************
$("#delete").hover(
  function() {
    $(this).html("Delete my account!");
  },
  function() {
    $(this).html("Tired of drinking?");
  }
);

const deleteAccountSuccess = () => {
  localStorage.clear();
  window.location.href = "/";
};

$("#delete").on("click", function() {
  $.ajax({
    method: "DELETE",
    url: `https://cocktailfinder.herokuapp.com/api/users/${username}`,
    success: deleteAccountSuccess,
    error: error
  });
});
