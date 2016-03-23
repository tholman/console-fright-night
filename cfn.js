/**
 *  Console Fright Night
 *  - Play audio when the web console has been opened.
 *  -- Works by constantly hitting the console log, and hijacking the id check.
 *
 *  MIT licensed
 *  Copyright (C) 2016 Tim Holman, http://tholman.com
 */

function CFN(options) {

  var checkSpeed = 500;
  var audioIsPlaying = false;
  var audioCheck = false;

  var audioElement;

  // Setup
  function init(options) {

    if( !options || !options.src ) {
      console.log('Oh no, no source!');
      return;
    }

    audioElement = document.createElement('audio');
    audioElement.src = options.src;
    
    // When the console logs and is open, it requests the id.
    // We can jack into this, to tell when the console has been opened.
    audioElement.__defineGetter__('id', function() {
      audioCheck = true;
    });
    
    // Just keep checking to see if anything opens :o
    setInterval( checkTheConsole, checkSpeed );
  }

  // Function hits the console, which lets our "getting" function run.
  function checkTheConsole() {
    audioCheck = false;
    console.log("Check the console: ", audioElement);
    if( audioCheck === true ) {
      play();
    } else {
      dontPlay();
    }
  }

  // Play the audio
  function play() {
    if (audioIsPlaying) {
      return;
    }
    
    audioElement.play();
    audioIsPlaying = true;
  }

  // Stop the audio
  function dontPlay() {
    audioIsPlaying = false;
    audioElement.pause();
    audioElement.currentTime = 0;
  }

  init(options);
}