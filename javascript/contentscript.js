// Get the domain name
const url = location.hostname
chrome.storage.local.set({'url': url}, () => {
});
// Get the cart price
setTimeout(() => {
  const price = document.getElementById('BasketAmount').innerText
  chrome.storage.local.set({'webprice': price}, () => {
    console.log(price)
  });
}, 2000);
