'use strict';

// Dependencies
//

function init () {

  var errorCallback = function (error) {
    console.log('The connection to the video camera was rejected', error);
  };

  window.navigator.webkitGetUserMedia({video: true}, function (localMediaStream) {
    var video = document.querySelector('video');
    video.src = window.URL.createObjectURL(localMediaStream);

    video.onloadedmetadata = function (event) {
      // show the video element
    };
  }, errorCallback);

}



window.onload = init();