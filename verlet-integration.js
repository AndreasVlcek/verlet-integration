const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

let force_x = 100.0;
let force_y = 300.0;

class Point {
  
  constructor(x, y, mass) {
    this.x = x;
    this.y = y;
    this.old_x = x;
    this.old_y = y;
    this.mass = mass;
  }
  
  update(dt) {
    let vel_x = (this.x - this.old_x);
    let vel_y = (this.y - this.old_y);
    
    // The current position becomes the old one
    this.old_x = this.x;
    this.old_y = this.y;
    
    // Compute the acceleration using a=f/m
    let acc_x = force_x / this.mass;
    let acc_y = force_y / this.mass;
    
    // Estimate the new position using Verlet integration
    this.x += vel_x + acc_x * dt * dt;
    this.y += vel_y + acc_y * dt * dt;
  }
  
  constrain() {
    // Bounce of the walls
    let vel_x = (this.x - this.old_x);
    let vel_y = (this.y - this.old_y);
    
    if (this.x < 0) {
      this.x = 0;
      this.old_x = this.x + vel_x;
    } else if (this.x > SCREEN_WIDTH) {
      this.x = SCREEN_WIDTH;
      this.old_x = this.x + vel_x;
    } else if (this.y < 0) {
      this.y = 0;
      this.old_y = this.y + vel_y;
    } else if (this.y > SCREEN_HEIGHT) {
      this.y = SCREEN_HEIGHT;
      this.old_y = this.y + vel_y;
    }
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
