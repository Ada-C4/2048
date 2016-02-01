var Game = function() {
  this.board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
};

Game.prototype.board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];

Game.prototype.randTile = function() {
  console.log(this.board);
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
  return [i_board, j_board];
};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      console.log('up');
      break;
    case 40: //down
      console.log('down');
      break;
    case 37: //left
      console.log('left');
      break;
    case 39: //right
      console.log('right');
      break;
  }
};

Game.prototype.moveLeft = function(tile) {
  // tile[0] is the row
  // tile[1] is the column position
  var row = tile[0];
  var col = tile[1];
  var value = this.board[row][col];

  var board_row = this.board[tile[0]];

  for(j=0; j<4; j++) {
    if (board_row[j] === 0) {
      this.board[row][j] = value;
      this.board[row][col] = 0;
      break;
    }
  }
};

// $(document).ready(function() {
//   console.log("ready to go!");
//   // Any interactive jQuery functionality
//   var game = new Game();
//
//   $('body').keydown(function(event){
//     var arrows = [37, 38, 39, 40];
//     if (arrows.indexOf(event.which) > -1) {
//       var tile = $('.tile');
//
//       game.moveTile(tile, event.which);
//     }
//   });
// });
//
var game = new Game();
game.randTile([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
game.moveLeft(game.randTile([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]));
//game.randTile([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
