class Ray {
  constructor(pos, angle) {
    this.pos = pos;
    this.angle = angle;
    this.dir = p5.Vector.fromAngle(angle, 1);
  }
  show() {
    stroke("rgba(100%,0%,100%,0.5)");
    push();
    translate(this.pos.x, this.pos.y);
    line(0, 0, this.dir.x, this.dir.y);

    pop();
  }
  cast(shape) {
    const x1 = shape.a.x;
    const y1 = shape.a.y;
    const x2 = shape.b.x;
    const y2 = shape.b.y;

    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den == 0) {
      return;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
    if (t > 0 && t < 1 && u > 0) {
      let pt = createVector();
      pt.x = x1 + t * (x2 - x1);
      pt.y = y1 + t * (y2 - y1);
      return pt;
    } else {
      return;
    }
  }
  //   cast2(shape, t = 0) {
  //     let temp;
  //     //to select diffrent casting methords for each shape
  //     switch (t) {
  //       case 0: //line
  //       // temp = collideLineLine(
  //       //   shape.a.x,
  //       //   shape.a.y,
  //       //   shape.b.x,
  //       //   shape.b.y,
  //       //   this.pos.x,
  //       //   this.pos.y,
  //       //   this.dir.x,
  //       //   this.dir.y,
  //       //   true
  //       // );
  //       // if (temp.x) {
  //       //   let pt = createVector();
  //       //   pt.x = temp.x;
  //       //   pt.y = temp.y;
  //       //   return pt;
  //       // } else return;

  //       case 1: //rectrangle
  //         if (true) {
  //           let f = Infinity;
  //           let marchingPoint = createVector();
  //           let shapeCenter = createVector();
  //           shapeCenter.x = shape.x;
  //           shapeCenter.y = shape.y;
  //           marchingPoint.x = this.pos.x;
  //           marchingPoint.y = this.pos.y;
  //           for (let i = 0; i < 50; i++) {
  //             let m = de(marchingPoint, shapeCenter);
  //             if (m < f) {
  //               f = m;
  //             } else {
  //               return;
  //             }
  //             if (m <= 1) {
  //               return marchingPoint;
  //             }
  //             let n =
  //               Math.sqrt(
  //                 Math.pow(marchingPoint.x - this.dir.x, 2) +
  //                   Math.pow(marchingPoint.y - this.dir.y, 2)
  //               ) - m;
  //             let x = (m * this.dir.x + n * marchingPoint.x) / (m + n);
  //             let y = (m * this.dir.y + n * marchingPoint.y) / (m + n);
  //             marchingPoint.x = x;
  //             marchingPoint.y = y;
  //           }
  //           return;
  //         }
  //         function de(point, shapeCenter) {
  //           // collition dection with squre -----
  //           const offset = p5.Vector.sub(point, shapeCenter);
  //           if (offset.x < 0) offset.x *= -1;
  //           if (offset.y < 0) offset.y *= -1;
  //           offset.sub(shape.radius, shape.radius);
  //           const dOut = offset.copy();
  //           if (dOut.x < 0) dOut.x = 0;
  //           if (dOut.y < 0) dOut.y = 0;
  //           return dOut.mag();
  //         }
  //       case 2: //circle
  //         if (
  //           lineCircle(
  //             this.pos.x,
  //             this.pos.y,
  //             this.dir.x,
  //             this.dir.y,
  //             shape.x,
  //             shape.y,
  //             shape.d
  //           )
  //         ) {
  //           //linerCircle function diffiend bellow
  //           let f = true;
  //           let marchingPoint = createVector();
  //           let shapeCenter = createVector();
  //           shapeCenter.x = shape.x;
  //           shapeCenter.y = shape.y;
  //           marchingPoint.x = this.pos.x;
  //           marchingPoint.y = this.pos.y;
  //           for (let i = 0; i < 100; i++) {
  //             let m = marchingPoint.dist(shapeCenter) - shape.d / 2;
  //             if (m <= 1) {
  //               return marchingPoint;
  //             }
  //             let n =
  //               Math.sqrt(
  //                 Math.pow(marchingPoint.x - this.dir.x, 2) +
  //                   Math.pow(marchingPoint.y - this.dir.y, 2)
  //               ) - m;
  //             let x = (m * this.dir.x + n * marchingPoint.x) / (m + n);
  //             let y = (m * this.dir.y + n * marchingPoint.y) / (m + n);
  //             marchingPoint.x = x;
  //             marchingPoint.y = y;
  //           }
  //         } else return;
  //       default:
  //         break;
  //     }
  //   }
}

// +++++++++circle collision detection++++++++++++==
// function lineCircle(x1, y1, x2, y2, cx, cy, rad) {
//   let inside1 = pointCircle(x1, y1, cx, cy, rad);
//   let inside2 = pointCircle(x2, y2, cx, cy, rad);
//   if (inside1 || inside2) return true;

//   let len = dist(x1, y1, x2, y2);

//   let dot = ((cx - x1) * (x2 - x1) + (cy - y1) * (y2 - y1)) / pow(len, 2);

//   let closestX = x1 + dot * (x2 - x1);
//   let closestY = y1 + dot * (y2 - y1);

//   let onSegment = linePoint(x1, y1, x2, y2, closestX, closestY);
//   if (!onSegment) return false;

//   let distance = dist(closestX, closestY, cx, cy);

//   if (distance <= rad / 2) {
//     return true;
//   }
//   return false;
// }

// function linePoint(x1, y1, x2, y2, px, py) {
//   let d1 = dist(px, py, x1, y1);
//   let d2 = dist(px, py, x2, y2);

//   let lineLen = dist(x1, y1, x2, y2);

//   let buffer = 0.5;

//   if (d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer) {
//     return true;
//   }
//   return false;
// }

// function pointCircle(px, py, cx, cy, size) {
//   let d = dist(px, py, cx, cy);

//   if (d <= size / 2) {
//     return true;
//   }
//   return false;
// }
