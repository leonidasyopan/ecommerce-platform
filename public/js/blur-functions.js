function emailBlur() {
  var email = document.querySelector('#email');

  var span = document.querySelector('#error-email');
  if(email.value.length < 8) {
    span.innerHTML = "Please, use a valid email.";
    email.style.background = "#fff2f2";
  } else {
    span.innerHTML = "";
    email.style.background = "transparent";
  }

}

function usernameBlur() {
  var username = document.querySelector('#username');

  var span = document.querySelector('#error-username');
  if(username.value.length < 6) {
    span.innerHTML = "Usernames are at least 6 characters long.";
    username.style.background = "#fff2f2";
  } else {
    span.innerHTML = "";
    username.style.background = "transparent";
  }

}

function passwordBlur() {
  var password = document.querySelector('#password');

  var span = document.querySelector('#error-password');
  if(password.value.length < 6) {
    span.innerHTML = "Passwords are at least 6 characters long.";
    password.style.background = "#fff2f2";
  } else {
    span.innerHTML = "";
    password.style.background = "transparent";
  }
}

function productNameBlur() {
  // message
}

function productPriceBlur() {
  // message
}

function productDescriptionBlur() {

}

function productImageBlur() {

}

function productStockBlur() {

}