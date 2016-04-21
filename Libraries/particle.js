var Particle = function(ctx, options) {
  this.context = ctx;
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.speed = options.speed || 10;
  this.vx = (Math.random() * this.speed) - (this.speed / 2);
  this.vy = (Math.random() * this.speed) - (this.speed / 2);
  this.radius = options.radius || 5;
  this.alpha = options.alpha || 1;
  var colors = options.color || [255, 255, 255];
  this.color = {r: colors[0], g: colors[1], b: colors[2]};
};

Particle.prototype.draw = function() {
  this.x += this.vx;
  this.y += this.vy;
  this.alpha -= 0.01;
  this.context.beginPath();
  this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
  this.context.fillStyle =  "rgba("
                            + Math.floor(this.color.r) + ", "
                            + Math.floor(this.color.g) + ", "
                            + Math.floor(this.color.b) + ", " + this.alpha
                            + ")";
  this.context.fill();
};

Particle.render = function(context, particles) {

  var that = this;
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  for(var i = 0; i < particles.length; i++) {

    if (
      particles[i].x < 0 || particles[i].x > context.canvas.width ||
      particles[i].y < 0 || particles[i].y > context.canvas.height ||
      particles[i].alpha < 0
    ) {
      particles.splice(i, 1);
    } else {
      particles[i].draw();
    }

  }

  requestAnimationFrame(function() {
    that.render(context, particles);
  });

};