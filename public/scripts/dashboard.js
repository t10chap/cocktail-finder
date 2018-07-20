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
