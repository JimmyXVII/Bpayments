
const payment = (difference, token, price) => {
  fetch("https://b-payments.herokuapp.com/api/v1/coinbase/sell", {
    method: "POST",
    headers: {
    "Content-Type": "application/json"
    },
    body: JSON.stringify({  "difference": `${difference}`, "token": `${token}` })
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data.response.status)
      console.log(data.response.message)
      if (data.response.status == "success") {
     const message = document.querySelector(".message");
     message.innerHTML = data.response.message;
        fetch("https://b-payments.herokuapp.com/api/v1/coinbase/withdraw", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({"token": `${token}`, "price": `${price}`})
        })
          .then(response => response.json())
          .then(data => {
            sleep(2000);
            const message = document.querySelector(".message");
            message.innerHTML = data.response.message;
          })
      }
      else {
        message = document.querySelector(".message");
        message.innerHTML = data.response.message;
      }
    });
};


const submit = document.querySelector("#sell");
submit.addEventListener('click', (event) => {
  chrome.storage.local.get(["difference", "token", "price"], (value) => {
    const difference = (value.difference * -1 );
    console.log(difference);
    const token = value.token;
    console.log(token);
    const price = value.price
    console.log(price)
    payment(difference, token, price)
  });
});


