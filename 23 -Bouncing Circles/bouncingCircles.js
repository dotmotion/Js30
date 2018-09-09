const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");

// Random number generator
function randomRange(min, max) {
  return Math.random() * (max - min + 1) + min;
}

const colors = ["#E2E6E8", "#8DA2AD", "#989B9C", "#688EA1", "#666869"];

function Circle(x, y, dx, dy, radius, color) {
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
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  };
}

let circleArray = [];

for (let i = 0; i < 100; i++) {
  // Variables
  let radius = 30;
  let x = randomRange(radius, window.innerWidth - radius);
  let y = randomRange(radius, window.innerHeight - radius);
  let colNum = Math.floor(randomRange(0, colors.length));
  let dx = randomRange(-3, 3);
  let dy = randomRange(-3, 3);
  circleArray.push(new Circle(x, y, dx, dy, radius, colors[colNum]));
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();
