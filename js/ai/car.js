let can;
let gen;



let prov = null;

let walls = [];

let carp, carrp;

const generationSize = 30;
let fp = 1;

function preload() {
  carp = loadImage("Images/car1.png");
  carrp = loadImage("Images/car1r.png");
}

function setup() {
  const x = 600;
  const y = 500;
  can = createCanvas(x, y);
  can.parent(document.getElementById('game'));

  walls.push(new Wall(-5, -5, width + 10, 10));
  walls.push(new Wall(width - 5, -5, 10, height + 10));
  walls.push(new Wall(-5, height - 5, width + 10, 5));
  walls.push(new Wall(-5, -5, 10, height + 10));
  walls.push(new Wall(200, 200, width - 400, height - 400));

  gen = new Generation();



}

function restart() {
  gen.dieNext = true;

}

function draw() {
  for (let frame = 0; frame < fp; frame++) {
    background(100);

    if (prov != null) {
      stroke(0);
      fill(80);
      rect(prov.x, prov.y, mouseX - prov.x, mouseY - prov.y);
    }

    if (!gen.update())
      gen = new Generation(gen.getNewGeneration());
    else {
      for (let wall of walls) {
        wall.show();
        for (let i = 0; i < gen.cars.length; i++) {

          let p1 = gen.cars[i].pos.copy().add(p5.Vector.fromAngle(radians(gen.cars[i].angle - 90)).setMag(gen.cars[i].length / 2)).add(p5.Vector.fromAngle(radians(gen.cars[i].angle)).setMag(gen.cars[i].width / 2));
          let p2 = gen.cars[i].pos.copy().add(p5.Vector.fromAngle(radians(gen.cars[i].angle - 90)).setMag(gen.cars[i].length / 2)).sub(p5.Vector.fromAngle(radians(gen.cars[i].angle)).setMag(gen.cars[i].width / 2));
          let p3 = gen.cars[i].pos.copy().sub(p5.Vector.fromAngle(radians(gen.cars[i].angle - 90)).setMag(gen.cars[i].length / 2)).add(p5.Vector.fromAngle(radians(gen.cars[i].angle)).setMag(gen.cars[i].width / 2));
          let p4 = gen.cars[i].pos.copy().sub(p5.Vector.fromAngle(radians(gen.cars[i].angle - 90)).setMag(gen.cars[i].length / 2)).sub(p5.Vector.fromAngle(radians(gen.cars[i].angle)).setMag(gen.cars[i].width / 2));
          if (wall.intersects(p1) || wall.intersects(p2) || wall.intersects(p3) || wall.intersects(p4)) {
            gen.delete(i);
            i--;
          }
        }
      }


      gen.show();
    }
  }
}

function keyPressed() {

  if (key == 'W')
    acc = true;
  else if (key === 'S') {
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

function checkLineIntersection(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
  // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
  var denominator, a, b, numerator1, numerator2, result = {
    x: null,
    y: null,
    onLine1: false,
    onLine2: false
  };
  denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
  if (denominator == 0) {
    return result;
  }
  a = line1StartY - line2StartY;
  b = line1StartX - line2StartX;
  numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
  numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
  a = numerator1 / denominator;
  b = numerator2 / denominator;

  // if we cast these lines infinitely in both directions, they intersect here:
  result.x = line1StartX + (a * (line1EndX - line1StartX));
  result.y = line1StartY + (a * (line1EndY - line1StartY));
  /*
          // it is worth noting that this should be the same as:
          x = line2StartX + (b * (line2EndX - line2StartX));
          y = line2StartX + (b * (line2EndY - line2StartY));
          */
  // if line1 is a segment and line2 is infinite, they intersect if:
  if (a > 0 && a < 1) {
    result.onLine1 = true;
  }
  // if line2 is a segment and line1 is infinite, they intersect if:
  if (b > 0 && b < 1) {
    result.onLine2 = true;
  }
  // if line1 and line2 are segments, they intersect if both of the above are true
  return result;
};

class Scanner {
  constructor() {

  }
  scann(lineStart, lineEnd) {
    let minG = round(lineStart.dist(lineEnd));

    let minGResult = null;
    for (let i = 0; i < walls.length; i++) {
      const wall = walls[i];
      let min = lineStart.dist(lineEnd) + 1;
      let minResult = null;

      let result = checkLineIntersection(lineStart.x, lineStart.y, lineEnd.x, lineEnd.y, wall.pos.x, wall.pos.y, wall.pos.x + wall.w, wall.pos.y);
      if (result.x != null && result.onLine1 && result.onLine2 && lineStart.dist(createVector(result.x, result.y)) < min) {
        min = lineStart.dist(createVector(result.x, result.y));
        minResult = result;

      }
      result = checkLineIntersection(lineStart.x, lineStart.y, lineEnd.x, lineEnd.y, wall.pos.x + wall.w, wall.pos.y + wall.h, wall.pos.x + wall.w, wall.pos.y);
      if (result.x != null && result.onLine1 && result.onLine2 && lineStart.dist(createVector(result.x, result.y)) < min) {
        min = lineStart.dist(createVector(result.x, result.y));
        minResult = result;
      }
      result = checkLineIntersection(lineStart.x, lineStart.y, lineEnd.x, lineEnd.y, wall.pos.x, wall.pos.y + wall.h, wall.pos.x + wall.w, wall.pos.y + wall.h);
      if (result.x != null && result.onLine1 && result.onLine2 && lineStart.dist(createVector(result.x, result.y)) < min) {
        min = lineStart.dist(createVector(result.x, result.y));
        minResult = result;
      }
      result = checkLineIntersection(lineStart.x, lineStart.y, lineEnd.x, lineEnd.y, wall.pos.x, wall.pos.y, wall.pos.x, wall.pos.y + wall.h);
      if (result.x != null && result.onLine1 && result.onLine2 && lineStart.dist(createVector(result.x, result.y)) < min) {
        min = lineStart.dist(createVector(result.x, result.y));
        minResult = result;
      }

      if (minResult != null && min < minG) {
        minG = min;
        minGResult = minResult;
      }
    }

    return minG;
  }
}

function deletePipes(){
  walls.splice(5, walls.length-5);
}
