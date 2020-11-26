const signup = document.querySelector("a")
signup.addEventListener("click", (event) => {
  window.open('https://b-payments.herokuapp.com/users/sign_up', '_blank'); // this is the where we will need to call the api from our app
});
