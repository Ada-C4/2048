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
  this.tileId = String(tileCount++);
};


Game.prototype.addTile = function () {
  var tilePlaced = false;
  var currentTiles = [];
  this.board.forEach(function (tile) {
    currentTiles.push([tile.row, tile.col]);
  });
  console.log(currentTiles);
  while (!tilePlaced) {
      var col =  Math.floor(Math.random() * (4 - 0)),
          row =  Math.floor(Math.random() * (4 - 0));
      var sameTile = _.find(this.board, function(tile) { return tile.col === col && tile.row === row; });
      console.log(sameTile);
      if (!sameTile) {
        tilePlaced = true;
        newTile = new Tile(row, col);
        this.board.push(newTile);
        var $tileHTML = $('<div class="tile" id="' + newTile.tileId + '" data-row="r'+ row +'", data-col="c'+ col +'" data-val="2">2</div>');
        $('#gameboard').append($tileHTML);
      }
  }
};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      var groupedTiles = _.groupBy(this.board, function(tile) {
          return tile.col;
        });
      console.log(groupedTiles, Object.keys(groupedTiles), this.board);
      // iterate through each column
      
      var func = function(key){
        var colArray = groupedTiles[key];
        for (var row = 0; row < colArray.length; row++) {
          // if combining
          if (colArray[row] && colArray[row+1]) {
            if (colArray[row].val === colArray[row+1].val) {
              colArray[row+1].val *= 2;
              colArray[row+1].row = row;
              // change HTML of tile
              $("#" + colArray[row+1].tileId).attr("data-row", "r" + row);
              $("#" + colArray[row+1].tileId).attr("data-val", colArray[row+1].val);
              $("#" + colArray[row+1].tileId).html(colArray[row+1].val);
              // delete from board
              var deleteTileIndex = _.indexOf(this.board, colArray[row]);
              this.board.splice(deleteTileIndex, 1);
              // delete current html object
              $("#" + colArray[row].tileId).remove();
              // delete current value (tile object)
              colArray.splice(row, 1);
              // if not combining
            } else {
              colArray[row].row = row;
            }
          }
        }
        console.log(this.board);
      };
      func = _.bind(func, this);
      Object.keys(groupedTiles).forEach(function(key) { return func(key); });
      
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
  // Any interactive jQuery functionality
  var game = new Game();

  game.addTile();
  game.addTile();
  game.addTile();
  game.addTile();
  game.addTile();
  game.addTile();
  game.addTile();
  game.addTile();
  game.addTile();
  game.addTile();
  game.addTile();
  game.addTile();
  game.addTile();
  game.addTile();
  game.addTile();

  // hard coding for moveTile tests
  //
  // var t1 = new Tile(0, 0),
  //     t2 = new Tile(1, 0),
  //     t3 = new Tile(2, 0),
  //     t4 = new Tile(3, 0);
  // game.board = [t1, t2, t3, t4];
  // var $t1HTML = $('<div class="tile" id="'+ t1.tileId +'" data-row="r'+ t1.row +'", data-col="c'+ t1.col +'" data-val="2">2</div>');
  // $('#gameboard').append($t1HTML);
  // var $t2HTML = $('<div class="tile" id="'+ t2.tileId +'" data-row="r'+ t2.row +'", data-col="c'+ t2.col +'" data-val="2">2</div>');
  // $('#gameboard').append($t2HTML);
  // var $t3HTML = $('<div class="tile" id="'+ t3.tileId +'" data-row="r'+ t3.row +'", data-col="c'+ t3.col +'" data-val="2">2</div>');
  // $('#gameboard').append($t3HTML);
  // var $t4HTML = $('<div class="tile" id="'+ t4.tileId +'" data-row="r'+ t4.row +'", data-col="c'+ t4.col +'" data-val="2">2</div>');
  // $('#gameboard').append($t4HTML);

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
