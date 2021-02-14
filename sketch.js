let walls = [];
let ray;
let particle;
let xoff = 0;
let yoff = 10000;
// let boundarySpacing = 60;
let boundarySpacing = 50 ;
let f = false;
let drawing = false;
let x1,x2,y1,y2;
let s;
let g=1;
let cnv;
let len = 150;

function setup() {
    // cnv = createCanvas(windowWidth-300, windowHeight-130);
    cnv = createCanvas(windowWidth-380, windowHeight-130);
    cnv.mouseClicked(createwalls);
    // cnv.position(280,130);
    cnv.position(350,130);
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
    let start = millis();

    // Do the stuff that you want to time
    random(0, 100);
    
    let end = millis();
    let elapsed = end - start;
    console.log("This took: " + elapsed + "ms.")
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
    if(boundarySpacing<mouseX && mouseX<width-boundarySpacing && mouseY>boundarySpacing && mouseY<height-boundarySpacing){
    particle.update(mouseX, mouseY);
    particle.show();
    particle.look(walls);
    }
    }
    textSize(15);
    fill(50);
    if(document.getElementById("breadth").value!=""){
    breadth = parseInt(document.getElementById("breadth").value);
    }
    
    textSize(15);
    text(0 + "m",(width-boundarySpacing),height-boundarySpacing+20);
    text(breadth/4 + "m",(width-boundarySpacing)*(3/4),height-boundarySpacing+20);
    text(breadth/2+"m",(width-boundarySpacing)/2,height-boundarySpacing+20);
    text(breadth*3/4+"m",(width-boundarySpacing)/4,height-boundarySpacing+20);
    text(breadth+"m",boundarySpacing,height-boundarySpacing+20);
    stroke(0);

   
    
    
    var i;
    for(i=1;i<20;i++){
    textSize(20);
    text("|",(width-boundarySpacing)*i/20,height-boundarySpacing+10);
    
    }
        
    
    
        
    


    //xoff += 0.01;
    //yoff += 0.01;
}
