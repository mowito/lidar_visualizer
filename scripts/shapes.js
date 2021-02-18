//line-----------------------------------------------
class Boundary {
  constructor(x1, y1, x2, y2) {
    this.a = createVector(x1, y1);
    this.b = createVector(x2, y2);
  }

  show(color) {
    stroke(color);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}

class Eraser {
  constructor(d) {
    this.pos = createVector(width / 2, height / 2);
    this.d = d;
  }
  update(x, y) {
    this.pos.set(x, y);
  }

  show() {
    fill(0);
    ellipse(this.pos.x, this.pos.y, this.d);
  }
}
