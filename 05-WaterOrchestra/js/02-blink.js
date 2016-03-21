// NW.js must be fixed to work with J5
nw.require("nwjs-j5-fix").fix();

// Open Chromium's development tools so we can see log output.
nw.Window.get().showDevTools();

// Import the Johnny-Five library and create a new Board object to work with.
var five = nw.require("johnny-five");
var board = new five.Board();

// Add a callback to be executed when the board is ready.
board.on("ready", function() {

  // If we see this in the console, we know the board is ready!
  console.log("Board Ready for Blink Off!");

  // Preferences object
  var settings = {
    pin: 13,
    interval: 250,
    range: [50, 500],
    toggle: toggle
  };

  // Create a LED object and make it blink
  var led = new five.Led(settings.pin);
  led.blink(settings.interval);

  // Setup control panel and toggle function
  var gui = new dat.GUI();
  gui.add(settings, "interval", settings.range[0], settings.range[1])
    .onChange(function(value) { led.blink(value); });
  gui.add(settings, "toggle");

  function toggle() {
    if (led.isRunning) {
      led.stop().off();
    } else {
      led.blink(settings.interval);
    }
  }

});
