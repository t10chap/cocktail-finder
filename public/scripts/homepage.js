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

  const displaySearch = response => {};

  const displayError = (err1, err2, err3) => {};

  $("input[type='submit']").on("click", function(e) {
    e.preventDefault();
    let url = "";
    let currentSearchSelection = $(".form-control").val();
    let userSearch = $("input[name='search']").val();
    if (currentSearchSelection == "name") {
      url = searchByNameUrl + userSearch;
    } else if (currentSearchSelection == "liquor") {
      url = searchByIngredientUrl + userSearch;
    } else if (currentSearchSelection == "random") {
      url = randomSearchUrl;
    }

    $.ajax({
      method: "GET",
      url: url,
      success: displaySearch,
      error: displayError
    });
  });
});
