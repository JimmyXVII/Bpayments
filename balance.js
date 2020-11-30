const getEurBalance = (email, token) => {
  fetch("https://b-payments.herokuapp.com/api/v1/transactions/balance", {
    method: "GET",
    headers: {
    "Content-Type": "application/json"
    },
    body: JSON.stringify({ "email": `${email}`, "token": `${token}` })
  })
    .then(response => response.json() )
    .then((data) => {
      console.log(data)
    });
};

chrome.storage.local.get(["email","token"], (value) => { 
  console.log(value)
})

// getEurBalance(email, token)