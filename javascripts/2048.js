var Game = function() {
  this.board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
  this.score = 0;
  this.win = false;
};

Game.prototype.scoring = function(value) {
  this.score += value;
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
  if (arr.length !== 0) {
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
  }
};

Game.prototype.selectTile = function(row, col, value) {
  var $tile = $('.tile[data-row="r' + row + '"][data-col="c' + col + '"][data-val="' + value + '"]');
  return $tile;
};

Game.prototype.moveTile = function(direction) {
  // Game method here
  var board = this.board;
  var self = this;
  switch(direction) {
    case 38: //up
      self.moveBoardUp();
      setTimeout(function() {
        self.collideBoardUp();
      }, 100);
      setTimeout(function() {
        self.randTile();
      }, 300);
      break;
    case 40: //down
      self.moveBoardDown();
      setTimeout(function() {
        self.collideBoardDown();
      }, 100);
      setTimeout(function() {
        self.randTile();
      }, 300);
      break;
    case 37: //left
      self.moveBoardLeft();
      setTimeout(function() {
        self.collideBoardLeft();
      }, 100);
      setTimeout(function() {
        self.randTile();
      }, 300);
      break;
    case 39: //right
      self.moveBoardRight();
      setTimeout(function() {
        self.collideBoardRight();
      }, 100);
      setTimeout(function() {
        self.randTile();
      }, 300);
      break;
  }
};

Game.prototype.moveLeft = function(row,col) {
  var $tile;
  var value = this.board[row][col];
  $tile = $('.tile[data-row="r' + row + '"][data-col="c' + col + '"]');
  if (this.board[row][col] !== 0) {
    for(var j=0; j < col; j++) {
      if (this.board[row][j] === 0) {
        this.board[row][j] = value;
        $tile.attr('data-col', 'c' + j);
        this.board[row][col] = 0;
        break;
      }
    }
  }
};

Game.prototype.moveRight = function(row,col) {
  var $tile;
  var value = this.board[row][col];
  $tile = $('.tile[data-row="r' + row + '"][data-col="c' + col + '"]');
  if (this.board[row][col] !== 0) {
    for(var j=3; j > col; j--) {
      if (this.board[row][j] === 0) {
        this.board[row][j] = value;
        $tile.attr('data-col', 'c' + j);
        this.board[row][col] = 0;
        break;
      }
    }
  }
};

Game.prototype.moveUp = function(row, col) {
  var $tile;
  var value = this.board[row][col];
  $tile = $('.tile[data-row="r' + row + '"][data-col="c' + col + '"]');
  if (this.board[row][col] !== 0) {
    for(var i = 0; i < row ; i++) {
      if ((this.board[i][col]) === 0) {
        this.board[i][col] = value;
        $tile.attr('data-row', 'r' + i);
        this.board[row][col] = 0;
        break;
      }
    }
  }
};

Game.prototype.moveDown = function(row, col) {
  var $tile;
  var value = this.board[row][col];
  $tile = $('.tile[data-row="r' + row + '"][data-col="c' + col + '"]');
  if (this.board[row][col] !== 0) {
    for(var i = 3; i > row; i--) {
      if ((this.board[i][col]) === 0) {
        this.board[i][col] = value;
        $tile.attr('data-row', 'r' + i);
        this.board[row][col] = 0;
        break;
      }
    }
  }
};

Game.prototype.moveBoardLeft = function() {
  self = this;
  for (var row=0; row < 4; row++) {
    for (var col=1; col < 4; col++) {
      self.moveLeft(row, col);
    }
  }
  return this.board;
};

Game.prototype.moveBoardRight = function() {
  self = this;
  for (var row=0; row < 4; row++) {
    for (var col=3; col >= 0; col--) {
      self.moveRight(row, col);
    }
  }
  return this.board;
};

Game.prototype.moveBoardUp = function() {
  var self = this;
  for (var row = 1; row < 4; row++) {
    for (var col = 0; col < 4; col++) {
      self.moveUp(row, col);
    }
  }
  return this.board;
};

Game.prototype.moveBoardDown = function() {
  var self = this;
  for (var row = 2; row >= 0; row--) {
    for (var col = 0; col < 4; col++) {
      self.moveDown(row, col);
    }
  }
  return this.board;
};

Game.prototype.collideBoardLeft = function() {
  self = this;
  for (var row = 0; row < 4; row++) {
    for (var col = 0; col < 3; col++) {
      if ((this.board[row][col] === this.board[row][col+1]) && (this.board[row][col] !== 0)) {
        self.collideLeft(row, col);
      }
    }
  }
  return this.board;
};

Game.prototype.collideBoardRight = function() {
  self = this;
  for (var row = 0; row < 4; row++) {
    for (var col = 3; col >= 1; col--) {
      if ((this.board[row][col] === this.board[row][col-1]) && this.board[row][col] !== 0) {
        self.collideRight(row, col);
      }
    }
  }
  return this.board;
};

Game.prototype.collideBoardUp = function() {
var self = this;
var board = this.board;
for (var row = 0; row < 3 ; row++) {
  for (var col = 0; col < 4; col++) {
    if (( board[row][col] === board[row+1][col]) && (board[row][col] !== 0)) {
      self.collideUp(row, col);
    }
  }
}
return this.board;
};

Game.prototype.collideBoardDown = function() {
var self = this;
var board = this.board;
for (var row = 3; row > 0 ; row--) {
  for (var col = 0; col < 4; col++) {
    if (( board[row][col] === board[row-1][col]) && (board[row][col] !== 0)) {
      self.collideDown(row, col);
    }
  }
}
return this.board;
};

