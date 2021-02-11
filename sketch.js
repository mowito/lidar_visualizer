let walls = [];
let ray;
let particle;
let xoff = 0;
let yoff = 10000;
let boundarySpacing = 60;
let f = false;
let drawing = false;
let x1,x2,y1,y2;
let s;
let g=1;
let cnv;
let len = 150;
function setup() {
    cnv = createCanvas(windowWidth-300, windowHeight-130);
    cnv.mouseClicked(createwalls);
    cnv.position(280,130);
    walls.push(new Boundary(boundarySpacing, boundarySpacing, width-boundarySpacing, boundarySpacing));
    walls.push(new Boundary(width-boundarySpacing, boundarySpacing, width-boundarySpacing, height-boundarySpacing));
   walls.push(new Boundary(width-boundarySpacing, height-boundarySpacing, boundarySpacing, height-boundarySpacing));
    walls.push(new Boundary(boundarySpacing, height-boundarySpacing, boundarySpacing, boundarySpacing));
    //console.log(width);
    //console.log(height);
    
    

}
function play(){
    var elem = document.getElementById("play");
    if(elem.value=="Play"){
        f=true;
        elem.value = "Stop";
        elem.style.backgroundColor = "#CD5C5C";
    }
    else{
        f = false;
        elem.value = "Play";
        elem.style.backgroundColor = "#8FBC8F";
    }
    
}
function reset(){
    walls = [];
    f = false;
    var elem = document.getElementById("play");
    elem.value = "Play";
    elem.style.backgroundColor = "#8FBC8F";
    var e = document.getElementById("angle");
    e.value = "1";
    g = 1;
    var elem2 = document.getElementById("range");
    elem2.value = "250";
    range = 100000;
    document.getElementById("angrange").value = "360";
    drawing = false;
    walls.push(new Boundary(boundarySpacing, boundarySpacing, width-boundarySpacing, boundarySpacing));
    walls.push(new Boundary(width-boundarySpacing, boundarySpacing, width-boundarySpacing, height-boundarySpacing));
    walls.push(new Boundary(width-boundarySpacing, height-boundarySpacing, boundarySpacing, height-boundarySpacing));
    walls.push(new Boundary(boundarySpacing, height-boundarySpacing, boundarySpacing, boundarySpacing));
    
    document.getElementById("update").innerHTML= "";
    document.getElementById("lidar").value = "Choose Lidar Type";
    document.getElementById("lidar").text = "Choose Lidar Type";
}
function angle(){
    var e = document.getElementById("angle");
    g = e.value;
    
}
function createwalls(){

    if(f==false){
        
    if(drawing===false){
        x1 = mouseX;
        y1 = mouseY;
        drawing = true;
        

    }
    else{
        x2 = mouseX;
        y2 = mouseY;
        drawing = false;
        walls.push(new Boundary(x1,y1,x2,y2));
    }
}
}
function draw() {
    background(255);
    
    if(drawing==true){
        
        line(x1,y1,mouseX,mouseY);
    }
    
    
    
    for (let wall of walls) {
        wall.show();
    }
    
   
        
     
    if(f==true){
    if(document.getElementById("angle").value!=""){
    g = parseFloat(document.getElementById("angle").value);
    }
    particle = new Particle(g);
    particle.update(mouseX, mouseY);
    particle.show();
    particle.look(walls);
    }
    textSize(15);
    fill(50);
    if(document.getElementById("breadth").value!=""){
    breadth = parseInt(document.getElementById("breadth").value);
    }
    len = (235/500)*breadth;
    text(len+"m",width-boundarySpacing+10,boundarySpacing);
    text(len/2+"m",width-boundarySpacing+10,(height-boundarySpacing)/2)
    text("0m",width-boundarySpacing+10,(height-boundarySpacing));
    textSize(13);
    text(len/4+"m",width-boundarySpacing+10,(height-boundarySpacing)*(3/4));
    text(len*3/4 + "m",width-boundarySpacing+10,(height-boundarySpacing)/4);
    textSize(15);
    text(breadth/4 + "m",(width-boundarySpacing)*(3/4),height-boundarySpacing+20);
    text(breadth/2+"m",(width-boundarySpacing)/2,height-boundarySpacing+20);
    text(breadth*3/4+"m",(width-boundarySpacing)/4,height-boundarySpacing+20);
    text(breadth+"m",boundarySpacing,height-boundarySpacing+20);
    stroke(0);
    textSize(30);
    text("-",width-boundarySpacing-5,((height-boundarySpacing)*(250-15.625))/250);
    text("-",width-boundarySpacing-5,((height-boundarySpacing)*(250-2*15.625))/250);
    text("-",width-boundarySpacing-5,((height-boundarySpacing)*(250-3*15.625))/250);
    text("-",width-boundarySpacing-5,((height-boundarySpacing)*(250-5*15.625))/250);
    text("-",width-boundarySpacing-5,((height-boundarySpacing)*(250-6*15.625))/250);
    text("-",width-boundarySpacing-5,((height-boundarySpacing)*(250-7*15.625))/250);
    text("-",width-boundarySpacing-5,((height-boundarySpacing)*(250-9*15.625))/250);
    text("-",width-boundarySpacing-5,((height-boundarySpacing)*(250-10*15.625))/250);
    text("-",width-boundarySpacing-5,((height-boundarySpacing)*(250-11*15.625))/250);
    text("-",width-boundarySpacing-5,((height-boundarySpacing)*(250-13*15.625))/250);
    text("-",width-boundarySpacing-5,((height-boundarySpacing)*(250-14*15.625))/250);
    
    textSize(20);
    text("|",(width-boundarySpacing)*19/20,height-boundarySpacing+10);
    text("|",(width-boundarySpacing)*18/20,height-boundarySpacing+10);
    text("|",(width-boundarySpacing)*17/20,height-boundarySpacing+10);
    text("|",(width-boundarySpacing)*16/20,height-boundarySpacing+10);
    text("|",(width-boundarySpacing)*14/20,height-boundarySpacing+10);
    text("|",(width-boundarySpacing)*13/20,height-boundarySpacing+10);
    text("|",(width-boundarySpacing)*12/20,height-boundarySpacing+10);
    text("|",(width-boundarySpacing)*11/20,height-boundarySpacing+10);
    text("|",(width-boundarySpacing)*9/20,height-boundarySpacing+10);
    text("|",(width-boundarySpacing)*8/20,height-boundarySpacing+10);
    text("|",(width-boundarySpacing)*7/20,height-boundarySpacing+10);
    text("|",(width-boundarySpacing)*6/20,height-boundarySpacing+10);
    text("|",(width-boundarySpacing)*4/20,height-boundarySpacing+10);
    text("|",(width-boundarySpacing)*3/20,height-boundarySpacing+10);
    text("|",(width-boundarySpacing)*2/20,height-boundarySpacing+10);
    text("|",(width-boundarySpacing)*1/20,height-boundarySpacing+10);
    
        
    
    
        
    


    //xoff += 0.01;
    //yoff += 0.01;
}
