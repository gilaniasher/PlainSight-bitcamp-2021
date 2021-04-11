chrome.runtime.onInstalled.addListener(function() {
    chrome.browserAction.onClicked.addListener(function(tab) {
        chrome.tabs.captureVisibleTab(function(screenshotUrl) {

            console.log(tab)
            let messageSender = chrome.tabs.sendMessage

            /*setTimeout(()=>{
                messageSender(tab.id, {msg: "results", results: JSON.parse(data)}, function(response) {})
            }, 1000)*/

            
            fetch("https://us-central1-white-might-262617.cloudfunctions.net/open-bio", {
                method: 'POST',
                body: JSON.stringify({query:screenshotUrl.substr(23)}),
            })
            .then(response => response.json())
            .then(data => {
                chrome.tabs.sendMessage(tab.id, {msg: "results", results: data}, function(response) {})
            }) 

            chrome.tabs.sendMessage(tab.id, {msg: "animation"}, function(response) {});

        });
    });
})
    