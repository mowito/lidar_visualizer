class Boundary {
    constructor(x, y, r) {
      this.pos = createVector(x, y);
      this.vel = p5.Vector.random2D();
      this.r = r;
    }
  
    update() {
      this.pos.add(this.vel);
      if (this.pos.x < this.r || this.pos.x > width - this.r) {
        this.vel.x *= -1;
      }
      if (this.pos.y < this.r || this.pos.y > height - this.r) {
        this.vel.y *= -1;
      }
    }
  
    highlight() {
      strokeWeight(4);
      fill(0, 100, 255, 100);
      stroke(255);
      ellipse(this.pos.x, this.pos.y, this.r * 2);
    }
  
    show() {
      noFill();
      strokeWeight(1);
      stroke(255);
      ellipse(this.pos.x, this.pos.y, this.r * 2);
    }
  }
  