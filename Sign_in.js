// const signup = document.querySelector("a")
// signup.addEventListener("click", (event) => {
//   window.open('https://b-payments.herokuapp.com/users/sign_up', '_blank'); // this is the where we will need to call the api from our app
// });

// const email = document.querySelector("#exampleInputEmail1");
// console.log(email)
// const password = document.querySelector("#exampleInputPassword1");
// console.log(JSON.stringify({ "user": { "email": `${email.value}`, "password": `${password.value}` } }));
//console.log(email.value)
const verifyUser = (email, password) => {
  fetch("https://b-payments.herokuapp.com/api/v1/users/sessions", {
    method: "POST",
    headers: {
    "Content-Type": "application/json"
    },
    body: JSON.stringify({ "user": { "email": `${email}`, "password": `${password}` } })
  })
    .then(response => response.json())
    .then((data) => {
      if (res.status ==! 200) {
        // window.location.replace('./Bpayments_signin_popup.html');
        console.log("not ok");
      } else {
        chrome.storage.local.set({email: data.user.email, token: data.user.token}, function() {
        console.log("ok");
          });
        }
      });
};
console.log("hello")
const form = document.querySelector(".form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = event.currentTarget.querySelector("#exampleInputEmail1").value;
  const password = event.currentTarget.querySelector("#exampleInputPassword1").value;
  verifyUser(email,password)
}); // this is the where we will need to call the api from our app
