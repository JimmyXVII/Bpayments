const paymentDiv = document.querySelector('.totalPayment');

const price = paymentDiv.querySelector('.split-value').innerText;
chrome.storage.local.set({'webprice': price}, () => {
 console.log(price)
});
