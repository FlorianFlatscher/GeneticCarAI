class Driver {
  constructor() {

    this.width = carp.width;
    this.length = carp.height;
    this.pos = createVector(100, height / 2 + this.length / 2);
    this.vel = 0;
    this.acc = 0;
    this.angle = 0;
    this.l = 0;
  }



  show() {
    push();
    translate(this.pos.x, this.pos.y);
    angleMode(DEGREES);
    rotate(this.angle)
    noStroke();
    fill(255);
    imageMode(CENTER);
    if (this.acc >= 0)
      image(carp, 0, 0);
    else {
      image(carrp, 0, 0);
    }
      pop();


  }

  update() {
    //Bescleunigen
    this.acc = 0;
    if (acc) {
      this.acc = 0.2;
    }
    if (this.vel > 0 && br) {
      this.acc = -0.2;
    }




    //Limit
    this.vel += this.acc;
    if (this.vel > 5)
      this.vel = 5;

    //Friction
    if (this.vel > 0)
      this.vel -= 0.02;
    else if (this.vel < 0)
      this.vel += 0.02
    if (abs(this.vel) < 0.05) {
      this.vel = 0;
    }

    //Lenken
    // if (left || right) {
    //   if (left) {
    //     this.l -= this.vel * 0.1;
    //   }
    //   if (right) {
    //     this.l += this.vel * 0.1;
    //   }
    //   if (this.l > this.vel * 0.5)
    //     this.l = this.vel * 0.5;
    //   if (this.l < this.vel * -0.5)
    //     this.l = this.vel * -0.5;
    //
    // } else {
    //   if (abs(this.l) > 0.1) {
    //     if (this.l > 0) {
    //       this.l -= 0.1;
    //     } else {
    //       this.l += 0.1;
    //     }
    //   } else {
    //
    //   }
    // }
    this.l = 0;
    if (left)
      this.l += -sqrt(abs(this.vel * 2));
    if (right)
      this.l += sqrt(abs(this.vel * 2));
    if (abs(this.vel) > 0)
      this.angle += this.l;


    //------------
    this.pos.add(p5.Vector.fromAngle(radians(this.angle - 90)).setMag(this.vel));


  }
}
