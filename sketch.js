const SCREEN__WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

let force_x = 0.0;
let force_y = 300.0;

class Point {
  
  constructor(x, y, vel_x, vel_y, mass) {
      this.x = x;
      this.y = y;
      this.vel_x = vel_x;
      this.vel_y = vel_y;
      this.mass = mass;
  }
  
  update(dt) {
    
    // This is the Euler integration method
    let acc_x = force_x / this.mass;
    let acc_y = force_y / this.mass;
    
    this.x += this.vel_x * dt;
    this.y += this.vel_y * dt;
    
    this.vel_x += acc_x * dt;
    this.vel_y += acc_y * dt;
  }
  
  render() {
    noStroke();
    fill("white")
    circle(this.x, this.y, 20);
  }
  
}

let points = [
  new Point(350, 300, 0, 50, 1.0),
  new Point(450, 300, 0, 50, 1.0)
]


function setup() {
  createCanvas(SCREEN__WIDTH, SCREEN_HEIGHT);
}

function draw() {
  // Get the time ellapsed since the last update in seconds (dt)
  let dt = deltaTime / 1000;
  
  // Update all the points
  for (let point of points) {
    point.update(dt)
  }
  
  background("black");
  
  for (let point of points) {
    point.render()
  }
}
