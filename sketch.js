const SCREEN__WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

class Point {
  
  constructor(x, y, vel_x, vel_y, mass) {
      this.x = x;
      this.y = y;
      this.vel_x = vel_x;
      this.vel_y = vel_y;
      this.mass = mass;
  }
  
  update(dt) {
    /////////////////////////
    // TODO:
    /////////////////////////
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
  background("black");
  
  for (let point of points) {
    point.render()
  }
}
