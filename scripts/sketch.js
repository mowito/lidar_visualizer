const canvesdiv = document.querySelector('.canvesCard');

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

let mazerLines = 15; // the lines for the x and y axis scale

function setup() {
    // cnv = createCanvas(windowWidth-300, windowHeight-130);
    cnv = createCanvas(canvesdiv.offsetWidth, canvesdiv.offsetWidth*(9/16)); // seting the canves to 16:9 depending on the avlibel width
    // Parent div for ccanves ----------------
    cnv.parent(canvesdiv);
    cnv.mouseClicked(createwalls);
    // cnv.position(280,130);
    // cnv.position(350,130);
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
        
        var isinside = boundarySpacing<mouseX && mouseX<width-boundarySpacing && mouseY>boundarySpacing && mouseY<height-boundarySpacing
        if(isinside){
            walls.push(new Boundary(x1,y1,x2,y2));
        }
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
    textSize(12);
    fill(50);
    if(document.getElementById("breadth").value!=""){
        breadth = parseInt(document.getElementById("breadth").value);
    }
    len = (235/500)*breadth;

    //drawing markers the better way
    let spacing = ((width-boundarySpacing*2)/20);
    for (let index = 0; index < 20; index++) {
        if(index%2!==0)
        line(width-boundarySpacing-index*spacing,height-boundarySpacing,width-boundarySpacing-index*spacing,height-boundarySpacing+mazerLines);
        else
        line(width-boundarySpacing-index*spacing,height-boundarySpacing,width-boundarySpacing-index*spacing,height-boundarySpacing+mazerLines-8);
        if(index%2!==0)
        text(((breadth/20)*index)+"m",width-boundarySpacing-index*spacing,height-boundarySpacing+25);
        
        if(index<=10){

            if(index%2!==0)
            line(width-boundarySpacing,height-boundarySpacing-index*spacing,width-boundarySpacing+mazerLines,height-boundarySpacing-index*spacing);
            else
            line(width-boundarySpacing,height-boundarySpacing-index*spacing,width-boundarySpacing+mazerLines-8,height-boundarySpacing-index*spacing);
            if(index%2!==0)
            text(((breadth/20)*index)+"m",width-boundarySpacing+5,height-boundarySpacing-index*spacing);
        }
    }
}
