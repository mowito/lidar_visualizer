class Shape {
    constructor(x, y, radius,b=0) {
      this.pos = createVector(x, y);
      this.radius = radius;
      this.b=b;
    }
  }
  
  class Circle extends Shape {
    render() {
      noStroke();
      fill(102);
      circle(this.pos.x, this.pos.y, this.radius*2);
    }
    
    de(point) {
      return this.pos.dist(point) - this.radius;
    }
  }
  
  class Square extends Shape {
    render() {
      noStroke();
      fill(102);
      square(this.pos.x - this.radius, this.pos.y - this.radius, this.radius*2);
    }
    
    de(point) {
      const offset = p5.Vector.sub(point, this.pos);
      if (offset.x < 0) offset.x *= -1;
      if (offset.y < 0) offset.y *= -1;
      offset.sub(this.radius, this.radius);
      const dOut = offset.copy();
      if (dOut.x < 0) dOut.x = 0;
      if (dOut.y < 0) dOut.y = 0;
      return dOut.mag();
    }
  }
  class Line extends Shape {
    render() {
      noStroke();
      stroke(102);
      line(this.pos.x, this.pos.y, this.radius,this.b);
    }
    
    de(point) {
      return Infinity;
    }
  }