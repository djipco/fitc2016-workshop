// Fix NW.js so it works with J5
nw.require("nwjs-j5-fix").fix();

// Open Chromium's development tools so we can see log output.
nw.Window.get().showDevTools();

// Only start when the DOM is ready
window.addEventListener("DOMContentLoaded", function() {

  var value = document.querySelector("#value");
  value.innerHTML = "";

  var five = require("johnny-five");
  new five.Board().on("ready", function() {

    var button = new five.Button(8);

    button.on("hold", function() {
      value.innerHTML = "HOLD";
    });

    button.on("press", function() {
      value.innerHTML = "PRESS";
      var color = "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16);
      document.documentElement.style.backgroundColor = color;
      document.body.style.backgroundColor = color;
    });

    button.on("release", function() {
      value.innerHTML = "RELEASE";
      document.documentElement.style.backgroundColor = "black";
      document.body.style.backgroundColor = "black";
      setTimeout(function () {
        if (value.innerHTML == "RELEASE") {
          value.innerHTML = "";
        }
      }, button.holdtime)
    });

  });

});