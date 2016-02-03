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
  while (!tilePlaced) {
      var col =  Math.floor(Math.random() * (4 - 0)),
          row =  Math.floor(Math.random() * (4 - 0));
      var sameTile = _.find(this.board, function(tile) { return tile.col === col && tile.row === row; });
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
      // iterate through each column
      var func = function(key){
        var colArray = groupedTiles[key];
        colArray = _.sortBy(colArray, function(tile){ return tile.row; });
        for (var row = 0; row < colArray.length; row++) {
          // if combining
          if (colArray[row] && colArray[row+1] && colArray[row].val === colArray[row+1].val) {
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
            $("#" + colArray[row].tileId).attr("data-row", "r" + row);
          }
        }
      };
      func = _.bind(func, this);
      Object.keys(groupedTiles).forEach(function(key) { return func(key); });
      
      break;
    case 40: //down
    groupedTiles = _.groupBy(this.board, function(tile) {
          return tile.col;
        });
      // iterate through each column
      func = function(key){
        var colArray = groupedTiles[key];
        colArray = _.sortBy(colArray, function(tile){ return tile.row; });
        for (var i = 0; i < colArray.length; i++) {
          // if combining
          var arrayIndex = colArray.length - i - 1,
              row = 3 - i;
          if (colArray[arrayIndex] && colArray[arrayIndex-1] && colArray[arrayIndex].val === colArray[arrayIndex-1].val) {
            colArray[arrayIndex-1].val *= 2;
            colArray[arrayIndex-1].row = row;
            // change HTML of tile
            $("#" + colArray[arrayIndex-1].tileId).attr("data-row", "r" + row);
            $("#" + colArray[arrayIndex-1].tileId).attr("data-val", colArray[arrayIndex-1].val);
            $("#" + colArray[arrayIndex-1].tileId).html(colArray[arrayIndex-1].val);
            // delete from board
            var deleteTileIndex = _.indexOf(this.board, colArray[arrayIndex]);
            this.board.splice(deleteTileIndex, 1);
            // delete current html object
            $("#" + colArray[arrayIndex].tileId).remove();
            // delete current value (tile object)
            colArray.splice(arrayIndex, 1);
            // if not combining
          } else {
            colArray[arrayIndex].row = row;
            $("#" + colArray[arrayIndex].tileId).attr("data-row", "r" + row);
          }
        }
      };
      func = _.bind(func, this);
      Object.keys(groupedTiles).forEach(function(key) { return func(key); });
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
  // game.addTile();

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
      game.moveTile(tile, event.which);
    }

  });
});
