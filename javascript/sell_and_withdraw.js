chrome.storage.local.get("price", (value) => {
  const price = document.getElementById("price")
  price.innerHTML = value.price;
})

const sell = (difference, token, price) => {
  fetch("https://b-payments.herokuapp.com/api/v1/coinbase/sell", {
    method: "POST",
    headers: {
    "Content-Type": "application/json"
    },
    body: JSON.stringify({  "difference": `${difference}`, "token": `${token}` })
  })
    .then(response => response.json())
    .then((data) => {
      setTimeout(() => {
        if (data.response.status === "success") {
        console.log(JSON.stringify({ "token": `${token}`, "price": `${price}` }))
        fetch("https://b-payments.herokuapp.com/api/v1/coinbase/withdraw", {
          method: "POST",
          headers: {
          "Content-Type": "application/json"
          },
          body: JSON.stringify({ "token": `${token}`, "price": `${price}` })
        })
          .then(response => response.json())
          .then((data) => {
            console.log(data)
            window.location.replace('../popups/transfer_done.html');
          })
        } else {
      }
      }, 5000);
  });
};

const submit = document.querySelector("#sell");
submit.addEventListener('click', (event) => {
  chrome.storage.local.get(["difference", "token", "price"], (value) => {
    const difference = (value.difference * -1 );
    console.log(difference);
    const token = value.token;
    const price = value.price;
    console.log(price);
    sell(difference, token, price);
  });
});


