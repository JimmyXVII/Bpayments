const button = document.querySelector("#submit_button")
button.addEventListener("click", (event) => {
  window.open('https://b-payments.herokuapp.com/', '_blank'); // this is the where we will need to call the api from our app
});
