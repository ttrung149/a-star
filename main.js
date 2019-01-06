let start, end;

const gridSize = document.querySelector('#gridSize');

const run = document.querySelector('#run');
const stop = document.querySelector('#stop');
const randomizeBtn = document.querySelector('#randomize');
const wallFreq = document.querySelector('#wallFreq');
const clearBtn = document.querySelector('#clearGrid');

const status = document.querySelector('#status');

let finding = false;
let randomizeClicked = false;
let clearClicked = false;

run.addEventListener('click', function() {
  finding = true;
});

stop.addEventListener('click', function() {
  finding = false;
});

randomizeBtn.addEventListener('click', function() {
  randomizeClicked = true;
});

clearBtn.addEventListener('click', function() {
  clearClicked = true;
});

function setup() {
  var canvas = createCanvas(width, height);
  canvas.parent('sketch-holder');
  randomizeGrid();
}

function mouseDragged() {
  if (mouseX < width && mouseY < height) {
    let x = Math.floor(mouseX / w);
    let y = Math.floor(mouseY / h);
  
    if (key === 'e' || key === 'E') {
      grid[x][y].wall = false;
      grid[x][y].display(color(255));
    }
    else if (key === 'w' || key === 'W'){
      grid[x][y].wall = true;
      grid[x][y].display(color(75, 75, 75));
    }
  }
}

function draw() {
  if (gridSize.value) {
    cols = gridSize.value;
    rows = gridSize.value;
    w = width / cols;
    h = height / rows; 
  }

  if (randomizeClicked) {
    randomizeGrid();
    randomizeClicked = false;
  }

  if (clearClicked) {
    clearGrid();
    clearClicked = false;
  }

  if (finding)
    a_star();
}

function a_star() {
  if (openSet.length > 0) {
    let lowestfScoreIndex = 0;

    for (let i = 0; i < openSet.length; i++) {
      openSet[i].display(color(168, 255, 82));
      if (openSet[i].f < openSet[lowestfScoreIndex].f)
        lowestfScoreIndex = i;
    }

    let current = openSet[lowestfScoreIndex];
    
    if (current === end) {
      status.innerHTML = "Status: DONE!";
      finding = false;
    }

    for (let i = openSet.length; i >= 0; i--) {
      if (openSet[i] === current) {
        openSet.splice(i, 1);
      }
    }

    closedSet.push(current);

    let neighbors = current.neighbors;
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        let tempG = current.g + 1;
        let newPath = false;

        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } 
        else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }

        if (newPath) {
          //neighbor.h = dist(neighbor.i, neighbor.j, end.i, end.j);
          neighbor.h = abs(neighbor.i - end.i) + abs(neighbor.j - end.j);
          neighbor.f = neighbor.h + neighbor.g;

          neighbor.previous = current;
        }
      }
    }

    for (let i = 0; i < closedSet.length; i++) {
      closedSet[i].display(color(255, 100, 100));
    }

    let path = [];
    let temp = current;
    path.push(temp);
    while (temp.previous) {
      path.push(temp.previous);
      temp = temp.previous;
    }

    for (let i = 0; i < path.length; i++) {
      path[i].display(color(102, 0, 102));
    }
  }
  else {
    status.innerHTML = "Status: Cannot find path!";
    finding = false;
  }
}