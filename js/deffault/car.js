let can;
let car;

let acc, left,br,right;

let prov = null;

let walls = [];

let carp, carrp;

function preload(){
  carp = loadImage("Images/car1.png");
  carrp = loadImage("Images/car1r.png");
}

function setup() {
  const x = 600;
  const y = 500;
  can = createCanvas(x, y);
  can.parent(document.getElementById('game'));

  walls.push(new Wall(-5, -5, width + 10, 10));
  walls.push(new Wall(width-5, -5, 10, height+10));
  walls.push(new Wall(-5, height-5, width+10, 5));
  walls.push(new Wall(-5, -5, 10, height+10));
  walls.push(new Wall(200, 200, width-400, height-400));
  
  restart();

}

function restart(){
  car = new Driver();


  acc = false,
  left = false;
  br = false,
  right = false;
}

function draw() {
  background(100);

  if (prov != null) {
    stroke(0);
    fill(80);
    rect(prov.x, prov.y, mouseX - prov.x, mouseY - prov.y);
  }
    car.update();
  for(let wall of walls){
    wall.show();
    let p1 = car.pos.copy().add(p5.Vector.fromAngle(radians(car.angle-90)).setMag(car.length/2)).add(p5.Vector.fromAngle(radians(car.angle)).setMag(car.width/2));
    let p2 = car.pos.copy().add(p5.Vector.fromAngle(radians(car.angle-90)).setMag(car.length/2)).sub(p5.Vector.fromAngle(radians(car.angle)).setMag(car.width/2));
    let p3 = car.pos.copy().sub(p5.Vector.fromAngle(radians(car.angle-90)).setMag(car.length/2)).add(p5.Vector.fromAngle(radians(car.angle)).setMag(car.width/2));
    let p4 = car.pos.copy().sub(p5.Vector.fromAngle(radians(car.angle-90)).setMag(car.length/2)).sub(p5.Vector.fromAngle(radians(car.angle)).setMag(car.width/2));
    if(wall.intersects(p1)||wall.intersects(p2)||wall.intersects(p3)||wall.intersects(p4))
      restart();
  }


  car.show();

}

function keyPressed() {

  if (key == 'W')
    acc = true;
  else if (key == 'S') {
    br = true;
  } else if (key == 'A') {
    left = true;
  } else if (key == 'D') {
    right = true;
  }
}

function keyReleased() {
  if (key == 'W')
    acc = false;
  else if (key == 'S')
    br = false;
  else if (key == 'A')
    left = false;

  else if (key == 'D')
    right = false;
}

function mousePressed() {
  prov = createVector(mouseX, mouseY);
}

function mouseReleased() {
  walls.push(new Wall(prov.x, prov.y, mouseX - prov.x, mouseY - prov.y));
  prov = null;
}
