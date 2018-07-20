let url = "/api/";

// $(document).ready(function() {
$(".mainBtn").click(function() {
  $(".formContainer").fadeToggle(900);
});

const succesfulLogin = response => {
  let username = $("#inputUser").val();
  let password = $("#inputPassword").val();
  if (response) {
    let user = response.username;
    let pass = response.password;
    if (username === user && password === pass) {
      localStorage.setItem("username", user);
      window.location.href = "/homepage";
    }
  } else {
    $("#inErrLbl").html("Invalid Username/Password");
  }
};

const createAccount = response => {
  let user = response.username;
  localStorage.setItem("username", user);
  window.location.href = "/homepage";
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
  $("#signUpForm").on("submit", function(e){
    e.preventDefault();
    let signUpData = $(this).serialize();
    console.log(signUpData);
    let password = $("input[name='signUpPassword']").val();
    let passConfirm = $("input[name='confirmPassword']").val();
    if(password === passConfirm){
      $.ajax({
        method: "POST",
        url: "/api/newuser",
        data: signUpData,
        success: createAccount,
        error: errHandle,
      })
    }
    else{
      $("#upErrLbl").html("Passwords don't match")
    }
  });
