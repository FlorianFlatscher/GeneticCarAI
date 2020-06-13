class Driver {
  constructor(brain = new NeuralNetwork(null)) {
    this.brain = brain;
    this.width = carp.width;
    this.length = carp.height;
    this.pos = createVector(100, height / 2 + this.length / 2);
    this.vel = 3;

    this.angle = 0;
    this.l = 0;

    this.scanner = new Scanner();

    this.fitness = 0;
  }



  show() {
    push();
    translate(this.pos.x, this.pos.y);
    angleMode(DEGREES);
    rotate(this.angle)
    noStroke();
    fill(255);
    imageMode(CENTER);
    image(carp, 0, 0);
    pop();
  }

  update() {

    const input = [];

    input.push(this.scanner.scann(this.pos.copy(), this.pos.copy().add(p5.Vector.fromAngle(radians(this.angle)).setMag(1000)))/1000);

    input.push(this.scanner.scann(this.pos.copy(), this.pos.copy().add(p5.Vector.fromAngle(radians(this.angle-22.5)).setMag(1000)))/1000);

    input.push(this.scanner.scann(this.pos.copy(), this.pos.copy().add(p5.Vector.fromAngle(radians(this.angle-45)).setMag(1000)))/1000);

    input.push(this.scanner.scann(this.pos.copy(), this.pos.copy().add(p5.Vector.fromAngle(radians(this.angle-67.5)).setMag(1000)))/1000);

    input.push(this.scanner.scann(this.pos.copy(), this.pos.copy().add(p5.Vector.fromAngle(radians(this.angle-90)).setMag(1000)))/1000);

    input.push(this.scanner.scann(this.pos.copy(), this.pos.copy().add(p5.Vector.fromAngle(radians(this.angle-112.5)).setMag(1000)))/1000);

    input.push(this.scanner.scann(this.pos.copy(), this.pos.copy().add(p5.Vector.fromAngle(radians(this.angle-135)).setMag(1000)))/1000);

    input.push(this.scanner.scann(this.pos.copy(), this.pos.copy().add(p5.Vector.fromAngle(radians(this.angle-157.5)).setMag(1000)))/1000);

    input.push(this.scanner.scann(this.pos.copy(), this.pos.copy().add(p5.Vector.fromAngle(radians(this.angle-180)).setMag(1000)))/1000);

    const output = this.brain.guess(input);

    this.l = 0;
    if (output[0] > 0.5)
      this.l += -sqrt(abs(this.vel * 2));
    if (output[1] > 0.5)
      this.l += sqrt(abs(this.vel * 2));
    if (abs(this.vel) > 0)
      this.angle += this.l;


    //------------
    this.pos.add(p5.Vector.fromAngle(radians(this.angle - 90)).setMag(this.vel));

    this.fitness += 0.05;

  }
}
