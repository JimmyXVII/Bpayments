

// 1) récupération des balances du user via API
const getBalances = (email, token) => {
  fetch(`https://b-payments.herokuapp.com/api/v1/coinbase/balance?email=${email}&token=${token}`)
  //fetch(`http://localhost:3000/api/v1/coinbase/balance?email=${email}&token=${token}`)
    .then(response => response.json() )
    .then((data) => {
      const btc_balance = document.querySelector(".btc-balance");
      btc_balance.innerHTML = ( Math.round(data.user.btc_balance.BTC * 10000) / 10000 );
      const btc_in_eur_balance = document.querySelector(".btc-in-eur-balance");
      btc_in_eur_balance.innerHTML = data.user.btc_balance.EUR;
      const svgs = document.querySelectorAll('svg');
      const circles = document.querySelectorAll('circle');
      svgs.forEach((svg) => {
        svg.classList.add("circle-shape");
      });
      circles.forEach((circle) => {
        circle.classList.add("white-circle");
        circle.classList.add("white-circle-starts");
        setTimeout(() => {
          circle.classList.add("white-circle-ends");
        }, 1000);
      });
      const btc_sign = document.getElementById("btc-span");
      btc_sign.innerHTML = '<i class="fab fa-btc"></i>';
      const euro_sign = document.getElementById("euro-span");
      euro_sign.innerHTML = '<i class="fas fa-euro-sign"></i>';
    });
};


// 2) récupération du rate via API et set dans le local
fetch("https://api.coinbase.com/v2/prices/BTC-EUR/sell")
.then(response => response.json() )
.then((data) => {
  console.log(data);
  chrome.storage.local.set( { 'rate': parseFloat(data.data.amount) }, () => {
    console.log("coucou");
  })
});

// 3) Fonction de conversion du prix en euro -> bitcoin
const convert = (price) => {
  chrome.storage.local.get(['rate'], (value) => {
    const rate = value.rate;
    console.log(rate);
    const bitcoinPrice = price / rate;
    chrome.storage.local.set( {'bitcoinPrice': bitcoinPrice },() => {});
    console.log(bitcoinPrice);
    const convert = document.querySelector(".price-in-btc-balance");
    convert.innerHTML = (bitcoinPrice).toFixed(5);
  });
};

// 3) appel de la fonction convert pour prix en euro -> bitcoin et  appel de la fonction get balances pour display les balances
chrome.storage.local.get(["email","token","webprice"], (value) => {
  const email = value.email;
  const token = value.token;
  const regexPrice = /[^€]+/;
  const stringWebPrice = regexPrice.exec(value.webprice)[0];
  const integerWebPrice = parseFloat(stringWebPrice.replace(",", ".")).toFixed(2);
  console.log(integerWebPrice);
  convert(integerWebPrice);
  document.querySelector("#amount").value = integerWebPrice;
  getBalances(email, token);
})
const input = document.querySelector("#amount");
input.addEventListener("keyup", (event) => {
  const inputPrice = document.querySelector("#amount").value;
  convert(inputPrice);
})


// fonction sell qui récupere le prix pour faire la vente des bitcoins et envoyer l'url à l'app avant de retirer les fonds en euro du compote coinbase vers paypal
const sell = (token, price, url) => {
  fetch("https://b-payments.herokuapp.com/api/v1/coinbase/sell", {
  //fetch("http://localhost:3000/api/v1/coinbase/sell", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "difference": `${price}`,
      "token": `${token}`,
      "url": `${url}`
    })
  })
    .then(response => response.json())
    .then((data) => {
      setTimeout(() => {
        if (data.response.status === "success") {
          fetch("https://b-payments.herokuapp.com/api/v1/coinbase/withdraw", {
          //fetch("http://localhost:3000/api/v1/coinbase/withdraw", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "token": token, "price": price })
          })
          .then(response => response.json())
          .then((data) => {
            chrome.storage.local.set( {'price': price },() => {});
            window.location.replace('../popups/payment.html');
          })
        } else {
        }
      }, 5000);
    });
};

// bouton submit qui est censé demarrer la fonction sell
const submit = document.querySelector("#submit_button");
submit.addEventListener('click', (event) => {
  chrome.storage.local.get(["token", "url"], (value) => {
    const token = value.token;
    console.log(token);
    const price = parseFloat(document.querySelector("#amount").value);
    console.log(price);
    const url = value.url;
    sell(token, price, url);
  });
});


