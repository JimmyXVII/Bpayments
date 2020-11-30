// 1. recup price
chrome.storage.local.get(["difference", "price"], (value) => {
  const difference = value.difference;
  console.log(difference);
})
