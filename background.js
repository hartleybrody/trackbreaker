function callback(info){

    var request = {
        url: info.url.toLowerCase(),
        method: info.method,
    };

    var trackingDomains = [
        "//mailfoogae.appspot.com/t",           // streak
        "//app.getsignals.com/img.gif",         // signals (hubspot)
        "//app.yesware.com/t/",                 // yesware
    ];

    var cancelRequest = false;
    _.each(trackingDomains, function(domain){
        console.log("comparing " + domain + " with " + request.url);
        if (request.url.indexOf(domain) != -1){
            console.log("found a match");
            cancelRequest = true;
        }
    });
    return {"cancel": cancelRequest};
}

var filter = {
    "urls": [
        "*://*.appspot.com/*",
        "*://*.getsignals.com/*",
        "*://*.yesware.com/*",
    ]
};

// set the listener on the right webRequest event
chrome.webRequest.onBeforeRequest.addListener(callback, filter, ["blocking"]);