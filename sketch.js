let world;
let rectSize;
const gridSize = 50;
let stopped = false;
let controlEnergy = 100;

function setup() {
  createCanvas(800, 800);
  frameRate(60);
  rectSize = width / gridSize;
  world = new Array(gridSize).fill().map((i) => new Array(gridSize).fill(0));
  world[gridSize / 2][gridSize / 2] = 256;
  noSmooth();
  noStroke();
  colorMode(HSB, 100);
}

function update() {
  if (stopped) return;
  let wrld = JSON.parse(JSON.stringify(world));
  for (let y = 0; y < gridSize; ++y) {
    for (let x = 0; x < gridSize; ++x) {
      const div = wrld[x][y] / 4;
      if (div >= 0.04) {
        world[x][y] = 0;
        // ugly, but looks better than a regular if
        world[x - 1 == -1 ? gridSize - 2 : x - 1][y] += div;
        world[x + 1 == gridSize ? 1 : x + 1][y] += div;
        world[x][y - 1 == -1 ? gridSize - 2 : y - 1] += div;
        world[x][y + 1 == gridSize ? 1 : y + 1] += div;
      }
    }
  }
}

function drawInfo() {
  fill(0);
  text("Click Energy: " + controlEnergy, 2, 12);
  text("FPS: " + int(frameRate()), 2, 24);
}

function mouseContorls() {
  if (mouseIsPressed) {
    const x = Math.floor(mouseX / (width / gridSize));
    const y = Math.floor(mouseY / (height / gridSize));
    // ugly, but looks better than a regular if
    world[x > gridSize - 1 ? gridSize - 1 : x < 0 ? 0 : x][
      y > gridSize - 1 ? gridSize - 1 : y < 0 ? 0 : y
    ] += controlEnergy;
  }
}

function draw() {
  background("#8C92AC");
  for (let y = 0; y < gridSize; ++y) {
    for (let x = 0; x < gridSize; ++x) {
      const value = world[x][y];
      if (value > 0) {
        fill(value * 60, 100, 100);
        rect(x * rectSize, y * rectSize, rectSize, rectSize);
      }
    }
  }
  drawInfo();
  mouseContorls();
  update();
}

function fillWorld(value) {
  for (let val of world) val.fill(value);
}

function fillWorldRandom(value) {
  for (let x = 0; x < world.length; ++x) {
    for (let y = 0; y < world[x].length; ++y) {
      world[x][y] = random(0.0, 2.0);
    }
  }
}

function keyPressed() {
  switch (key.toLowerCase()) {
    case "c":
      fillWorld(0);
      break;
    case "r":
      fillWorldRandom();
      break;
    case "p":
      stopped = !stopped;
      break;
  }
}

function mouseWheel(event) {
  controlEnergy -= event.delta / 100;
}
