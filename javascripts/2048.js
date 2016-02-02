var Game = function() {
  // Game logic and initialization here
  this.gameOver = false;
  this.board = [];
};

var tileCount = 0;

var Tile = function (row, col) {
  // make new Tiles
  this.row = row;
  this.col = col;
  // update so it can also be 4
  this.val = 2;
  this.tileId = tileCount++;
};


Game.prototype.addTile = function () {
  var tilePlaced = false;
  var currentTiles = [];
  this.board.forEach(function (tile) {
    currentTiles.push([tile.row, tile.col]);
  });
  while (!tilePlaced) {
      var col =  Math.floor(Math.random() * (4 - 0)),
          row =  Math.floor(Math.random() * (4 - 0));
      if (!currentTiles.includes([row, col])) {
        tilePlaced = true;
        newTile = new Tile(row, col);
        this.board.push(newTile);
        var $tileHTML = $('<div class="tile '+ newTile.tileId +'" data-row="r'+ row +'", data-col="c'+ col +'" data-val="2">2</div>');
        $('#gameboard').append($tileHTML);
      }
  }
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
  game.addTile();
  game.addTile();
  console.dir(game.board);
  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');
      // console.log(tile);
      // $(tile).attr('data-row', 'r0');
      
      game.moveTile(tile, event.which);
    }

  });
});
