let range = 10000;
let breadth = 250;

function rangeofrays() {
  var elem = document.getElementById("range");
  range = parseInt(elem.value);
  if (range < 0) {
    range = 10000;
    elem.value = "";
  }
}
function angularrange() {
  var elem = document.getElementById("angrange");
  angularrange = parseInt(elem.value);
}

//--------------------------------------------------------------------------
class Particle {
  constructor(getangle) {
    this.pos = createVector(width / 2, height / 2);
    this.rays = [];
    this.getangle = getangle;
    if (this.getangle < 0) {
      this.getangle = 1;
      document.getElementById("angle").value = "1";
    }
    var y;
    if (document.getElementById("angrange").value != "") {
      y = parseInt(document.getElementById("angrange").value);
    } else {
      y = 360;
    }
    if (this.getangle != 0) {
      for (let a = 0; a < y; a += this.getangle) {
        this.rays.push(new Ray(this.pos, radians(a)));
      }
    }
  }

  update(x, y) {
    this.pos.set(x, y);
  }

  // look(t,walls,rects,circles) { old
  look(walls) {
    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i];
      let closest = null;
      let record = Infinity;
      if (document.getElementById("range").value != "") {
        range = parseInt(document.getElementById("range").value);
      }
      if (document.getElementById("breadth").value != "") {
        breadth = parseInt(document.getElementById("breadth").value);
      }
      var length = ((width - 2 * boundarySpacing) / breadth) * range;
      var vec = p5.Vector.fromAngle(ray.angle, length);

      let pt = createVector();

      //for all lines --------------
      for (let wall of walls) {
        pt = ray.cast(wall);
        if (pt) {
          const d = p5.Vector.dist(this.pos, pt);
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }

      //for all squares --------------
      // for (let wall of rects) {
      //     pt = ray.cast(1,wall);
      //     if (pt) {
      //         const d = this.pos.dist(pt);
      //         if (d < record) {
      //             record = d;
      //             closest = pt;
      //         }

      //     }
      // }

      // //for all circles --------------
      // for (let wall of circles) {
      //     pt = ray.cast(2,wall);
      //     if (pt) {
      //         const d = this.pos.dist(pt);
      //         if (d < record) {
      //             record = d;
      //             closest = pt;
      //         }

      //     }
      // }

      if (length >= record) {
        stroke(color(0, 0, 255));
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      } else {
        stroke(color(0, 0, 255));
        // using the dividng the line in ratio equaction to get cords of ray for a smaller range
        let m = length;
        let n =
          Math.sqrt(
            Math.pow(this.pos.x - closest.x, 2) +
              Math.pow(this.pos.y - closest.y, 2)
          ) - m;

        let x = (m * closest.x + n * this.pos.x) / (m + n);
        let y = (m * closest.y + n * this.pos.y) / (m + n);
        line(this.pos.x, this.pos.y, x, y);
      }
    }
  }

  show() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, 4);
  }
}
