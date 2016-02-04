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
  } else {
    this.board[i_board][j_board] = 2;
  }
  var val = this.board[i_board][j_board];
  $('#gameboard').append('<div class="tile" data-row="r'+i_board+'" data-col="c'+j_board+'" data-val="'+ val +'">'+ val +'</div>');

  return [i_board, j_board];
};

Game.prototype.selectTile = function(row, col, value) {
  var $tile = $('.tile[data-row="r' + row + '"][data-col="c' + col + '"][data-val="' + value + '"]');
  return $tile;
};

Game.prototype.moveLeft = function(row,col) {
  console.log("move left is about to happen")
  var $tile;
  var value = this.board[row][col];
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
  console.log(this.board)
};

Game.prototype.moveRight = function(row,col) {
  console.log("move right is about to happen")
  var $tile;
  var value = this.board[row][col];
  $tile = $('.tile[data-row="r' + row + '"][data-col="c' + col + '"]');
  var board_row = this.board[row];
  for(var j= 3; j > col; j--) {
    if (board_row[j] === 0) {
      this.board[row][j] = value;
      $tile.attr('data-col', 'c' + j);
      this.board[row][col] = 0;
      break;
    }
  }
  console.log(this.board)
};

Game.prototype.moveBoardLeft = function() {
  console.log("move board left is about to happen")
  self = this;
  for (var row=0; row < 4; row++) {
    for (var col=1; col < 4; col++) {
      if (this.board[row][col] !== 0) {
        self.moveLeft(row, col);
      }
    }
  }
  console.log(this.board)
  return this.board;
};

Game.prototype.moveBoardRight = function() {
  console.log("move board right is about to happen")
  self = this;
  for (var row=0; row < 4; row++) {
    for (var col=3; col >= 0; col--) {
      if (this.board[row][col] !== 0) {
        self.moveRight(row, col);
      }
    }
  }
  console.log(this.board)
  return this.board;
};

Game.prototype.collideLeft = function(row, col) {
  self = this;
  var value = this.board[row][col];
  var value2 = this.board[row][col+1];
  $tile1 = self.selectTile(row, col, value);
  $tile2 = self.selectTile(row, col+1, value2);
  this.board[row][col] = (value + value2);
  this.board[row][col+1] = 0;
  $tile2.attr('data-col', col);
  setTimeout(function() {
    $tile1.attr('data-val', this.board[row][col]);
    $tile1.html(this.board[row][col]);
    console.log("This is tile 1");
    console.log($tile1);
    $tile2.remove();
  }, 200);

  switch(col) {
    case 0:
      console.log("case 0 is breaking it on collide left")
      if (this.board[row][col+2] !== 0) {
        self.moveLeft(row, col+2);
      }
      if (this.board[row][col+3] !== 0) {
        self.moveLeft(row, col+3);
      }
      console.log(this.board)
      break;
    case 1:
      console.log("case 0 is breaking it on collide left")
      self.moveLeft(row, col+2);
      console.log(this.board)
      break;
    }
  console.log(this.board)
  return this.board;
};

Game.prototype.collideRight = function(row, col) {
  self = this;
  var value = this.board[row][col];
  var value2 = this.board[row][col-1];
  $tile1 = self.selectTile(row, col, value);
  $tile2 = self.selectTile(row, col-1, value2);
  this.board[row][col] = (value + value2);
  this.board[row][col-1] = 0;
  $tile2.attr('data-col', col);
  $tile1.attr('data-val', this.board[row][col]);
  $tile1.html(this.board[row][col]);
  $tile2.remove();

  switch(col) {
    case 3:
      console.log("case 3 is breaking it on collide right")
      if (this.board[row][col-2] !== 0) {
        self.moveRight(row, col-2);
      }
      if (this.board[row][col-3] !== 0) {
        self.moveRight(row, col-3);
      }
      console.log(this.board)
      break;
    case 2:
      console.log("case 2 is breaking it on collide right")
      self.moveRight(row, col-2);
      console.log(this.board)
      break;
  }
  console.log(this.board);
  return this.board;
};

Game.prototype.collideBoardLeft = function() {
  console.log("collide board left is about to happen")
  self = this;
  for (var brow = 0; brow < 4; brow++) {
    var row = this.board[brow];
    for (var x = 0; x < 4; x++) {
      if ((row[x] === row[x+1]) && (row[x] !== 0)) {
        self.collideLeft(brow, x);
      }
    }
  }
  console.log(this.board);
  return this.board;
};

Game.prototype.collideBoardRight = function() {
  console.log("collide board right is about to happen")
  self = this;
  for (var brow = 0; brow < 4; brow++) {
    var row = this.board[brow];
    for (var x = 3; x >= 0; x--) {
      if ((row[x] === row[x-1]) && row[x] !== 0) {
        self.collideRight(brow, x);
      }
    }
  }
  console.log(this.board)
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
        break;
      case 40: //down
        // self.moveBoardDown();
        // self.collideDown();
        // self.randTile();
        break;
      case 37: //left
        self.moveBoardLeft();
        setTimeout(function() {
          self.collideBoardLeft();
        }, 200);
        setTimeout(function() {
          self.randTile();
        }, 200);
        //self.randTile();
        console.log('left');
        break;
      case 39: //right
        self.moveBoardRight();
        setTimeout(function() {
          self.collideBoardRight();
        }, 200);
        setTimeout(function() {
          self.randTile();
        }, 200);
        console.log('right');
        break;
  }
};

$(document).ready(function() {
  console.log("ready to go!");
  var game = new Game();
  game.randTile();
  game.randTile();
  // var test_row = 0
  // var test_col1 = 0
  // var test_col2 = 1
  // var test_col3 = 2
  // game.board[test_row][test_col1] = 2;
  // game.board[test_row][test_col2] = 2;
  // game.board[test_row][test_col3] = 2;
  // $('#gameboard').append('<div class="tile" data-row="r'+ test_row +'" data-col="c'+ test_col1 +'" data-val="'+ 2 +'">'+ 2 +'</div>');
  // $('#gameboard').append('<div class="tile" data-row="r'+ test_row +'" data-col="c'+ test_col2 +'" data-val="'+ 2 +'">'+ 2 +'</div>');
  // $('#gameboard').append('<div class="tile" data-row="r'+ test_row +'" data-col="c'+ test_col3 +'" data-val="'+ 2 +'">'+ 2 +'</div>');

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      game.moveTile(event.which);
    }
  });
});
