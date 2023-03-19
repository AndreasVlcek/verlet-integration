const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

let force_x = 100.0;
let force_y = 300.0;

class Point {
  
  constructor(x, y, mass) {
      this.x = x;
      this.y = y;
      this.mass = mass;
  }
  
  update(dt) {
    // TODO: Verlet integration
  }
  
  constrain() {
    // TODO: Bounce off the walls by flipping the velocity
  }
  
  render() {
    noStroke();
    fill("white");
    circle(this.x, this.y, 20);
  }
  
}

let points = [
  new Point(350, 300, 1.0),
  new Point(450, 300, 1.0)
]


function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
}

function draw() {
  // Get the time ellapsed since the last update in seconds (dt)
  let dt = deltaTime / 1000;
  
  // Update all the points
  for (let point of points) {
    point.update(dt);
  }
  
  // Bounce all the points against the canvas
  for (let point of points) {
    point.constrain();
  }
  
  background("black");
  
  for (let point of points) {
    point.render();
  }
}
