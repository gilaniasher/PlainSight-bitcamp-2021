chrome.runtime.onInstalled.addListener(function() {
    chrome.browserAction.onClicked.addListener(function(tab) {
        chrome.tabs.captureVisibleTab(function(screenshotUrl) {
            //fetch("https://us-central1-bitcamp-2021-310314.cloudfunctions.net/detect-face",{
            //    method: 'POST',
            //    body : screenshotUrl
            //})
            
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                //chrome.tabs.sendMessage(tabs[0].id, {msg: "animation"}, function(response) {});
                chrome.tabs.sendMessage(tabs[0].id, {msg: "results"}, function(response) {});
            });
        });
    });
})
    