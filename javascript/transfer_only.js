const transfer = (token, price) => {
  fetch("https://b-payments.herokuapp.com/api/v1/coinbase/withdraw", {
          method: "POST",
          headers: {
          "Content-Type": "application/json"
          },
          body: JSON.stringify({ "token": `${token}`, "price": `${price}` })
        })
          .then(response => response.json())
          .then((data) => {
            console.log(data);
            window.location.replace('../popups/transfer_done.html');
          })
};

const submit = document.querySelector("#transfer");
submit.addEventListener('click', (event) => {
  chrome.storage.local.get( ["token","price"], (value) => {
    const token = value.token;
    const price = value.price;
    console.log(price);
    transfer(token, price);
  });
});
