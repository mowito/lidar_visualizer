class Boundary {
    constructor(x1, y1, x2, y2) {
        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);
    }

    show() {
        stroke(0);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}

class Rectrangle{
    constructor(x, y, d){
        this.x=x;
        this.y=y;
        this.radius=d;
    }

    show(){
        square(this.x - this.radius, this.y - this.radius, this.radius*2);
    }
}
class Circle{
    constructor(x,y,d){
        this.x=x;
        this.y=y;
        this.d=d;
    }

    show(){
        circle(this.x,this.y,this.d)
    }
}