setTimeout(() => {
  const price = document.querySelector(".cart-summary__total__price").innerText;
  chrome.storage.local.set({'webprice': price}, () => {
    console.log(price)
  });
}, 2000);