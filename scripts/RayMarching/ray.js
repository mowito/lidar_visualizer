class Ray {
    constructor(x, y, angle) {
      this.pos = createVector(x, y);
      this.angle = angle;
    }
  
    rotate(offset) {
      this.angle += offset;
    }
  
    march(stuff) {
      let current = this.pos.copy();
      let closest = null;
      while (true) {
        let record = Infinity;
        closest = null;
        for (let circle of stuff) {
          let d = signedDistance(current, circle.pos, circle.r);
          if (d < record) {
            record = d;
            closest = circle;
          }
        }
  
        if (record < 1) {
          // glow.push(current);
          break;
        }
        const v = p5.Vector.fromAngle(this.angle);
        v.setMag(record);
  
        strokeWeight(1);
        push();
        stroke(255, 0, 200);
        noFill();
        translate(current.x, current.y);
        ellipse(0, 0, record * 2);
        pop();
        current.add(v);
  
        if (offScreen(current)) {
          closest = null;
          break;
        }
      }
      if (closest) {
        closest.highlight();
      }
      stroke(0, 0, 255);
      strokeWeight(4);
      line(this.pos.x, this.pos.y, current.x, current.y);
      fill(0, 255, 0);
      ellipse(this.pos.x, this.pos.y, 16);
      ellipse(current.x, current.y, 16);
      //this.show(record);
    }
  
    // show(radius) {
    //   push();
    //   stroke(255, 0, 200);
    //   noFill();
    //   translate(this.pos.x, this.pos.y);
    //   const v = p5.Vector.fromAngle(this.angle);
    //   v.setMag(radius);
    //   pop();
    // }
  }
  
  function offScreen(v) {
    return v.x < 0 || v.x > width || v.y < 0 || v.y > height;
  }
  