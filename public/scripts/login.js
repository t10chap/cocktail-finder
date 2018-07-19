let url = "/api/";

$(document).ready(function() {
  $(".mainBtn").click(function() {
    $(".formContainer").fadeIn(900);
  });

  const succesfulLogin = response => {
    if (response) {
      let user = response.username;
      let pass = response.password;
      if (username === user && password === pass) {
        window.location.href = "/homepage";
      }
    } else {
      $("#errLbl").html("incorrect input");
    }
  };

  const errHandle = (err1, err2, err3) => {
    console.log(err1);
    console.log(err2);
    console.log(err3);
  };

  // Sign in
  $(".signin").click(function() {
    let username = $("#inputUser").val();
    let password = $("#inputPassword").val();

    if (username && password) {
      $.ajax({
        method: "GET",
        url: url + "users/" + username,
        success: succesfulLogin,
        error: errHandle
      });
    }
  });

  // Sign up
  $(".signup").click(function() {
    let name = $("input[name='name']").val();
    let username = $("input[name='username']").val();
    let password = $("input[name='password']").val();
    let location = $("input[name='location']").val();
    let favLiqour = $("input[name='favLiqior']").val();
    let favDrink = $("input[name='favDrink']").val();
  });
});
