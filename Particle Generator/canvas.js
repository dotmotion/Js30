const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let particleNum = 30;
let particles = {};
let particleindex = 0;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

const colors = ["#FF6138", "#FFFF9D", "#BEEB9F", "#79BD8F", "#00A388"];

//Utility Functions
function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
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

  //init()
});

// Constructor Function
function Particle(color) {
  this.x = canvas.width / 2;
  this.y = canvas.height / 2;
  this.radius = 3;
  this.dx = Math.random() * 10 - 5;
  this.dy = Math.random() * 10 - 8;
  this.gravity = 0.3;
  this.color = color;

  particleindex++;
  particles[particleindex] = this;
  this.id = particleindex;
  this.life = 0;
  this.lifespan = Math.random() * 30 + 10;

  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    // c.fillStyle = "white";
    // c.fillRect(this.x, this.y, 10, 10);
  };

  this.update = () => {
    this.draw();

    this.x += this.dx;
    this.y += this.dy;
    this.dy += this.gravity;
    this.life++;

    if (this.life >= this.lifespan) {
      delete particles[this.id];
    }
  };
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  //Background
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < particleNum; i++) {
    new Particle(randomColor(colors));
  }
  for (var i in particles) {
    particles[i].update();
  }
}

animate();
