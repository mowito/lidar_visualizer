class Ray{
    constructor(pos,angle){
        this.pos=pos;
        this.dir=p5.Vector.fromAngle(angle,1000);
    }

    show(){
        stroke(10,34);
        push();
        translate(this.pos.x,this.pos.y);
        line(0,0,this.dir.x,this.dir.y);
        pop();
    }

    cast(opst){
        let temp =collideLineLine(opst.x1, opst.y1, opst.x2, opst.y2,this.pos.x, this.pos.y, this.dir.x, this.dir.y,true);
        if(temp.x){
            let pt=createVector();
            pt.x=temp.x;
            pt.y=temp.y;
            return pt;
        }else
        return;
        
    }
}