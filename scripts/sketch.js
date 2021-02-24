const canvesdiv = document.querySelector(".canvesCard");

let walls = [];
let frame = [];
let ray;
let particle;
let eraser;
let toerase;
let eraserSize = 10;
let xoff = 0;
let yoff = 10000;
let boundarySpacing = 50;
let f = false;
let drawingline = false;
let x1, x2, y1, y2;
let s;
let g = 1;
let cnv;
let len = 150;
let mazerLines = 15; // the lines for the x and y axis scale

let tool = 0;

function setup() {
  cnv = createCanvas(canvesdiv.offsetWidth, canvesdiv.offsetWidth * (9 / 16)); // seting the canves to 16:9 depending on the avlibel width
  // Parent div for canves ----------------
  cnv.parent(canvesdiv);
  cnv.mouseClicked(toolfunction);
  walls.push(
    new Boundary(
      boundarySpacing,
      boundarySpacing,
      width - boundarySpacing,
      boundarySpacing
    )
  );
  walls.push(
    new Boundary(
      width - boundarySpacing,
      boundarySpacing,
      width - boundarySpacing,
      height - boundarySpacing
    )
  );
  walls.push(
    new Boundary(
      width - boundarySpacing,
      height - boundarySpacing,
      boundarySpacing,
      height - boundarySpacing
    )
  );
  walls.push(
    new Boundary(
      boundarySpacing,
      height - boundarySpacing,
      boundarySpacing,
      boundarySpacing
    )
  );
  frame = walls;
}

// To switch betwin shapes--------------------------
function toolfunction() {
  switch (tool) {
    case 0:
      createwalls();
      break;
    case 1:
      createrect();
      break;
    case 2:
      useeraser();
      break;

    default:
      break;
  }
}

function play() {
  var elem = document.getElementById("play");
  if (elem.value == "Play") {
    f = true;
    elem.value = "Stop";
    elem.style.backgroundColor = "#CD5C5C";
  } else {
    f = false;
    elem.value = "Play";
    elem.style.backgroundColor = "#8FBC8F";
  }
}
function reset() {
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
  drawingline = false;
  walls.push(
    new Boundary(
      boundarySpacing,
      boundarySpacing,
      width - boundarySpacing,
      boundarySpacing
    )
  );
  walls.push(
    new Boundary(
      width - boundarySpacing,
      boundarySpacing,
      width - boundarySpacing,
      height - boundarySpacing
    )
  );
  walls.push(
    new Boundary(
      width - boundarySpacing,
      height - boundarySpacing,
      boundarySpacing,
      height - boundarySpacing
    )
  );
  walls.push(
    new Boundary(
      boundarySpacing,
      height - boundarySpacing,
      boundarySpacing,
      boundarySpacing
    )
  );

  document.getElementById("update").innerHTML = "";
  document.getElementById("lidar").value = "Choose Lidar Type";
  document.getElementById("lidar").text = "Choose Lidar Type";
}
function angle() {
  var e = document.getElementById("angle");
  g = e.value;
}

//get the tool form doc and update buttion style------------------
function selecttools(t) {
  const linebtn = document.querySelector("#line");
  const rectbtn = document.querySelector("#rect");
  const circlebtn = document.querySelector("#circle");

  linebtn.classList.remove("toolseleted");
  rectbtn.classList.remove("toolseleted");
  circlebtn.classList.remove("toolseleted");
  tool = t;

  switch (t) {
    case 0:
      linebtn.classList.add("toolseleted");
      break;
    case 1:
      rectbtn.classList.add("toolseleted");
      break;
    case 2:
      circlebtn.classList.add("toolseleted");
      break;

    default:
      break;
  }
}

//to crate lines----------------------------------
function createwalls() {
  if (f == false) {
    if (drawingline === false) {
      x1 = mouseX;
      y1 = mouseY;
      drawingline = true;
    } else {
      x2 = mouseX;
      y2 = mouseY;
      drawingline = false;

      var isinside =
        boundarySpacing < mouseX &&
        mouseX < width - boundarySpacing &&
        mouseY > boundarySpacing &&
        mouseY < height - boundarySpacing;
      if (isinside) {
        walls.push(new Boundary(x1, y1, x2, y2));
      }
    }
  }
}
//create reactrangles-----------------------------------
function createrect() {
  if (f == false) {
    if (drawingline === false) {
      x1 = mouseX;
      y1 = mouseY;
      drawingline = true;
    } else {
      x2 = mouseX;
      y2 = mouseY;
      drawingline = false;

      var isinside =
        boundarySpacing < mouseX &&
        mouseX < width - boundarySpacing &&
        mouseY > boundarySpacing &&
        mouseY < height - boundarySpacing;
      if (isinside) {
        walls.push(new Boundary(x1, y1, x2, y1));
        walls.push(new Boundary(x1, y1, x1, y2));
        walls.push(new Boundary(x1, y2, x2, y2));
        walls.push(new Boundary(x2, y1, x2, y2));
      }
    }
  }
}

