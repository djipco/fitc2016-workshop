// Fix NW.js so it works with J5
nw.require("nwjs-j5-fix").fix();

// Open Chromium's development tools so we can see log output.
nw.Window.get().showDevTools();

// Only start when the DOM is ready
window.addEventListener("DOMContentLoaded", function() {

  // Create Johnny-Five object so we can then create a new Board object to work with.
  var five = require("johnny-five");
  new five.Board(/* {port: "COM6"} */).on("ready", function() {


    // Using the piezo as a vibration sensor
    // var sensor = new five.Sensor({
    //   pin: "A0",
    //   freq: 25,
    //   threshold: 1
    // });
    //
    // sensor.on("change", function () {
    //   console.log(this.value);
    // });


    // Using the piezo as a buzzer
    // var piezo = new five.Piezo(11);
    //
    // piezo.play({
    //   song: [
    //     ["C5", 1/4],
    //     [null, 5/4],
    //     ["G4", 1/4],
    //     [null, 5/4],
    //     ["E4", 1/4],
    //     [null, 5/4],
    //     ["A4", 1/4],
    //     [null, 1/4],
    //     ["B4", 1/4],
    //     [null, 3/4],
    //     ["A#4", 1/4],
    //     [null, 1/4],
    //     ["A4", 1/4],
    //     [null, 3/4],
    //     ["G4", 1/4],
    //     [null, 1/4],
    //     ["E5", 1/4],
    //     [null, 3/4],
    //     ["G5", 1/4],
    //     [null, 1/4],
    //     ["A5", 1/4],
    //     [null, 3/4],
    //     ["F5", 1/4],
    //     [null, 1/4],
    //     ["G5", 1/4],
    //     [null, 3/4],
    //     ["E5", 1/4],
    //     [null, 3/4],
    //     ["C5", 1/4],
    //     [null, 1/4],
    //     ["D5", 1/4],
    //     [null, 1/4],
    //     ["B4", 1/4],
    //     [null, 3/4]
    //   ],
    //   tempo: 200
    // });


  });

});