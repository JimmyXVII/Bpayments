

// récupération des balances du user
const getBalances = (email, token) => {
  fetch(`https://b-payments.herokuapp.com/api/v1/coinbase/balance?email=${email}&token=${token}`)
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

fetch("https://api.coinbase.com/v2/prices/BTC-EUR/sell")
.then(response => response.json() )
.then((data) => {
  console.log(data)
  chrome.storage.local.set( { 'rate': parseFloat(data.data.amount) }, () => {
    console.log("coucou");
  })
});

const convert = (price) => {
  chrome.storage.local.get(['rate'], (value) => {
    const rate = value.rate;
    console.log(rate)
    const bitcoinPrice = price / rate;
    console.log(bitcoinPrice);
    const convert = document.querySelector(".price-in-btc-balance");
    convert.innerHTML = (bitcoinPrice).toFixed(5);
  });
};


chrome.storage.local.get(["email","token","webprice"], (value) => {
  const email = value.email;
  const token = value.token;
  const regex_price = /[^€]+/
  const stringWebPrice = regex_price.exec(value.webprice)[0];
  const integerWebPrice = parseFloat(stringWebPrice.replace(",", ".")).toFixed(2);
  console.log(integerWebPrice);
  convert(integerWebPrice);
  document.querySelector("#amount").value = integerWebPrice;
  getBalances(email, token)
})


const submit = document.querySelector("#submit_button")
submit.addEventListener('click', event => {
  const price = parseFloat(document.querySelector("#amount").value);
  console.log(price)
  chrome.storage.local.set({'price': price}, function() {
    window.location.replace('../popups/sell_and_withdraw.html');
  });
});


