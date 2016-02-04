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


Game.prototype.moveDown = function(row, col) {
//self = this;
//console.log("This is working")
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

Game.prototype.moveBoardDown = function() {
  self = this;
  for (var row = 2; row >= 0; row--) {
    for (var col = 0; col < 4; col++) {
      self.moveDown(row, col);
    }
  }
  return this.board;
};


Game.prototype.collideDown = function(row, col) {
  self = this;
  var value = this.board[row][col];
  var value2 = this.board[row-1][col];
  console.log(value)
  console.log(value2)
  $tile1 = self.selectTile(row, col, value);
  $tile2 = self.selectTile(row-1, col, value2);
  this.board[row][col] = (value + value2);
  this.board[row-1][col] = 0;
  $tile1.attr('data-val', this.board[row][col]);
  $tile1.html(this.board[row][col]);
  $tile2.remove();
  switch(row) {
    case 3:
      $tile3 = self.selectTile(1, col, this.board[1][col]);
      $tile4 = self.selectTile(0, col, this.board[0][col]);
      $tile3.attr('data-row', 'r' + 2);
      $tile4.attr('data-row', 'r' + 1);
      this.board[2][col] = this.board[1][col];
      this.board[1][col] = this.board[0][col];
      this.board[0][col] = 0;
      break;
    case 2:
      $tile5 = self.selectTile(0, col, this.board[0][col]);
      $tile5.attr('data-row', 'r' + 1);
      this.board[1][col] = this.board[0][col];
      this.board[0][col] = 0;
      break;
  }
  return this.board;
};

Game.prototype.collideBoardDown = function() {
self = this;
for (var row = 3; row > 0 ; row--) {
  for (var col = 0; col < 4; col++) {
    if (( board[row][col] === board[row-1][col]) && (board[row][col] !== 0)) {
      self.collideDown(row, col);
    }
  }
}
return this.board;
};
//   for (var bcol = 0; bcol < 4 ; bcol++) {
//     for (var row = 3; row > 0; row--) {
//       //console.log(row[x-1]);
//       if (( board[row][bcol] === board[row-1][bcol]) && board[row][bcol] !== 0) {
//         board[row][bcol] = (board[row][bcol] + board[row-1][bcol]);
//         self.scoring(board[row][bcol]);
//         board[row-1][bcol] = 0;
//         switch(row) {
//           case 3:
//             self.moveDown([row-2, bcol]);
//             self.moveDown([row-3, bcol]);
//             break;
//           case 2:
//             self.moveDown([row-2, bcol]);
//             break;
//           }
//         }
//     }
//   }
//   return this.board;
// };

Game.prototype.moveTile = function(direction) {
// Game method here
board = this.board;
self = this;
  switch(direction) {
    case 38: //up
      //self.moveBoardUp();
      //self.collideBoardUp();
      //self.randTile();
      console.log('up');
      break;
    case 40: //down
      self.moveBoardDown();
      self.collideBoardDown();
      self.randTile();
      console.log('down');
      break;
    case 37: //left
      // self.moveBoardLeft();
      // self.collideBoardLeft();
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
  game.randTile();
  game.randTile();
  col = 2;
  rowo =3;
  row2 = 1;
  row3 = 0;
  row4 = 2;
  game.board[rowo][col] = 2;
  game.board[row2][col] = 2;
  game.board[row4][col] = 2;
  game.board[row3][col] = 2;
  $('#gameboard').append('<div class="tile" data-row="r'+ rowo +'" data-col="c'+ col +'" data-val="'+ 2 +'">'+ 2 +'</div>');
  $('#gameboard').append('<div class="tile" data-row="r'+ row2 +'" data-col="c'+ col +'" data-val="'+ 2 +'">'+ 2 +'</div>');
  $('#gameboard').append('<div class="tile" data-row="r'+ row3 +'" data-col="c'+ col +'" data-val="'+ 2 +'">'+ 2 +'</div>');
  $('#gameboard').append('<div class="tile" data-row="r'+ row4 +'" data-col="c'+ col +'" data-val="'+ 2 +'">'+ 2 +'</div>');
  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      game.moveTile(event.which);
    }
  });
});
