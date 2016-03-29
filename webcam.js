var bigBro = {
    canvas: null,
    context: null,
    webcam: null,
    dataURL: null
}

bigBro.canvas = document.querySelector('#selfie-canvas');
bigBro.context = bigBro.canvas.getContext('2d');

function takePic(stream) {
    context.drawImage(webcam, 0, 0);
    dataURL = canvas.toDataURL('image/png');
    postImage(dataURL, 'localhost:8000/saveImg');
}

function postImage(dataURL, apiEndpoint) {
    // do AJAX call here to send image to server
}

function initWebcam() {
    var p = navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    p.then(function(mediaStream) {
        webcam = document.querySelector('video#webcam'); // haven't made this yet
        webcam.src = window.URL.createObjectURL(mediaStream);
        webcam.onloadedmetadata = function(e) {
            // do something with video
            takePic(mediaStream);
        };
    });

    p.catch(function(err) {
        console.log(err.name);
    });
}
