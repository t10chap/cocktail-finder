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
  window.location.href = "/";
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
  url: "api/users/" + username,
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
  console.log(drinkname);
  $(this)
    .parent()
    .remove();

  $.ajax({
    method: "PUT",
    url: `api/user/remove/${username}/${drinkname}`,
    success: removeSuccess,
    error: error
  });
});
