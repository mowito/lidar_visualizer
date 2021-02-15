const canvesdiv = document.querySelector('.canvesCard');

let opsts=[];
let partical;

function setup(){
    const canves=createCanvas(canvesdiv.offsetWidth, canvesdiv.offsetWidth*(9/16));
    canves.parent(canvesdiv);

    partical= new Partical(100,200);
    opsts.push(new Line(300,100,300,300));
    // opsts.push(new Line(400,100,400,300));
}

function draw(){
    background(255);
    opsts.forEach(opst => {
        opst.show();
        
    });

    partical.show();
    opsts.forEach(opst => {
        partical.look(opst);
        
    });
    // ray.show();

    // pt=ray.cast(opst);
    // if(pt){
    //     fill(0);
    //     ellipse(pt.x,pt.y,5,5);
    // }
}