const button = document.querySelector("#submit_button")
button.addEventListener("click", (event) => {
  window.open('https://b-payments.herokuapp.com/', '_blank'); // this is the where we will need to call the api from our app
});


const container = document.getElementById("container");
const sign_up = document.getElementById("Sign_Up");
sign_up.addEventListener("click", (event) => {
  container.innerHTML = "<button class ='btn btn-primary'> <img src='./images/paypal-logo-white.png' id='logo'>Sign up with Paypal</button> <button class ='btn btn-primary'><img src='./images/logo-coinbase-white.png' id='logo-coinbase'>Connect with Coinbase</button>  <p>Already sign up ?  <a href='./Bpayments_popup.html' id='sign_in' class='mt-1'>Sign in</a></p>"
});
