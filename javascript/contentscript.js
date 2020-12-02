// Get the domain name
const url = location.hostname
chrome.storage.local.set({'url': url}, () => {
});
// Get the cart price
setTimeout(() => {
  const price = document.querySelector(".cart-summary__total__price").innerText;
  chrome.storage.local.set({'webprice': price}, () => {
    console.log(price)
  });
}, 2000);