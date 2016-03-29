var bigBro = {
    canvas: null,
    context: null,
    webcam: null,
    dataURL: null,
    blob: null
}
bigBro.canvas = document.querySelector('canvas#selfie-canvas');
bigBro.context = bigBro.canvas.getContext('2d');
bigBro.webcam = document.querySelector('video#webcam');


chrome.browserAction.onClicked.addListener(function(tab) {
    console.log(tab.url + ' clicked me');

    chrome.desktopCapture.chooseDesktopMedia(['screen'], function(streamId) {
        console.log(streamId);

        // then call GUM with streamId
        setupWebcam(streamId);
    });
});


function setupWebcam(streamId) {
    if (!streamId) {
        console.log('sorry no');
        return;
    }

    navigator.webkitGetUserMedia({
        audio: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: streamId
            }
        },
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: streamId,
                maxWidth: screen.width,
                maxHeight: screen.height
            }
        }
    }, gotStream, getUserMediaError);
}


function gotStream(stream) {
    console.log('received local stream', stream);
    takePic(stream);
}

function getUserMediaError(error) {
    console.log('navigator.webkitGetUserMedia() error: ', error);
}

function takePic(stream) {
    bigBro.context.drawImage(bigBro.webcam, 0, 0);
    bigBro.dataURL = bigBro.canvas.toDataURL('image/png');
    dataURIToBlob(bigBro.dataURL, 'image/png', downloadScreenshot);
}

function downloadScreenshot(blob) {
    var objUrl = URL.createObjectURL(blob);
    chrome.downloads.download({url: objUrl}, function(downloadId) {
        console.log("downloading, downloadId is:" + downloadId);
    });
}



// from https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob
var dataURIToBlob = function(dataURI, mimetype, cb) {
    var binStr = atob( dataURI.split(',')[1] );
    var len = binStr.length;
    var arr = new Uint8Array(len);

    for (var i = 0; i < len; ++i) {
        arr[i] = binStr.charCodeAt(i);
    }

    var blob = new Blob([arr], {type: mimetype});
    return cb(blob); // invoke cb with response
};
