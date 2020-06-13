class Wall {
  constructor(x, y, w, h) {
    if(w < 0){
      w= abs(w);
      x = x - w;
    }
    if(h < 0){
      h = abs(h);
      y = y - h;
    }
    this.pos = createVector(x, y);
    this.w = w;
    this.h = h;
  }

  show() {
    noStroke();
    fill(30);
    rect(this.pos.x, this.pos.y, this.w, this.h);

  }

  intersects(p) {
    return p.x > this.pos.x && p.x < this.pos.x + this.w && p.y > this.pos.y && p.y < this.pos.y + this.h
  }
}
