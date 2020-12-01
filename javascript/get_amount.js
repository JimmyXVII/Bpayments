const getBalances = (email, token) => {
  fetch(`https://b-payments.herokuapp.com/api/v1/coinbase/balance?email=${email}&token=${token}`)
    .then(response => response.json() )
    .then((data) => {
      console.log(data)
      const eur_balance = document.querySelector(".eur-balance");
      eur_balance.innerHTML= data.user.eur_balance.amount
      const eur_balance_currency = document.querySelector(".eur-balance-currency");
      eur_balance_currency.innerHTML = data.user.eur_balance.currency
      const btc_balance = document.querySelector(".btc-balance");
      btc_balance.innerHTML = data.user.btc_balance.amount
      const btc_balance_currency = document.querySelector(".btc-balance-currency");
      btc_balance_currency.innerHTML = data.user.btc_balance.currency
    });
};
chrome.storage.local.get(["email","token"], (value) => {
  const email = value.email;
  const token = value.token;
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
