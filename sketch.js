let world;
let controlEnergy = 100;

function setup() {
  createCanvas(800, 800);
  frameRate(60);
  world = new World();
  noSmooth();
  noStroke();
  colorMode(HSB, 100);
}

function drawInfo() {
  fill(0);
  text("Click Energy: " + controlEnergy, 2, 12);
  text("FPS: " + int(frameRate()), 2, 24);
}

function mouseContorls() {
  if (mouseIsPressed) {
    const x = Math.floor(mouseX / (width / world.gridSize));
    const y = Math.floor(mouseY / (height / world.gridSize));
    world.add(x, y, controlEnergy);
  }
}

function draw() {
  world.draw();
  drawInfo();
  mouseContorls();
  world.update();
}

function keyPressed() {
  switch (key.toLowerCase()) {
    case "c":
    case "с":
      world.fill(0);
      break;
    case "r":
    case "к":
      world.fillRandom();
      break;
    case "p":
    case "з":
      world.pause();
      break;
  }
}

function mouseWheel(event) {
  controlEnergy -= event.delta / 100;
}