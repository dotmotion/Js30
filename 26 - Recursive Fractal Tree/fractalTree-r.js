let aSlider;

function setup() {
	createCanvas(700, 600);
	aSlider = createSlider(0, PI*4, PI/4, 0.01);
}

function draw() {
	background(51);
	angle = aSlider.value();
	aSlider.position(20, 20);
	stroke(255);
	strokeWeight(3);
	translate(400, height);
	branch(200);
}

function branch(len) {
	line(0, 0, 0, -len);
	translate(0, -len);
	if (len > 5) {
		push();
		rotate(angle);
		branch(len * 0.50);
		pop();
		push();
		rotate(-angle);
		branch(len * 0.75);
		pop();
	}
}