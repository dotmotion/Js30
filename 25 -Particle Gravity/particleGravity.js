const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");

// Random number generator
function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

const colors = ["#465B55", "#373A3D", "#F8F7FF", "#58475C"];
let circleArray = [];
const speed = 2;
const mouse = {
  x: undefined,
  y: undefined
};
const gravity = 1;

window.addEventListener("mousemove", e => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener("mousedown", () => {
  init();
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function Circle(x, y, dx, dy, radius, color, friction) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;
  this.friction = friction;

  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  };

  this.update = () => {
    // Handle Collision with floor
    if (this.y + this.radius + this.dy > innerHeight) {
      this.dy = -this.dy * this.friction;
    } else {
      // Gravity
      this.dy += gravity;
    }
    // Handle Collision with walls
    if (
      this.x + this.radius + this.dx > innerWidth ||
      this.x - this.radius < 0
    ) {
      this.dx = -this.dx * this.friction;
    }
    this.y += this.dy;
    this.x += this.dx;
    // Re-draw each circle
    this.draw();
  };
}

function init() {
  circleArray = [];
  // Circle Generator
  for (let i = 0; i < 100; i++) {
    let radius = randomRange(20, 25);
    let x = randomRange(radius, window.innerWidth - radius);
    let y = randomRange(radius, window.innerHeight / 2);
    let colNum = Math.floor(randomRange(0, colors.length));
    let dy = Math.floor(randomRange(-5, 5));
    let dx = Math.floor(randomRange(-2, 2));
    let friction = randomRange(0.75, 0.85);
    circleArray.push(
      new Circle(x, y, dx, dy, radius, colors[colNum], friction)
    );
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

init();
animate();
