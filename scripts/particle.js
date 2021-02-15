let range = 10000;
let breadth = 250;
function rangeofrays(){
    var elem = document.getElementById("range");
    range = parseInt(elem.value);
    if(range<0){
        range = 10000;
        elem.value = "";
    }

}
function angularrange(){
    var elem = document.getElementById("angrange");
    angularrange = parseInt(elem.value);
}
class Particle {
    constructor(getangle) {
        this.pos = createVector(width / 2, height / 2);
        this.rays = [];
        this.getangle = getangle;
        //var x = parseFloat(this.getangle);
        if(this.getangle<0){
            this.getangle = 1;
            document.getElementById("angle").value = "1";
        }
        var y;
       if(document.getElementById("angrange").value!=""){
        y = parseInt(document.getElementById("angrange").value);
       }
       else{
           y = 360; 
       }
        if(this.getangle!=0){
        for (let a = 0; a < y; a += this.getangle) {
            this.rays.push(new Ray(this.pos, radians(a)));
        }
        
    }
    }
        
          


    update(x, y) {
        this.pos.set(x, y);
    }

    look(t,walls,rects,circles) {
        
        for (let i = 0; i < this.rays.length; i++) {
            
            const ray = this.rays[i];
            let closest = null;
            let record = Infinity;
            if(document.getElementById("range").value!=""){
            range = parseInt(document.getElementById("range").value);
            }
            if(document.getElementById("breadth").value != ""){
                breadth = parseInt(document.getElementById("breadth").value);
            }
            var length = ((width-2*boundarySpacing)/breadth)*range;
            var vec = p5.Vector.fromAngle(ray.angle,length);

            for (let wall of walls) {
                const pt = ray.cast2(0,wall);
                if (pt) {
                    const d = p5.Vector.dist(this.pos, pt);
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
    
                }
            }
            //new code--------------------
            for (let wall of rects) {
                const pt = ray.cast2(1,wall);
                if (pt) {
                    const d = p5.Vector.dist(this.pos, pt);
                    if (d < record) {
                        console.log(d);
                        record = d;
                        closest = pt;
                    }
    
                }
            }
            for (let wall of circles) {
                const pt = ray.cast2(2,wall);
                if (pt) {
                    const d = p5.Vector.dist(this.pos, pt);
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
    
                }
            }
            //new code--------------------end
            let pos1 = this.pos.x+vec.x;
            let pos2 = this.pos.y + vec.y;
            let p = createVector();
            p.x = pos1;
            p.y = pos2;
            const d1 = p5.Vector.dist(this.pos,p);
            if (d1>record) {
                // colorMode(HSB);
                // stroke((i + frameCount * 2) % 360, 255, 255, 50);
                stroke(color(0, 0, 255));
                line(this.pos.x, this.pos.y, closest.x, closest.y);
            }
            else if(d1<=record){
                stroke(color(0, 0, 255));
                line(this.pos.x,this.pos.y,p.x,p.y);
            }
            
        
        }
        
    }

    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 4);
        // for (let ray of this.rays) {
        //     ray.show();
        // }
    }
}