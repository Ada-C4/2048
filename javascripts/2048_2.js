var Game = function() {
  this.board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
  this.score = 0;
  this.win = false;
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
  //$('#gameboard').append('<div class="tile" data-row="r'+i_board+'" data-col="c'+j_board+'" data-val="'+ val +'">'+ val +'</div>');

  return [i_board, j_board];
};

Game.prototype.selectTile = function(row, col, value) {
  var $tile = $('.tile[data-row="r' + row + '"][data-col="c' + col + '"][data-val="' + value + '"]');
  return $tile;
};

Game.prototype.moveLeft = function(row,col) {
  // tile[0] is the row
  // tile[1] is the column position
  self = this;
  var $tile;
  var value = this.board[row][col];
  var newCol;
  $tile = $('.tile[data-row="r' + row + '"][data-col="c' + col + '"]');
  var board_row = this.board[row];
  for(var j=0; j < col; j++) {
    if (board_row[j] === 0) {
      this.board[row][j] = value;
      $tile.attr('data-col', 'c' + j);
      this.board[row][col] = 0;
      break;
    }
  }
  return [row, newCol];
};

Game.prototype.moveBoardLeft = function() {
  self = this;
  for (var row=0; row < 4; row++) {
    for (var col=0; col < 4; col++) {
      self.moveLeft(row, col);
    }
  }
  return this.board;
};

Game.prototype.collideLeft = function(row, col) {
  self = this;
  var value = this.board[row][col];
  var value2 = this.board[row][col+1];
  $tile1 = self.selectTile(row, col, value);
  $tile2 = self.selectTile(row, col+1, value2);
  this.board[row][col] = (value + value2);
  $tile1.attr('data-val', this.board[row][col]);
  $tile1.html(this.board[row][col]);
  $tile2.remove();
  this.board[row][col+1] = 0;
  switch(col) {
    case 0:
      self.moveLeft([row, col+2]);
      self.moveLeft([row, col+3]);
      break;
    case 1:
      self.moveLeft([row, col+2]);
      break;
    }
  return this.board;
};

Game.prototype.collideBoardLeft = function() {
  self = this;
  for (var brow = 0; brow < 4; brow++) {
    var row = this.board[brow];
    for (var x = 0; x < 4; x++) {
      //console.log(row[x-1]);
      if ((row[x] === row[x+1]) && row[x] !== 0) {
        self.collideLeft(brow, x);
      }
    }
  }
  return this.board;
};

Game.prototype.moveTile = function(direction) {
  // Game method here
  board = this.board;
  self = this;
    switch(direction) {
      case 38: //up
        // self.moveBoardUp();
        // self.collideUp();
        // self.randTile();
        console.log('up');
        break;
      case 40: //down
        // self.moveBoardDown();
        // self.collideDown();
        // self.randTile();
        console.log('down');
        break;
      case 37: //left
        self.moveBoardLeft();
        self.collideBoardLeft();
        //self.randTile();
        console.log('left');
        break;
      case 39: //right
        // self.moveBoardRight();
        // self.collideRight();
        // self.randTile();
        console.log('right');
        //this.moveRight(tile);
        //this.collideRight(tile);
        break;
  }
};

$(document).ready(function() {
  console.log("ready to go!");
  var game = new Game();
  //game.randTile();
  //game.randTile();
  game.board[0][2] = 2;
  game.board[0][3] = 2;
  $('#gameboard').append('<div class="tile" data-row="r'+ 0 +'" data-col="c'+ 2 +'" data-val="'+ 2 +'">'+ 2 +'</div>');
  $('#gameboard').append('<div class="tile" data-row="r'+ 0 +'" data-col="c'+ 3 +'" data-val="'+ 2 +'">'+ 2 +'</div>');

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      game.moveTile(event.which);
    }

  });
});
