// Fix NW.js so it works with J5
nw.require("nwjs-j5-fix").fix();

// Open Chromium's development tools so we can see log output.
nw.Window.get().showDevTools();

var settings = {
  min: 8,
  max: 75,
  types: ["sine", "square", "triangle", "sawtooth"],
  type: "sine"
};

// Only start when the DOM is ready
window.addEventListener("DOMContentLoaded", function() {

  console.log("DOM ready!");

  // Create a Tone.js oscillator
  var osc = new Tone.Oscillator(440, settings.type).toMaster();
  osc.volume.value = -Infinity;
  osc.start();

  // Just for fun, let's add a reverb to make it spookier!
  var reverb = new Tone.Freeverb().toMaster();
  reverb.roomSize.value = 0.9;
  osc.connect(reverb);

  // Add control panel to allow changing of wave type
  var gui = new dat.GUI();
  var typeGui = gui.add(settings, "type", settings.types);
  typeGui.onChange(function(value) { osc.type = value; });

  // Create Johnny-Five object and new Board object to work with.
  var five = require("johnny-five");
  // var board = new five.Board(); // Mac
  var board = new five.Board({port: "COM6"}); // Windows

  // Add a callback to be triggered when the board is ready.
  board.on("ready", function() {

    // If we see this in the console, we know the board is ready. Light up the LED!
    console.log("Board ready!");
    var led = new five.Led(13);
    led.on();

    // Create a Proximity object for our Sharp distance sensor (analog input 0).
    var proximity = new five.Proximity({
      controller: "2Y0A21",
      pin: "A0"
    });

    // Poll the sensor periodically for data
    setInterval(function() {

      //console.log(osc.volume.value);
      console.log(proximity.cm);

      if (proximity.cm > settings.min && proximity.cm < settings.max) {

        //document.getElementById("value").innerHTML = Math.round(proximity.cm) + "cm";

        if (osc.volume.value <= -Infinity) {
          osc.volume.rampTo(-6, 0.02);
        } else {
          osc.frequency.cancelScheduledValues();
          osc.frequency.rampTo(proximity.cm * 20, 0.15);
          document.getElementById("value").innerHTML = Math.round(proximity.cm * 20) + "Hz";
        }

      } else {

        if (osc.volume.value > -Infinity) {
          osc.volume.rampTo(-Infinity, 1);
        }

      }

    }, 50);

  });

});
