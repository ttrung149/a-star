let grid;
let cols = 50;
let rows = 50;
let height = 500;
let width = 500;

let w = width / cols;
let h = height / rows; 

let openSet;
let closedSet;

function constructGrid(cols, rows) {
  grid = new Array(cols);
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }
}

function randomizeGrid() {
  openSet = [];
  closedSet = [];
  constructGrid(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {

      if (random(1) < wallFreq.value / 100) {
        grid[i][j].wall = true;
      }

      if (grid[i][j].wall)
        grid[i][j].display(color(75, 75, 75));
      else  
        grid[i][j].display(color(255));
    }
  }

  start = grid[0][0];
  end = grid[cols - 1][rows - 1];

  start.wall = false;
  end.wall = false;

  start.display(color(255));
  end.display(color(255));

  openSet.push(start);
}

function clearGrid() {
  openSet = [];
  closedSet = [];
  constructGrid(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].wall = false;
      grid[i][j].display(color(255));
    }
  }

  start = grid[0][0];
  end = grid[cols - 1][rows - 1];

  openSet.push(start);
}