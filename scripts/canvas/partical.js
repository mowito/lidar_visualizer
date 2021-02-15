class Partical{
    constructor(x,y){
        this.pos=createVector(x,y);
        this.rays=[];
        for (let index = 0; index <360; index++) {
            this.rays[index]=new Ray(this.pos,radians(index));
        }
    }

    show(){
        fill(0);
        ellipse(this.pos.x,this.pos.y,8,8);
        this.rays.forEach(ray => {
            ray.show();
        });
    }

    look(opst){
        this.rays.forEach(ray => {
            const pt=ray.cast(opst);
            if(pt){
                stroke(0);
                line(this.pos.x,this.pos.y,pt.x,pt.y);
            }
        });
    }
}