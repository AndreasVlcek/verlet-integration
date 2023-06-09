const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

let force_x = 100.0;
let force_y = 300.0;

function distance(p0, p1) {
  let dx = p1.x - p0.x;
  let dy = p1.y - p0.y;
  return Math.sqrt(dx * dx + dy * dy);
}

class Point {
  
  constructor(x, y, mass, pinned) {
    this.x = x;
    this.y = y;
    this.old_x = x;
    this.old_y = y;
    this.mass = mass;
    this.pinned = pinned;
  }
  
  update(dt) {
    if (!this.pinned) {
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

class Stick {
  
  constructor(p0, p1, length) {
    this.p0 = p0;
    this.p1 = p1;
    this.length = length;
  }
  
  update(dt) {
    let dx = this.p1.x - this.p0.x;
    let dy = this.p1.y - this.p0.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    let diff = this.length - dist;
    let percent = (diff / dist) / 2;
    
    let offset_x = dx * percent;
    let offset_y = dy * percent;
    
    if (!this.p0.pinned ) {
      this.p0.x -= offset_x;  // minus for p0
      this.p0.y -= offset_y;
    }
    
    if (!this.p1.pinned ) {
      this.p1.x += offset_x;  // minus for p1
      this.p1.y += offset_y;
    }
  }
  
  render() {
    stroke('white');
    line(this.p0.x, this.p0.y, this.p1.x, this.p1.y);
  }
}

let points = [
  new Point(200, 200, 1.0, false),  // A
  new Point(300, 200, 1.0, false),  // B
  new Point(300, 300, 1.0, false),  // C
  new Point(200, 300, 1.0, false),  // D
  new Point(400, 100, 1.0, true),   // Anchor
  
];

let sticks = [
  new Stick(points[0], points[1], distance(points[0], points[1])),  // A-----B
  new Stick(points[1], points[2], distance(points[1], points[2])),  // | \   |
  new Stick(points[2], points[3], distance(points[2], points[3])),  // |  \  |
  new Stick(points[3], points[0], distance(points[3], points[0])),  // |   \ |
  new Stick(points[0], points[2], distance(points[0], points[2])),  // B-----C
  new Stick(points[4], points[2], distance(points[4], points[2])),  //        \_(anchor)
];

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
  
  // Update all the sticks
  for (let stick of sticks) {
    stick.update(dt);
  }
  
  // Bounce all the points against the canvas
  for (let point of points) {
    point.constrain();
  }
  
  background("black");
  
  for (let stick of sticks) {
    stick.render();
  }
  
  for (let point of points) {
    point.render();
  }
}
