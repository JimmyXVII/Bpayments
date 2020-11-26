chrome.runtime.onMessage.addListener(function(request) {
    if (request.type === 'request_payment') {
        chrome.tabs.create({
            url: chrome.extension.getURL('Bpayments_popup.html'),
            active: false
        });
    }
});
