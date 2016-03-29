var canvas, context, video;

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
    console.log('got a stream brah');
    video.src = window.URL.createObjectURL(stream);
    console.dir(video);
}

function webcamErrorCallback(e) {
    console.log('sorry: ', e);
}






function createElements() {
    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    // canvas.style.display = 'none';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context = canvas.getContext('2d');

    video = document.createElement('video');
    document.body.appendChild(video);
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
