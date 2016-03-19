// Fix NW.js so it works with J5
nw.require("nwjs-j5-fix").fix();

// Open Chromium's development tools so we can see log output.
nw.Window.get().showDevTools();

// Only start when the DOM is ready (because dat.GUI needs the DOM)
window.addEventListener("DOMContentLoaded", function() {

  // Create Johnny-Five and board and use chaining to listen immediately
  var five = require("johnny-five");
  new five.Board({port: "COM6"}).on("ready", function() {

    // If we see this in the console, we know the board is ready!
    console.log("Ready for Space Odyssey!");

    var keypad = new five.Keypad({
      controller: "MPR121_SHIELD"//,
     //sensitivity: {press: 0.9, release: 0.9}
    });

    // Create a Tone.js synth and create a notes array
    var synth = new Tone.PolySynth().toMaster();
    var notes = ["C2", "G2", "C3", "D#3", "E3"];

    // Add press listeners
    keypad.on("press", function(data) {

      // console.log("Press: " + data.which);

      data.which.forEach(function(index) {
        console.log("Press: " + data.which);
        synth.triggerAttack(notes[index]);
      });

      document.getElementById("value").innerHTML = data.which;

    });

    // Add release listeners
    keypad.on("release", function(data) {

      // console.log("Release: " + data.which);

      data.which.forEach(function(index) {
        console.log("Release: " + data.which);
        synth.triggerRelease(notes[index]);
      });

      document.getElementById("value").innerHTML = data.which;

    });

  });

});

// var io = require("firmata").Board;
// var SerialPort = require("browser-serialport").SerialPort;
//
// var board = new five.Board({
// io: new io(
//   // new SerialPort( "/dev/cu.wchusbserial1420", { baudRate: 57600, bufferSize: 1} )
//   new SerialPort( "/dev/cu.wchusbserial1420", { baudRate: 115200} )
// )
// });