// Fix NW.js so it works with J5
nw.require("nwjs-j5-fix").fix();

// Open Chromium's development tools so we can see log output.
nw.Window.get().showDevTools();

var particles = [];

var settings = {
  color: "#FFFFFF", // Beware: we use hex because dat.GUI's RGB mode is broken!
  opacity: 1.0,
  detectionRange: [8, 75],
  sizeFactor: 1,
  sizeFactorRange: [0, 2]
};

window.addEventListener("DOMContentLoaded", function() {

  console.log("DOM ready!");

  // Setup control panel and toggle function
  var gui = new dat.GUI();
  gui.add(settings, "sizeFactor", settings.sizeFactorRange[0], settings.sizeFactorRange[1]);
  gui.addColor(settings, "color");

  // Retrieve canvas and drawing context
  var canvas = document.getElementsByTagName('canvas')[0];
  var context = canvas.getContext('2d');

  // Make canvas full screen
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  // Create Johnny-Five object and new Board object to work with.
  var five = require("johnny-five");
  var board = new five.Board();

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

    // Add a callback function to be executed when distance data is received.
    proximity.on("data", function() {

      if (this.cm > settings.detectionRange[0] && this.cm < settings.detectionRange[1]) {

        //console.log(this.cm);

        console.log(settings.color);

        var proximitySquared = Math.pow(settings.detectionRange[1] - this.cm, 2);
        var count = proximitySquared / 100;
        var size = proximitySquared / 1000;
        var speed = proximitySquared / 50;

        // Create a bunch of particles
        for (var i = 0; i < count; i++) {
          var particle = new Particle(context,
            {
              x: canvas.width/2,
              y: canvas.height/2,
              radius: size * settings.sizeFactor,
              speed: speed,
              color: settings.color
            }
          );
          particles.push(particle);
        }

        //console.log(particles.length);

      }

    });

  });

  // Start renderer
  Particle.render(context, particles);

});
