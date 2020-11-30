const getEurBalance = (email, token) => {
  fetch(`https://b-payments.herokuapp.com/api/v1/transactions/balance?email=${email}&token=${token}`)
    .then(response => response.json() )
    .then((data) => {
      console.log(data)
      const amount = document.querySelector(".eur-balance");
      amount.innerHTML= data.user.balance.amount
    });
};

chrome.storage.local.get(["email","token"], (value) => {
  const email = value.email;
  const token = value.token;
  console.log(email);
  console.log(token);
  getEurBalance(email, token)
})
