const getBalances = (email, token) => {
  fetch(`https://b-payments.herokuapp.com/api/v1/coinbase/balance?email=${email}&token=${token}`)
    .then(response => response.json() )
    .then((data) => {
      console.log(data)
      const eur_balance = document.querySelector(".eur-balance");
      eur_balance.innerHTML= Math.round(data.user.eur_balance.amount);
      const btc_balance = document.querySelector(".btc-balance");
      btc_balance.innerHTML = ( Math.round(data.user.btc_balance.amount * 10000) / 10000 );
    });
};

chrome.storage.local.get(["email","token","webprice"], (value) => {
  const email = value.email;
  const token = value.token;
  const regex_price = /[^€]+/
  webprice = regex_price.exec(value.webprice)[0];
  console.log(webprice);
  document.querySelector("#amount").value = parseFloat(webprice.replace(",", ".")).toFixed(2);
  console.log(email);
  console.log(token);
  getBalances(email, token)
})


const submit = document.querySelector("#submit_button")
submit.addEventListener('click', event => {
  const price = parseInt(document.querySelector("#amount").value,10);
  console.log(price);
  const eur_balance = parseInt(document.querySelector(".eur-balance").innerHTML, 10);
  console.log(eur_balance);
  const difference = (eur_balance - price);
  console.log(difference);
  chrome.storage.local.set({'difference': difference, 'price': price}, function() {
    if (difference >= 0) {
      window.location.replace('../popups/transfer_only.html');
    } else {
      window.location.replace('../popups/sell_and_withdraw.html');
    }
  });
});
