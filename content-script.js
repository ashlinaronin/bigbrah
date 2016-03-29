var canvas, context, video, a;

createElements();
initWebcam();


function initWebcam() {
    navigator.getUserMedia = (navigator.getUserMedia ||
                        navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia ||
                        navigator.msGetUserMedia ||
                        navigator.mediaDevices.getUserMedia);

    navigator.getUserMedia({video: true, audio: false}, webcamSuccessCallback, webcamErrorCallback);
}

function webcamSuccessCallback(stream) {
    video.src = window.URL.createObjectURL(stream);
    video.addEventListener('canplay', function() {
        takePic(stream);
    }, true);
}

function webcamErrorCallback(e) {
    console.log('sorry: ', e);
}

function takePic(stream) {
    context.drawImage(video, 0, 0);
    var dataURL = canvas.toDataURL('image/png');

    // got pic, do something with it here

    // a.download = 'screenshot-front.png';
    // a.href = dataURL;
    // location.replace(a.href);
}




function createElements() {
    // None of these elements are in the DOM
    canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext('2d');
    video = document.createElement('video');
    a = document.createElement('a');
}





function say(whatToSay) {
    var utterance = new SpeechSynthesisUtterance();
    utterance.text = whatToSay;
    utterance.lang = 'en-GB'; // default is en-US
    utterance.volume = 0.6;
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
}

function replaceImages(newImageSrc) {
    var imgTags = document.getElementsByTagName('img');
    for (var i = 0; i < imgTags.length; i++) {
        imgTags[i].src = newImageSrc;
    }
}
