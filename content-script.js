var canvas, context, video, a;

createElements();
initWebcam();

function initWebcam() {
    navigator.getUserMedia = (navigator.getUserMedia ||
                        navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia ||
                        navigator.msGetUserMedia ||
                        navigator.mediaDevices.getUserMedia);

    navigator.getUserMedia({video: true, audio: false}, onWebcamSuccess, onWebcamError);
}


function onWebcamSuccess(stream) {
    video.src = window.URL.createObjectURL(stream);
    video.addEventListener('canplay', function() {
        say('say cheese');
        takePic(stream, function afterPicTaken(dataUrl) {
            replaceImages(dataUrl);
            say('you look great');
        });
    }, true);
}

function onWebcamError(e) {
    console.log('sorry: ', e);
}

function takePic(stream, cb) {
    // Video height and width aren't available until the stream starts, so
    // we grab em here
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    var dataURL = canvas.toDataURL('image/png');

    return cb(dataURL); // invoke cb with dataURL
}

function createElements() {
    // None of these elements are in the DOM
    canvas = document.createElement('canvas');
    context = canvas.getContext('2d');
    video = document.createElement('video');
    a = document.createElement('a');
}

function say(whatToSay) {
    var utterance = new SpeechSynthesisUtterance();
    utterance.text = whatToSay;
    utterance.lang = 'en-GB'; // default is en-US
    utterance.volume = 0.6;
    utterance.rate = 0.75;
    window.speechSynthesis.speak(utterance);
}

function replaceImages(newImageSrc) {
    var imgTags = document.getElementsByTagName('img');
    for (var i = 0; i < imgTags.length; i++) {
        imgTags[i].src = newImageSrc;
    }
}
