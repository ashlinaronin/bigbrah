chrome.browserAction.onClicked.addListener(function(tab) {
    console.log(tab.url + ' clicked me');

    chrome.desktopCapture.chooseDesktopMedia(['screen'], function(streamId) {
        console.log(streamId);

        // then call GUM with streamId
    });

});

///An opaque string that can be passed to getUserMedia() API to generate media stream that corresponds
//to the source selected by the user. If user didn't select any source (i.e. canceled the prompt)
//then the callback is called with an empty streamId. The created streamId can be used only once and
// expires after a few seconds when it is not used.
