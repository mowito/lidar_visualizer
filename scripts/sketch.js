const canvesdiv = document.querySelector(".canvesCard");
const elem = document.getElementById("play");

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
let ctx;
let len = 150;
let mazerLines = 15; // the lines for the x and y axis scale

let tool = 0;
let n = 20; // n gon , to form a circle

function setup() {
  cnv = createCanvas(canvesdiv.offsetWidth, canvesdiv.offsetWidth * (9 / 16)); // seting the canves to 16:9 depending on the avlibel width
  ctx = canvas.getContext("2d");

  // ctx.closePath();

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
    case 4:
      createtriangle();
      break;
    case 5:
      createcircle();
      break;

    default:
      break;
  }
}
function stop() {
  f = false;
  elem.value = "Play";
  elem.style.backgroundColor = "#8FBC8F";
}
function play() {
  if (elem.value == "Play") {
    f = true;
    elem.value = "Stop";
    elem.style.backgroundColor = "#CD5C5C";
  } else {
    stop();
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
  const trianglebtn = document.querySelector("#triangle");
  const circlebtn = document.querySelector("#circle");
  const eraserbtn = document.querySelector("#eraser");

  linebtn.classList.remove("toolseleted");
  rectbtn.classList.remove("toolseleted");
  eraserbtn.classList.remove("toolseleted");
  trianglebtn.classList.remove("toolseleted");
  circlebtn.classList.remove("toolseleted");
  tool = t;

  switch (t) {
    case 0:
      linebtn.classList.add("toolseleted");
      stop();
      break;
    case 1:
      rectbtn.classList.add("toolseleted");
      stop();
      break;
    case 2:
      eraserbtn.classList.add("toolseleted");
      stop();
      break;
    case 3:
      play();
      break;
    case 4:
      trianglebtn.classList.add("toolseleted");
      stop();
      break;
    case 5:
      circlebtn.classList.add("toolseleted");
      stop();
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

      walls.push(new Boundary(x1, y1, x2, y2));
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

      walls.push(new Boundary(x1, y1, x2, y1));
      walls.push(new Boundary(x1, y1, x1, y2));
      walls.push(new Boundary(x1, y2, x2, y2));
      walls.push(new Boundary(x2, y1, x2, y2));
    }
  }
}
//trangle-------------------------------------------------------------
function createtriangle() {
  if (f == false) {
    if (drawingline === false) {
      x1 = mouseX;
      y1 = mouseY;
      drawingline = true;
    } else {
      x2 = mouseX;
      y2 = mouseY;
      drawingline = false;

      walls.push(new Boundary(x1, y2, x2, y2));
      walls.push(new Boundary(x1, y2, x1 + (x2 - x1) / 2, y1));
      walls.push(new Boundary(x2, y2, x1 + (x2 - x1) / 2, y1));
    }
  }
}
//circle--------------------------------------------------
function createcircle() {
  if (f == false) {
    if (drawingline === false) {
      x1 = mouseX;
      y1 = mouseY;
      drawingline = true;
    } else {
      x2 = mouseX;
      y2 = mouseY;
      drawingline = false;

      let xc = (x1 + mouseX) / 2;
      let yc = (y1 + mouseY) / 2;
      let r = Math.sqrt((x1 - xc) * (x1 - xc) + (y1 - yc) * (y1 - yc));
      let xf = xc + r * Math.cos((2 * Math.PI * 0) / n);
      let yf = yc + r * Math.sin((2 * Math.PI * 0) / n);
      let xp = xf;
      let yp = yf;
      for (let i = 1; i < n; i++) {
        walls.push(
          new Boundary(
            xc + r * Math.cos((2 * Math.PI * i) / n),
            yc + r * Math.sin((2 * Math.PI * i) / n),
            xp,
            yp
          )
        );
        xp = xc + r * Math.cos((2 * Math.PI * i) / n);
        yp = yc + r * Math.sin((2 * Math.PI * i) / n);
      }
      walls.push(new Boundary(xf, yf, xp, yp));
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
        lineeraser(
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
function lineeraser(x1, y1, x2, y2, cx, cy, rad) {
  let inside1 = pointeraser(x1, y1, cx, cy, rad);
  let inside2 = pointeraser(x2, y2, cx, cy, rad);
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
function pointeraser(px, py, cx, cy, size) {
  let d = dist(px, py, cx, cy);

  if (d <= size / 2) {
    return true;
  }
  return false;
}

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
      case 4:
        line(x1, mouseY, mouseX, mouseY);
        line(x1, mouseY, x1 + (mouseX - x1) / 2, y1);
        line(mouseX, mouseY, x1 + (mouseX - x1) / 2, y1);
        break;
      case 5:
        let xc = (x1 + mouseX) / 2;
        let yc = (y1 + mouseY) / 2;
        let r = Math.sqrt((x1 - xc) * (x1 - xc) + (y1 - yc) * (y1 - yc));
        let xf = xc + r * Math.cos((2 * Math.PI * 0) / n);
        let yf = yc + r * Math.sin((2 * Math.PI * 0) / n);
        let xp = xf;
        let yp = yf;
        for (let i = 1; i < n; i++) {
          line(
            xc + r * Math.cos((2 * Math.PI * i) / n),
            yc + r * Math.sin((2 * Math.PI * i) / n),
            xp,
            yp
          );
          xp = xc + r * Math.cos((2 * Math.PI * i) / n);
          yp = yc + r * Math.sin((2 * Math.PI * i) / n);
        }
        line(xf, yf, xp, yp);
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
        lineeraser(
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
    } else {
      wall.show(0);
    }
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

  ctx.rect(
    boundarySpacing,
    boundarySpacing,
    width - boundarySpacing,
    height - boundarySpacing
  );
  //----------------------------------
  fill(255);
  stroke(255);
  rect(
    boundarySpacing,
    height - boundarySpacing + 1,
    width - boundarySpacing,
    height - boundarySpacing * 2
  );
  rect(
    width - boundarySpacing + 1,
    boundarySpacing,
    boundarySpacing,
    height - boundarySpacing
  );
  rect(0, 0, width, boundarySpacing - 1);
  rect(0, 0, boundarySpacing - 1, height);

  fill(0);
  stroke(0);
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
