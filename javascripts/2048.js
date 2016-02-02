var Game = function() {
  // Game logic and initialization here
  this.gameOver = false;
  this.board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
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

Game.prototype.updateGameOver = function(){
  // has free spaces
  var noZeroes = true,
      pairFound = false;
  this.board.forEach(function(row) {
    noZeroes = noZeroes && row.every(function(val) {
      return val !== 0;
    });
  });
  // if there are no zeroes, the game is not over
  if (!noZeroes) {
    return;
  } else {
    var i = 0;
    while (!pairFound && i < 4) {
      var j = 0;
      while (!pairFound && j < 4) {
        if (this.board[i][j] == this.board[i][j+1] ||
           (this.board[i+1] && this.board[i][j] == this.board[i+1][j])) { 
            pairFound = true; 
        }
        j++;
      }
      i++;
    }
    if (!pairFound) { this.gameOver = true; }
  }
};

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');
      
      game.moveTile(tile, event.which);
    }
  });
});