function useeraser() {
  walls.forEach((wall, i) => {
    if (tool == 2) {
      eraser = new Eraser(eraserSize);
      eraser.update(mouseX, mouseY);
      eraser.show();
      if (
        i > 3 &&
        lineCircle(
          wall.a.x,
          wall.a.y,
          wall.b.x,
          wall.b.y,
          mouseX,
          mouseY,
          eraserSize
        )
      ) {
        walls.splice(i, 1);
      }
    }
  });
}
function lineCircle(x1, y1, x2, y2, cx, cy, rad) {
  let inside1 = pointCircle(x1, y1, cx, cy, rad);
  let inside2 = pointCircle(x2, y2, cx, cy, rad);
  if (inside1 || inside2) return true;

  let len = dist(x1, y1, x2, y2);

  let dot = ((cx - x1) * (x2 - x1) + (cy - y1) * (y2 - y1)) / pow(len, 2);

  let closestX = x1 + dot * (x2 - x1);
  let closestY = y1 + dot * (y2 - y1);

  let onSegment = linePoint(x1, y1, x2, y2, closestX, closestY);
  if (!onSegment) return false;

  let distance = dist(closestX, closestY, cx, cy);

  if (distance <= rad) {
    return true;
  }
  return false;
}

function linePoint(x1, y1, x2, y2, px, py) {
  let d1 = dist(px, py, x1, y1);
  let d2 = dist(px, py, x2, y2);

  let lineLen = dist(x1, y1, x2, y2);

  let buffer = 0.5;

  if (d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer) {
    return true;
  }
  return false;
}
function pointCircle(px, py, cx, cy, size) {
  let d = dist(px, py, cx, cy);

  if (d <= size / 2) {
    return true;
  }
  return false;
}

// //create circless-----------------------------
// function createcircle(){

//     if(f==false){

//     if(drawingline===false){
//         x1 = mouseX;
//         y1 = mouseY;
//         drawingline = true;
//     }
//     else{
//         x2 = mouseX;
//         y2 = mouseY;
//         drawingline = false;

//         var isinside = boundarySpacing<mouseX && mouseX<width-boundarySpacing && mouseY>boundarySpacing && mouseY<height-boundarySpacing
//         if(isinside){
//             circles.push(new Circle(x1,y1,2*Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2))));
//         }
//     }
// }
// }

function draw() {
  background(255);

  if (drawingline == true) {
    switch (tool) {
      case 0:
        line(x1, y1, mouseX, mouseY);
        break;
      case 1:
        line(x1, y1, mouseX, y1);
        line(x1, y1, x1, mouseY);
        line(x1, mouseY, mouseX, mouseY);
        line(mouseX, y1, mouseX, mouseY);
        break;
      default:
        break;
    }
  }

  walls.forEach((wall, i) => {
    if (tool == 2) {
      eraser = new Eraser(eraserSize);
      eraser.update(mouseX, mouseY);
      eraser.show();
      if (
        i > 3 &&
        lineCircle(
          wall.a.x,
          wall.a.y,
          wall.b.x,
          wall.b.y,
          mouseX,
          mouseY,
          eraserSize
        )
      ) {
        wall.show("red");
      } else wall.show(0);
    } else wall.show(0);
  });

  if (f == true) {
    if (document.getElementById("angle").value != "") {
      g = parseFloat(document.getElementById("angle").value);
    }
    particle = new Particle(g);
    if (
      boundarySpacing < mouseX &&
      mouseX < width - boundarySpacing &&
      mouseY > boundarySpacing &&
      mouseY < height - boundarySpacing
    ) {
      particle.update(mouseX, mouseY);
      particle.show();
      particle.look(walls);
    }
  }
  textSize(12);
  fill(50);
  if (document.getElementById("breadth").value != "") {
    breadth = parseInt(document.getElementById("breadth").value);
  }
  len = (235 / 500) * breadth;

  //drawing the scale in the x and y axis -----------------------------------------------
  let spacing = (width - boundarySpacing * 2) / 20;
  for (let index = 0; index < 20; index++) {
    if (index % 2 !== 0)
      line(
        width - boundarySpacing - index * spacing,
        height - boundarySpacing,
        width - boundarySpacing - index * spacing,
        height - boundarySpacing + mazerLines
      );
    else
      line(
        width - boundarySpacing - index * spacing,
        height - boundarySpacing,
        width - boundarySpacing - index * spacing,
        height - boundarySpacing + mazerLines - 8
      );
    if (index % 2 !== 0)
      text(
        (breadth / 20) * index + "m",
        width - boundarySpacing - index * spacing,
        height - boundarySpacing + 25
      );

    if (index <= 10) {
      if (index % 2 !== 0)
        line(
          width - boundarySpacing,
          height - boundarySpacing - index * spacing,
          width - boundarySpacing + mazerLines,
          height - boundarySpacing - index * spacing
        );
      else
        line(
          width - boundarySpacing,
          height - boundarySpacing - index * spacing,
          width - boundarySpacing + mazerLines - 8,
          height - boundarySpacing - index * spacing
        );
      if (index % 2 !== 0)
        text(
          (breadth / 20) * index + "m",
          width - boundarySpacing + 5,
          height - boundarySpacing - index * spacing
        );
    }
  }
}
