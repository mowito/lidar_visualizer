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
                temp =collideLineRect(shape.x1, shape.y1, shape.x2, shape.y2,this.pos.x, this.pos.y, this.dir.x, this.dir.y,true);
                if(temp.left.x){
                    let pt=createVector();
                    pt.x=temp.left.x;
                    pt.y=temp.left.y;
                    return pt;
                }else if(temp.right.x){
                    let pt=createVector();
                    pt.x=temp.right.x;
                    pt.y=temp.right.y;
                    return pt;
                }else if(temp.top.x){
                    let pt=createVector();
                    pt.x=temp.top.x;
                    pt.y=temp.top.y;
                    return pt;
                }else if(temp.bottom.x){
                    let pt=createVector();
                    pt.x=temp.bottom.x;
                    pt.y=temp.bottom.y;
                    return pt;
                }else
                return;
            case 2:
                temp =collideLineCircle(this.pos.x, this.pos.y, this.dir.x, this.dir.y,true,shape.x, shape.y, shape.d); //shape.a.x, shape.a.y, shape.b.x, shape.b.y,
                if(temp.x){
                    let pt=createVector();
                    pt.x=temp.x;
                    pt.y=temp.y;
                    return pt;
                }else
                return;
        
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