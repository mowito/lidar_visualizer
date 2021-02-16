class Ray {
    constructor(pos, angle) {
        this.pos = pos;
        this.angle = angle;
        this.dir = p5.Vector.fromAngle(angle,1000);
        
    }
    show() {
        stroke('rgba(100%,0%,100%,0.5)');
        push();
        translate(this.pos.x, this.pos.y);
        line(0, 0, this.dir.x , this.dir.y );

        pop();
    }

    cast2(t,shape){
        let temp;
        switch (t) {
            case 0:
                temp =collideLineLine(shape.a.x, shape.a.y, shape.b.x, shape.b.y,this.pos.x, this.pos.y, this.dir.x, this.dir.y,true);
                if(temp.x){
                    let pt=createVector();
                    pt.x=temp.x;
                    pt.y=temp.y;
                    return pt;
                }else
                return;

            case 1:
                //||temp.right.x||temp.top.x||temp.bottom.x
                // if(lineCircle(this.pos.x, this.pos.y, this.dir.x, this.dir.y,shape.x, shape.y, shape.radius*2*Math.sqrt(2))){
                if(true){
                    // console.log(shape);
                    let f=Infinity;
                    let tpount=createVector();
                    let cpount=createVector();
                    cpount.x=shape.x;
                    cpount.y=shape.y;
                    tpount.x=this.pos.x;
                    tpount.y=this.pos.y;
                    for(let i=0;i<50;i++) {
                        let m=de(tpount,cpount);
                        if(m<f){
                            f=m;
                        }else{
                            return;
                        }
                        // let m=tpount.dist(cpount)-shape.radius;
                        // console.log(m);
                        if(m<=1){
                            return tpount;
                        }
                        let n= (Math.sqrt(Math.pow(tpount.x-this.dir.x,2)+Math.pow(tpount.y-this.dir.y,2)))-m;
                        let x = (m*this.dir.x + n*tpount.x)/(m + n);
                        let y = (m*this.dir.y + n*tpount.y)/(m + n);
                        tpount.x=x;
                        tpount.y=y;
                    }
                    return;
                }
                function de(point,cpount) {
                    const offset = p5.Vector.sub(point,cpount);
                    // console.log(offset);
                    if (offset.x < 0) offset.x *= -1;
                    if (offset.y < 0) offset.y *= -1;
                    offset.sub(shape.radius, shape.radius);
                    const dOut = offset.copy();
                    if (dOut.x < 0) dOut.x = 0;
                    if (dOut.y < 0) dOut.y = 0;
                    return dOut.mag();
                  }
            case 2:
                // function de(point) {
                //     return this.pos.dist(point) - shape.d/2;
                // }
                if(lineCircle(this.pos.x, this.pos.y, this.dir.x, this.dir.y,shape.x, shape.y, shape.d)){
                    // console.log(shape);
                    let f=true;
                    let tpount=createVector();
                    let cpount=createVector();
                    cpount.x=shape.x;
                    cpount.y=shape.y;
                    tpount.x=this.pos.x;
                    tpount.y=this.pos.y;
                    for(let i=0;i<100;i++) {
                        let m=tpount.dist(cpount)-shape.d/2;
                        if(m<=1){
                            return tpount;
                        }
                        let n= (Math.sqrt(Math.pow(tpount.x-this.dir.x,2)+Math.pow(tpount.y-this.dir.y,2)))-m;
                        let x = (m*this.dir.x + n*tpount.x)/(m + n);
                        let y = (m*this.dir.y + n*tpount.y)/(m + n);
                        tpount.x=x;
                        tpount.y=y;
                    }
                    // return tpount;
                }else
                return;
                
                 
                // let n=shape.d/2;
                // let m= (Math.sqrt(Math.pow(this.pos.x-shape.x,2)+Math.pow(this.pos.y-shape.y,2)))-n;

                // let x = (m*shape.x + n*this.pos.x)/(m + n);
                // let y = (m*shape.y + n*this.pos.y)/(m + n);


                // temp =collideLineCircle(this.pos.x, this.pos.y, this.dir.x, this.dir.y,true,shape.x, shape.y, shape.d); //shape.a.x, shape.a.y, shape.b.x, shape.b.y,
                // if(temp.x){
                //     let pt=createVector();
                //     pt.x=temp.x;
                //     pt.y=temp.y;
                //     return pt;
                // }else
                // return;

                
                // if(lineCircle(this.pos.x, this.pos.y, this.dir.x, this.dir.y,shape.x, shape.y, shape.d)){
                //     return this.pos;
                // }
                // else
                //     return;
        
            default:
                break;
        }
    }


    cast(temp,wall) {
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;

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
            const pt = createVector();
            pt.x = x1 + t * (x2 - x1);
            pt.y = y1 + t * (y2 - y1);
            return pt;
        } else {
            return;
        }
    }
}

    // lookAt(x, y) {
    //     this.dir.x = x - this.pos.x;
    //     this.dir.y = y - this.pos.y;
    //     this.dir.normalize();
    // 
// +++++++++circle collision detection++++++++++++==
function lineCircle(x1, y1, x2, y2, cx, cy, rad) {
    let inside1 = pointCircle(x1, y1, cx, cy, rad);
    let inside2 = pointCircle(x2, y2, cx, cy, rad);
    if (inside1 || inside2) return true;
  
    let len = dist(x1, y1, x2, y2);
  
    let dot = (((cx - x1) * (x2 - x1)) + ((cy - y1) * (y2 - y1))) / pow(len, 2);
  
    let closestX = x1 + (dot * (x2 - x1));
    let closestY = y1 + (dot * (y2 - y1));
    
    let onSegment = linePoint(x1,y1,x2,y2, closestX,closestY);
    if (!onSegment) return false;
    
    let distance = dist(closestX, closestY, cx, cy);
    
     if (distance <= rad/2) {
      return true;
    }
    return false;
  }
  
  function linePoint(x1, y1, x2, y2, px, py) {
    let d1 = dist(px, py, x1, y1);
    let d2 = dist(px, py, x2, y2);
  
    let lineLen = dist(x1, y1, x2, y2);
  
    let buffer = 0.5;
  
    if (d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer) {
      return true;
    }
    return false;
  
  }
  
  function pointCircle(px, py, cx, cy,size) {
    let d = dist(px, py, cx, cy);
  
    if (d <= size / 2) {
      return true;
    }
    return false;
  }