Game.prototype.collideLeft = function(row, col) {
  self = this;
  var value = this.board[row][col];
  var value2 = this.board[row][col+1];
  var $tile1 = self.selectTile(row, col, value);
  var $tile2 = self.selectTile(row, col+1, value2);
  this.board[row][col] = (value + value2);
  this.board[row][col+1] = 0;
  $tile2.attr('data-col', 'c' + col);
  setTimeout(function() {
    //console.log()
    $tile1.attr('data-val', self.board[row][col]);
    $tile1.html(self.board[row][col]);
    $tile2.remove();
    self.scoring(self.board[row][col]);
    $("#score").html("Score: " + self.score);
  }, 100);
  switch(col) {
    case 0:
      $tile3 = self.selectTile(row, 2, this.board[row][2]);
      $tile4 = self.selectTile(row, 3, this.board[row][3]);
      $tile3.attr('data-col', 'c' + 1);
      $tile4.attr('data-col', 'c' + 2);
      this.board[row][1] = this.board[row][2];
      this.board[row][2] = this.board[row][3];
      this.board[row][3] = 0;
      break;
    case 1:
      $tile5 = self.selectTile(row, 3, this.board[row][3]);
      $tile5.attr('data-col', 'c' + 2);
      this.board[row][2] = this.board[row][3];
      this.board[row][3] = 0;
      break;
    }
    return this.board;
};

Game.prototype.collideRight = function(row, col) {
  self = this;
  var value = this.board[row][col];
  var value2 = this.board[row][col-1];
  var $tile1 = self.selectTile(row, col, value);
  var $tile2 = self.selectTile(row, col-1, value2);
  this.board[row][col] = (value + value2);
  this.board[row][col-1] = 0;
  $tile2.attr('data-col', 'c' + col);
  setTimeout(function() {
    $tile1.attr('data-val', self.board[row][col]);
    $tile1.html(self.board[row][col]);
    $tile2.remove();
    self.scoring(self.board[row][col]);
    $("#score").html("Score: " + self.score);
  }, 100);
  switch(col) {
    case 3:
      $tile3 = self.selectTile(row, 1, this.board[row][1]);
      $tile4 = self.selectTile(row, 0, this.board[row][0]);
      $tile3.attr('data-col', 'c' + 2);
      $tile4.attr('data-col', 'c' + 1);
      this.board[row][2] = this.board[row][1];
      this.board[row][1] = this.board[row][0];
      this.board[row][0] = 0;
      break;
    case 2:
      $tile5 = self.selectTile(row, 0, this.board[row][0]);
      $tile5.attr('data-col', 'c' + 1);
      this.board[row][1] = this.board[row][0];
      this.board[row][0] = 0;
      break;
  }
  return this.board;
};

Game.prototype.collideUp = function(row, col) {
  var self = this;
  var value = this.board[row][col];
  var value2 = this.board[row+1][col];
  var $tile1 = self.selectTile(row, col, value);
  var $tile2 = self.selectTile(row+1, col, value2);
  this.board[row][col] = (value + value2);
  this.board[row+1][col] = 0;
  $tile2.attr('data-row', 'r' + row);
  setTimeout(function() {
    $tile1.attr('data-val', self.board[row][col]);
    $tile1.html(self.board[row][col]);
    $tile2.remove();
    self.scoring(self.board[row][col]);
    $("#score").html("Score: " + self.score);
  }, 100);

  switch(row) {
    case 0:
      var $tile3 = self.selectTile(2, col, this.board[2][col]);
      var $tile4 = self.selectTile(3, col, this.board[3][col]);
      $tile3.attr('data-row', 'r' + 1);
      $tile4.attr('data-row', 'r' + 2);
      this.board[1][col] = this.board[2][col];
      this.board[2][col] = this.board[3][col];
      this.board[3][col] = 0;

      break;
    case 1:
      var $tile5 = self.selectTile(3, col, this.board[3][col]);
      $tile5.attr('data-row', 'r' + 2);
      this.board[2][col] = this.board[3][col];
      this.board[3][col] = 0;
      break;
  }
  return this.board;
};

Game.prototype.collideDown = function(row, col) {
  var self = this;
  var value = this.board[row][col];
  var value2 = this.board[row-1][col];
  var $tile1 = self.selectTile(row, col, value);
  var $tile2 = self.selectTile(row-1, col, value2);
  this.board[row][col] = (value + value2);
  this.board[row-1][col] = 0;
  $tile2.attr('data-row', 'r' + row);
  setTimeout(function() {
    $tile1.attr('data-val', self.board[row][col]);
    $tile1.html(self.board[row][col]);
    $tile2.remove();
    self.scoring(self.board[row][col]);
    $("#score").html("Score: " + self.score);
  }, 100);

  switch(row) {
    case 3:
      var $tile3 = self.selectTile(1, col, this.board[1][col]);
      var $tile4 = self.selectTile(0, col, this.board[0][col]);
      $tile3.attr('data-row', 'r' + 2);
      $tile4.attr('data-row', 'r' + 1);
      this.board[2][col] = this.board[1][col];
      this.board[1][col] = this.board[0][col];
      this.board[0][col] = 0;
      break;
    case 2:
      var $tile5 = self.selectTile(0, col, this.board[0][col]);
      $tile5.attr('data-row', 'r' + 1);
      this.board[1][col] = this.board[0][col];
      this.board[0][col] = 0;
      break;
  }
  return this.board;
};



$(document).ready(function() {
  console.log("ready to go!");
  var game = new Game();
  game.randTile();
  game.randTile();
  //$("#score").html(this.score);

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      game.moveTile(event.which);
    }

  });
});
