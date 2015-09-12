'use strict';



// Dependencies
//
var fs = require('fs');
var photoData;



function bindSavingPhoto () {
  var saveFile  = window.document.querySelector('#saveFile');
  saveFile.addEventListener('change', function () {
    var filePath = this.value;
    fs.writeFile(filePath, photoData, 'base64', function (err) {
      if (err) { alert('There was a problem saving the photo:',err.message); }
      photoData = null;
    });
  });
}



function initialize () {

  var errorCallback = function (error) {
    console.log('There was an error connecting to the video stream:', error);
  };

  window.navigator.webkitGetUserMedia({video: true}, function (localMediaStream) {
    var video = window.document.querySelector('video');
    video.src = window.URL.createObjectURL(localMediaStream);

    video.onloadedmetadata = function () {
        bindSavingPhoto();
    };
  }, errorCallback);

}


function removeEffects () {
  window.document.querySelector('video')
  .setAttribute('class', '');  
}



function applyEffect (effectName) {
  window.document.querySelector('video')
  .setAttribute('class', effectName);  
}


function takePhoto () {
  var saveFile  = window.document.querySelector('#saveFile');
  var canvas    = window.document.querySelector('canvas');
  var video     = window.document.querySelector('video');
  canvas.getContext('2d').drawImage(video, 0, 0, 320, 240);
  photoData     = canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
  saveFile.click();
}



window.onload = initialize();