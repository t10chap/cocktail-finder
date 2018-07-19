let url = "/api/";

$(document).ready(function() {
  $(".mainBtn").click(function() {
    $(".formContainer").fadeIn(900);
  });

  // Sign in
  $(".signin").click(function() {
    let username = $("#inputUser").val();
    let password = $("#inputPassword").val();

    if (username && password) {
      $.ajax({
        method: "GET",
        url: url + "users/" + username,

        success: response => {
          //console.log(response);
          if (response) {
            let user = response.username;
            let pass = response.password;
            if (username === user && password === pass) {
              window.location.href = "/homepage";
            }
          } else {
            $("#errLbl").html("incorrect input");
          }
        }
      });
    }
  });

  // $(".signup").click(function(){
  //   let username =
  // })
});

// Sign up
