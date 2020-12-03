
setTimeout(() => {
  const steps1 = document.querySelector(".one")
  steps1.insertAdjacentHTML('beforeend', '<i class="fab fa-btc pr-2"></i><p>sold</p> <div class="little-circle-card"> <svg class="little-circle"> <circle cx="40" cy="40" r="20"  fill="none" width="100%" height="100%"/> </svg> <p>1</p> </div>');
}, 2000);
setTimeout(() => {
  const steps2 = document.querySelector(".two")
  steps2.insertAdjacentHTML('beforeend', '<i class="fas fa-euro-sign pr-2"></i><p>transfered</p> <div class="little-circle-card"> <svg class="little-circle"> <circle cx="40" cy="40" r="20"  fill="none" width="100%" height="100%"/> </svg> <p>2</p></div>')
}, 4000);
setTimeout(() => {
  const steps3 = document.querySelector(".three")
  steps3.insertAdjacentHTML('beforeend', '<p>Ready to pay with <i class="fab fa-paypal"></i></p> <div class="little-circle-card"> <svg class="little-circle"> <circle cx="40" cy="40" r="20"  fill="none" width="100%" height="100%"/> </svg> <p>3</p> </div>')
}, 6000);

chrome.storage.local.get(["price", "bitcoinPrice"], (value) => {
  const price = document.getElementById("price");
  setTimeout(() => {price.innerHTML = value.price}, 4000);
  const bitcoinPrice = document.getElementById("bitcoin-sold");
  setTimeout(() => {bitcoinPrice.innerHTML = value.bitcoinPrice}, 2000);
  console.log(value.price);
  console.log(value.bitcoinPrice);
})

setTimeout(() => {
  const loader = document.getElementById("loader-2")
  loader.innerHTML = '<button id="submit_button" class="black-btn">Pay with paypal</button>'
}, 7000)
