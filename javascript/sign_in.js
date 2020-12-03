const verifyUser = (email, password) => {
  fetch("https://b-payments.herokuapp.com/api/v1/users/sessions", {
  //fetch("http://localhost:3000/api/v1/users/sessions", {
    method: "POST",
    headers: {
    "Content-Type": "application/json"
    },
    body: JSON.stringify({ "user": { "email": `${email}`, "password": `${password}` } })
  })
    .then(response => {
      const status = response.status;
      const data = response.json();
      return {status: status, body: data}
    })
    .then((data) => {
      console.log(data)
      if (data.status === 200) {
        data.body.then((body) => {
          console.log(body)
          chrome.storage.local.set({'email': body.user.email,'token': body.user.token}, function() {
            window.location.replace('../popups/get_amount.html');
          });
        });
      } else {
        const container = document.querySelector(".container")
        container.insertAdjacentHTML('afterbegin', '<div class="alert alert-danger" role="alert"> Incorrect email or password!</div>')
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
});

// curl -i -X GET                                        \
//        -d '{ { "email": "mondaytest@gmail.com", "token": "" } }'    \
//        http://localhost:3000/api/v1/transactions/balance
