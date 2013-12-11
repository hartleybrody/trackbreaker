function callback(info){

    var request = {
        url: info.url.toLowerCase(),
        method: info.method,
    };

    var trackingUrls = [
        "//mailfoogae.appspot.com/t",           // streak
        "//app.getsignals.com/img.gif",         // signals (hubspot)
        "//app.yesware.com/t/",                 // yesware
    ];

    var cancelRequest = false;
    _.each(trackingUrls, function(url){
        if (request.url.indexOf(url) != -1){
            cancelRequest = true;
        }
    });
    return {"cancel": cancelRequest};
}

// only examine requests from known tracking domains
var trackingDomains = {
    "urls": [
        "*://*.appspot.com/*",
        "*://*.getsignals.com/*",
        "*://*.yesware.com/*",
    ]
};

// set the listener on the right webRequest event
chrome.webRequest.onBeforeRequest.addListener(callback, trackingDomains, ["blocking"]);