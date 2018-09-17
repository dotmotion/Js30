const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

const colors = ["#7C557F", "#FBC4FF", "#F9AAFF", "#7A3F7F", "#C788CC"];

//Utility Functions
function randomRange(min, max) {
  return Math.random() * (max - min + 1) + min;
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

// Event Listeners
addEventListener("mousemove", event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  //   init();
});

// Particles
function Particle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  };

  this.update = () => {
    // Keeping the particles withing the boundaries
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    //Draw a line if the particle gets close to another one
    for (let i = 0; i < Particles.length; i++) {
      const dist = distance(this.x, this.y, Particles[i].x, Particles[i].y);
      if (dist < 150) {
        c.lineWidth = 0.5;
        c.beginPath();
        c.strokeStyle = this.color;
        c.moveTo(this.x, this.y);
        c.lineTo(Particles[i].x, Particles[i].y);
        c.stroke();
      }
    }

    this.draw();
  };
}

// Implementation
let Particles;
function init() {
  Particles = [];
  let i = 0;
  const speed = 1;

  while (i < 25) {
    let radius = 12;
    let x = randomRange(radius, window.innerWidth - radius);
    let y = randomRange(radius, window.innerHeight - radius);
    let col = randomColor(colors);
    let dx = randomRange(-speed, speed) * 0.09;
    let dy = randomRange(-speed, speed) * 0.09;
    // prevent value of 0 on speed
    if (dx != 0 && dy != 0) {
      Particles.push(new Particle(x, y, dx, dy, radius, col));
      i++;
    }
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  Particles.forEach(Particle => {
    Particle.update();
  });
}

init();
animate();
