var Game = function() {
  this.board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
  this.score = 0;
  this.win = false;
};

Game.prototype.scoring = function(tile) {
  this.score += tile;
  if (this.score == 2048) {
    this.win = true;
  }
};

Game.prototype.lost = function() {
  var count = 0;
  board = this.board;
  //check col
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 3; j ++) {
      if (board[i][j] === [i+1][j])
      { return false;
    }
  }
  //check row
  for (var x = 0; x < 3; i++)
    for (var y = 0; y < 4; y ++) {
      if (board[x][y] === [x][y+1]) {
        return false;
      }
    }
  }
  console.log("Game Over!");
  return true;
};


Game.prototype.randTile = function() {
  var arr = [];
  for(var i = 0; i < 4; i++) {
    for(var j = 0; j < 4; j++ ) {
      if( this.board[i][j] === 0 ) {
        arr.push([i,j]);
      }
    }
  }
  var randNum = Math.floor((Math.random() * arr.length));
  var i_board = arr[randNum][0];
  var j_board = arr[randNum][1];

    if (Math.floor((Math.random() * 10) + 1) == 7) {
      this.board[i_board][j_board] = 4;
    } else { this.board[i_board][j_board] = 2; }
  // return this.board;
  var val = this.board[i_board][j_board];
  $('#gameboard').append('<div class="tile" data-row="r'+i_board+'" data-col="c'+j_board+'" data-val="'+ val +'">'+ val +'</div>');
  return [i_board, j_board];
};

Game.prototype.moveTile = function(direction) {
  // Game method here
  board = this.board;
  self = this;
      switch(direction) {
        case 38: //up
          self.moveBoardUp();
          self.collideUp();
          console.log('up');
          break;
        case 40: //down
          self.moveBoardDown();
          self.collideDown();
          console.log('down');
          break;
        case 37: //left
          self.moveBoardLeft();
          self.collideLeft();
          console.log('left');
          break;
        case 39: //right
          self.moveBoardRight();
          self.collideRight();
          console.log('right');
          //this.moveRight(tile);
          //this.collideRight(tile);
          break;
  }
};

Game.prototype.moveLeft = function(tile) {
  // tile[0] is the row
  // tile[1] is the column position
  self = this;
  var $tile;
  var row = tile[0];
  var col = tile[1];
  var value = this.board[row][col];
  var newCol;
  $tile = $('.tile[data-row="r' + row + '"][data-col="c' + col + '"]');
  var board_row = this.board[tile[0]];

  for(var j=0; j < col; j++) {
    if (board_row[j] === 0) {
      newCol = j;
      this.board[row][j] = value;
      this.board[row][col] = 0;
      break;
    }
  }
  $tile.attr('data-col', 'c' + newCol);
  return [row, newCol];
  //return this.board;
};

Game.prototype.moveBoardLeft = function() {
  self = this;
  for (var row=0; row < 4; row++) {
    for (var col=0; col < 4; col++) {
      self.moveLeft([row, col]);
    }
  }
  return this.board;
};


Game.prototype.collideLeft = function() {
  var $tile1;
  var $tile2;
  self = this;
  for (var brow = 0; brow < 4; brow++) {
    var row = this.board[brow];
    for (var x = 0; x < 4; x++) {
      //console.log(row[x-1]);
      if ((row[x] === row[x+1]) && row[x] !== 0) {
        row[x] = (row[x] + row[x+1]);
        $tile1 = $('.tile[data-row="r' + brow + '"][data-col="c' + x + '"]');
        $tile2 = $('.tile[data-row="r' + brow + '"][data-col="c' + x+1 + '"]');
        $tile1.attr('data-val', row[x]);
        $tile1.innerHTML(row[x]);
        $tile2.remove();
        self.scoring(row[x]);
        row[x+1] = 0;
        switch(x) {
          case 0:
            self.moveRight([brow, x+2]);
            self.moveRight([brow, x+3]);
            break;
          case 1:
            self.moveRight([brow, x+2]);
            break;
          }
        }
    }
  }
  return this.board;
};


Game.prototype.moveRight = function(tile) {
  // tile[0] is the row
  // tile[1] is the column position
  var $tile;
  var newCol;
  var row = tile[0];
  var col = tile[1];
  var value = this.board[row][col];
  var board_row = this.board[tile[0]];
  $tile = $('.tile[data-row="r' + row + '"][data-col="c' + col + '"]');

  for(var j= 3; j > col; j--) {
    if (board_row[j] === 0) {
      newCol = j;
      this.board[row][j] = value;
      this.board[row][col] = 0;
      break;
    }
  }
  $tile.attr('data-col', 'c' + newCol);
  return [row, newCol];
};

