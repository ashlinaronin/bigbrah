var bigBro = {
    canvas: null,
    context: null,
    webcam: null
}
bigBro.canvas = document.querySelector('canvas#selfie-canvas');
bigBro.context = bigBro.canvas.getContext('2d');
bigBro.webcam = document.querySelector('video#webcam');

chrome.browserAction.onClicked.addListener(function(tab) {
    // options for cdm are "screen", "window" or "tab"
    chrome.desktopCapture.chooseDesktopMedia(['screen'], function(streamId) {
        setupWebcam(streamId);
    });
});


function setupWebcam(streamId) {
    if (!streamId) {
        console.log('sorry no');
        return;
    }

    bigBro.canvas.width = screen.width;
    bigBro.canvas.height = screen.height;

    navigator.webkitGetUserMedia({
        // audio: {
        //     mandatory: {
        //         chromeMediaSource: 'desktop',
        //         chromeMediaSourceId: streamId
        //     }
        // },
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

function getUserMediaError(error) {
    console.log('navigator.webkitGetUserMedia() error: ', error);
}

function gotStream(stream) {
    bigBro.webcam.src = URL.createObjectURL(stream);
    bigBro.webcam.addEventListener('canplay', function() {
        takePic(stream);
    }, true);
}

function takePic(stream) {
    bigBro.context.drawImage(bigBro.webcam, 0, 0);
    var dataURL = bigBro.canvas.toDataURL('image/png');
    downloadScreenshot(dataURL);
}

function periodicallyTakePics(stream, interval) {
    setTimeout(function() {
        takePic(stream);
    }, interval);
}

function downloadScreenshot(objUrl) {
    chrome.downloads.download(
        { url: objUrl, filename: 'screenshot.png' },
        function(downloadId) {
            console.log("downloading, downloadId is:" + downloadId);
        }
    );
}
