const canvesdiv = document.querySelector('.canvesCard');

const topBar = 20;

const shapes = [];
let eye;

let mode = "nothing";
let centerPt;
let endPt;
let radius = 0;
let angle = -Math.PI / 6;
let iters = 0;
let doRotate = false;
let doDoRotate = false;
let topBarImg;
let x = 0;

function setup() {
  // createCanvas(360, 360 + topBar);
  const canves=createCanvas(canvesdiv.offsetWidth, canvesdiv.offsetWidth*(9/16));
  canves.parent(canvesdiv);
  eye = createVector(random(width), random(topBar, height));
  centerPt = createVector();
  endPt = createVector();
  // topBarImg = createImage(60, 1);
}

function keyPressed() {
  let changedMode = false;
  
  if (key == "c") {
    mode = "circle";
    changedMode = true;
  } else if (key == "s") {
    mode = "square";
    changedMode = true;
  } else if (key == "l") {
    mode = "line";
    changedMode = true;
  } else if (key == "m") {
    iters++;
  }
  
  if (doRotate) {
    doDoRotate = true;
  }
  
  if (changedMode) {
    radius = 0;
  }
}

function mousePressed() {
  centerPt.set(createVector(mouseX, mouseY));
  endPt.set(createVector(mouseX, mouseY));
  radius = 0;
}

function mouseDragged() {
  if (mode == "nothing") {
    eye.set(mouseX, mouseY);
  } else {
    radius = dist(centerPt.x, centerPt.y, mouseX, mouseY);
    endPt.set(createVector(mouseX, mouseY));
  }
}

function mouseReleased() {
  if (mode == "circle") {
    shapes.push(new Circle(centerPt.x, centerPt.y, radius));
  } else if (mode == "square") {
    shapes.push(new Square(centerPt.x, centerPt.y, radius));
  } else if(mode == "line"){
    shapes.push(new Line(centerPt.x, centerPt.y, endPt.x,endPt.y));
  }
  mode = "nothing";
}

function sceneDistance() {
  let record = Infinity;
  for (const s of shapes) {
    const de = s.de(eye);
    record = min(record, de);
  }
  return record;
}

function draw() {
  background(220);
  
  for (const s of shapes) {
    s.render();
  }
  
  noStroke();
  fill(102);
  if (mode == "circle") {
    circle(centerPt.x, centerPt.y, radius*2);
  } else if (mode == "square") {
    square(centerPt.x - radius, centerPt.y - radius, radius*2);
  } else if(mode == "line"){
    stroke(102);
    line(centerPt.x,centerPt.y, endPt.x,endPt.y);
  }
  
  noStroke();
  fill(255, 0, 102);
  circle(eye.x, eye.y, 8);
  const eyeCopy = eye.copy();
  let d = sceneDistance();
  let rayLen;
  for (let i = 0; doRotate ? (d > 1 && i < 200) : (i < iters); i++) {
    d = sceneDistance();
    // if (d < 1) {
    //   doRotate = true;
    //   break;
    // }
    stroke(255, 0, 102);
    noFill();
    circle(eye.x, eye.y, d*2);
    const dir = createVector(d, 0);
    dir.rotate(angle);
    eye.add(dir);
    noStroke();
    fill(255, 0, 102);
    circle(eye.x, eye.y, 8);
  }
  if (d >= 1) {
    rayLen = Infinity;
  } else {
    rayLen = p5.Vector.dist(eye, eyeCopy);
  }
  stroke(255, 0, 102);
  noFill();
  line(eye.x, eye.y, eyeCopy.x, eyeCopy.y);
  eye.set(eyeCopy);
  
  // if (doDoRotate && angle < PI/6) {
  //   angle += PI / 180;
  //   x++;
  // }
  // if (doRotate && rayLen != Infinity) {
  //   topBarImg.loadPixels();
  //   topBarImg.pixels[x*4 + 0] = 255 / ((rayLen / 100) + 1);
  //   topBarImg.pixels[x*4 + 1] = topBarImg.pixels[x*4 + 0];
  //   topBarImg.pixels[x*4 + 2] = topBarImg.pixels[x*4 + 0];
  //   topBarImg.pixels[x*4 + 3] = 255;
  //   topBarImg.updatePixels();
  // }
  
  // noStroke();
  // fill(175);
  // rect(0, 0, width, topBar);
  // image(topBarImg, 0, 0, width, topBar);
}