Game.prototype.moveBoardRight = function() {
  self = this;
  for (var row=0; row < 4; row++) {
    for (var col=3; col >= 0; col--) {
      array = self.moveRight([row, col]);
    }
  }
  return this.board;
};


Game.prototype.collideRight = function() {
  self = this;
  for (var brow = 0; brow < 4; brow++) {
    var row = this.board[brow];
    for (var x = 3; x > 0; x--) {
      //console.log(row[x-1]);
      if ((row[x] === row[x-1]) && row[x] !== 0) {
        row[x] = (row[x] + row[x-1]);
        self.scoring(row[x]);
        row[x-1] = 0;
        switch(x) {
          case 3:
            self.moveRight([brow, x-2]);
            self.moveRight([brow, x-3]);
            break;
          case 2:
            self.moveRight([brow, x-2]);
            break;
          }
        }
    }
  }
  return this.board;
};


Game.prototype.moveDown = function(tile) {
  var $tile;
  var newRow;
  var row = tile[0];
  var col = tile[1];
  var value = this.board[row][col];
  $tile = $('.tile[data-row="r' + row + '"][data-col="c' + col + '"]');
  for(var i = 3; i > row ; i--) {
    if ((this.board[i][col]) === 0) {
      newRow = i;
      this.board[i][col] = value;
      this.board[row][col] = 0;
      break;
    }
  }
  $tile.attr('data-row', 'r' + newRow);
  return this.board;
};

Game.prototype.moveBoardDown = function() {
  self = this;
  for (var row = 2; row >= 0; row--) {
    for (var col = 0; col < 4; col++) {
      self.moveDown([row, col]);
    }
  }
  return this.board;
};


Game.prototype.collideDown = function() {
  self = this;
  board = this.board;
  for (var bcol = 0; bcol < 4 ; bcol++) {
    for (var row = 3; row > 0; row--) {
      //console.log(row[x-1]);
      if (( board[row][bcol] === board[row-1][bcol]) && board[row][bcol] !== 0) {
        board[row][bcol] = (board[row][bcol] + board[row-1][bcol]);
        self.scoring(board[row][bcol]);
        board[row-1][bcol] = 0;
        switch(row) {
          case 3:
            self.moveDown([row-2, bcol]);
            self.moveDown([row-3, bcol]);
            break;
          case 2:
            self.moveDown([row-2, bcol]);
            break;
          }
        }
    }
  }
  return this.board;
};


Game.prototype.moveUp = function(tile) {
  var newRow;
  var $tile;
  var row = tile[0];
  var col = tile[1];
  $tile = $('.tile[data-row="r' + row + '"][data-col="c' + col + '"]');
  var value = this.board[row][col];
  for(var i = 0; i < row ; i++) {
    if ((this.board[i][col]) === 0) {
      newRow = i;
      this.board[i][col] = value;
      this.board[row][col] = 0;
      break;
    }
  }
  $tile.attr('data-row', 'r' + newRow);
  return this.board;
};

Game.prototype.moveBoardUp = function() {
  self = this;
  for (var row = 1; row < 4; row++) {
    for (var col = 0; col < 4; col++) {
      self.moveUp([row, col]);
    }
  }
  return this.board;
};

Game.prototype.collideUp = function() {
  self = this;
  board = this.board;
  for (var bcol = 0; bcol < 4 ; bcol++) {
    for (var row = 0; row < 3; row++) {
      if (( board[row][bcol] === board[row+1][bcol]) && (board[row][bcol] !== 0)) {
        board[row][bcol] = (board[row][bcol] + board[row+1][bcol]);
        self.scoring(board[row][bcol]);
        board[row+1][bcol] = 0;
        switch(row) {
          case 0:
            self.moveUp([row+2, bcol]);
            self.moveUp([row+3, bcol]);
            break;
          case 1:
            self.moveUp([row+2, bcol]);
            break;
          }
        }
    }
  }
  return this.board;
};


$(document).ready(function() {
  console.log("ready to go!");
  var game = new Game();
  game.randTile();
  game.randTile();

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      game.moveTile(event.which);
    }

  });
});
//
var game = new Game();
var f = game.randTile();
