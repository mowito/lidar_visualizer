let range = 10000;
function rangeofrays(){
    var elem = document.getElementById("range");
    range = parseInt(elem.value);
    if(range<=0){
        range = 10000;
        elem.value = "";
    }

}

class Particle {
    constructor(getangle) {
        this.pos = createVector(width / 2, height / 2);
        this.rays = [];
        this.getangle = getangle;
        var x = parseInt(this.getangle);
        if(x<=0){
            x = 1;
            var e = document.getElementById("angle");
            e.value = "1";
        }
        for (let a = 0; a < 360; a += x) {
            this.rays.push(new Ray(this.pos, radians(a)));
        }
    }

    update(x, y) {
        this.pos.set(x, y);
    }

    look(walls) {
        
        for (let i = 0; i < this.rays.length; i++) {
            
            const ray = this.rays[i];
            let closest = null;
            let record = Infinity;
            var length = ((width-2*boundarySpacing)/500)*range;
            var vec = p5.Vector.fromAngle(ray.angle,length);

            for (let wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    const d = p5.Vector.dist(this.pos, pt);
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
    
                }
            }
            let pos1 = this.pos.x+vec.x;
            let pos2 = this.pos.y + vec.y;
            let p = createVector();
            p.x = pos1;
            p.y = pos2;
            const d1 = p5.Vector.dist(this.pos,p);
            if (d1>record) {
                // colorMode(HSB);
                // stroke((i + frameCount * 2) % 360, 255, 255, 50);
                stroke(255,90);
                line(this.pos.x, this.pos.y, closest.x, closest.y);
            }
            else if(d1<=record){
                stroke(255,90);
                line(this.pos.x,this.pos.y,p.x,p.y);
            }
            
        
        }
        
    }

    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 4);
        for (let ray of this.rays) {
            ray.show();
        }
    }
}