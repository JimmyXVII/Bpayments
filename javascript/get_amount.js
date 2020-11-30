const getEurBalance = (email, token) => {
  fetch(`https://b-payments.herokuapp.com/api/v1/transactions/balance?email=${email}&token=${token}`)
    .then(response => response.json() )
    .then((data) => {
      console.log(data)
      const eur_balance = document.querySelector(".eur-balance");
      eur_balance.innerHTML= data.user.balance.amount
    });
};
chrome.storage.local.get(["email","token"], (value) => {
  const email = value.email;
  const token = value.token;
  console.log(email);
  console.log(token);
  getEurBalance(email, token)
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
      window.location.replace('../popups/sell_and_transfer.html');
    }
  });
});
