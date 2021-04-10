
var id = 100;


chrome.runtime.onInstalled.addListener(function() {
    chrome.browserAction.onClicked.addListener(function(tab) {
        alert('clicked')
        chrome.tabs.captureVisibleTab(function(screenshotUrl) {
            console.log(screenshotUrl)
            alert('Sent')
        });
    });
})
    