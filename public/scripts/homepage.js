$(document).ready(function() {
  $("#sidebarCollapse").on("click", function() {
    $("#sidebar").toggleClass("active");
  });
});

function openNav() {
  document.getElementById("hamburgerNav").style.width = "250px";
  document.getElementById("page").style.marginRight = "250px";
}

function closeNav() {
  document.getElementById("hamburgerNav").style.width = "0";
  document.getElementById("page").style.marginRight = "0";
}
