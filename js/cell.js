function Cell(x, y) {
  this.i = x;
  this.j = y;

  this.f = 0;
  this.g = 0;
  this.h = 0;

  this.display = function(color) {
    strokeWeight(1);
    stroke(40, 40, 40);
    fill(color);
    rect(this.i * w, this.j * h, w - 1, h - 1);  
  }

  this.neighbors = [];
  this.addNeighbors = function(grid) {
    let i = this.i;
    let j = this.j;

    if (i < cols - 1)
      this.neighbors.push(grid[i + 1][j]);
    if (i > 0)
      this.neighbors.push(grid[i - 1][j]);
    if (j < rows - 1)
      this.neighbors.push(grid[i][j + 1]);
    if (j > 0)
      this.neighbors.push(grid[i][j - 1]);

    if (i > 0 && j > 0)
      this.neighbors.push(grid[i - 1][j - 1]);
    if (i < cols - 1 && j > 0)
      this.neighbors.push(grid[i + 1][j - 1]);
    if (i > 0 && j < rows - 1)
      this.neighbors.push(grid[i - 1][j + 1]);
    if (i < cols - 1 && j < rows - 1)
      this.neighbors.push(grid[i + 1][j + 1]);
  }

  this.previous = null;
  this.wall = false;
}