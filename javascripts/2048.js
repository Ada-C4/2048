var Game = function() {
  // Game logic and initialization here
  this.highScore = 0;
};

var tileCount = 0;

var Tile = function (row, col) {
  // make new Tiles
  this.row = row;
  this.col = col;
  // update so it can also be 4
  this.val = 2;
  this.moveCount = 0;
  this.tileId = String(tileCount++);
};

Game.prototype.startGame = function () {
  $('.tile').remove();
  this.gameOver = false;
  this.gameWon = false;
  this.board = [];
  this.score = 0;
  $('#score').html('Score: '+ this.score);
  this.addTile();
  this.addTile();
};

Game.prototype.updateGameWon = function(){
  var values = this.board.map(function(tile){ return tile.val; });
  if (values.includes(2048)) { this.gameWon = true; }
};

Game.prototype.checkGameOver = function () {
  if (this.board.length !== 16) {
    return;
  } else {
    var groupedTiles = _.groupBy(this.board, function(tile) {
        return tile.val;
      });
    for (var val in groupedTiles) {
      var tiles = groupedTiles[val];
      for (var i=0; i < tiles.length; i++) {
        var oddCol = tiles[i].col % 2 === 1;
        var colMod;
        if (oddCol) {
          colMod = 1;
        } else {
          colMod = 0;
        }
        var oddRow = tiles[i].row % 2 === 1;
        var rowMod;
        if (oddRow) {
          rowMod = 1;
        } else {
          rowMod = 0;
        }
        var match = _.find(tiles, function(tile) {
          return (tile.row === tiles[i].row && tile.col % 2 === colMod) || (tile.col === tiles[i].col && tile.row % 2 === rowMod); 
        });
        if (match) { return; }
      }
    }
    this.gameOver = true;
    console.log(this.gameOver);
  }
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
  var addTileCallback = function () { this.addTile(); }.bind(this) ;
  // Game method here
  var initMoves = this.board.map(function(tile) {return tile.moveCount;});
  switch(direction) {
    case 87:
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
            this.score += colArray[row+1].val;
            colArray[row+1].row = row;
            colArray[row+1].moveCount++;
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
          } else if (colArray[row].row !== row){
            colArray[row].row = row;
            $("#" + colArray[row].tileId).attr("data-row", "r" + row);
            colArray[row].moveCount++;
          }
        }
      };
      break;

    case 83:
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
            this.score += colArray[arrayIndex-1].val;
            colArray[arrayIndex-1].row = row;
            colArray[arrayIndex-1].moveCount++;
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
            colArray[arrayIndex].moveCount++;
            $("#" + colArray[arrayIndex].tileId).attr("data-row", "r" + row);
          }
        }
      };
      break;

    case 65:
    case 37: //left
      groupedTiles = _.groupBy(this.board, function(tile) {
          return tile.row;
        });
      // iterate through each row
      func = function(key){
        var rowArray = groupedTiles[key];
        rowArray = _.sortBy(rowArray, function(tile){ return tile.col; });
        for (var col = 0; col < rowArray.length; col++) {
          // if combining
          if (rowArray[col] && rowArray[col+1] && rowArray[col].val === rowArray[col+1].val) {
            rowArray[col+1].val *= 2;
            this.score += rowArray[col+1].val;
            rowArray[col+1].col = col;
            rowArray[col+1].moveCount++;
            // change HTML of tile
            $("#" + rowArray[col+1].tileId).attr("data-col", "c" + col);
            $("#" + rowArray[col+1].tileId).attr("data-val", rowArray[col+1].val);
            $("#" + rowArray[col+1].tileId).html(rowArray[col+1].val);
            // delete from board
            var deleteTileIndex = _.indexOf(this.board, rowArray[col]);
            this.board.splice(deleteTileIndex, 1);
            // delete current html object
            $("#" + rowArray[col].tileId).remove();
            // delete current tile object)
            rowArray.splice(col, 1);
            // if not combining
          } else {
            rowArray[col].col = col;
            rowArray[col].moveCount++;
            $("#" + rowArray[col].tileId).attr("data-col", "c" + col);
          }
        }
      };
    break;

    case 68:
    case 39: //right
    groupedTiles = _.groupBy(this.board, function(tile) {
          return tile.row;
        });
      // iterate through each column
      func = function(key){
        var rowArray = groupedTiles[key];
        rowArray = _.sortBy(rowArray, function(tile){ return tile.col; });
        for (var i = 0; i < rowArray.length; i++) {
          // if combining
          var arrayIndex = rowArray.length - i - 1,
              col = 3 - i;
          if (rowArray[arrayIndex] && rowArray[arrayIndex-1] && rowArray[arrayIndex].val === rowArray[arrayIndex-1].val) {
            rowArray[arrayIndex-1].val *= 2;
            this.score += rowArray[arrayIndex-1].val;
            rowArray[arrayIndex-1].col = col;
            rowArray[arrayIndex-1].moveCount++;
            // change HTML of tile
            $("#" + rowArray[arrayIndex-1].tileId).attr("data-col", "c" + col);
            $("#" + rowArray[arrayIndex-1].tileId).attr("data-val", rowArray[arrayIndex-1].val);
            $("#" + rowArray[arrayIndex-1].tileId).html(rowArray[arrayIndex-1].val);
            // delete from board
            var deleteTileIndex = _.indexOf(this.board, rowArray[arrayIndex]);
            this.board.splice(deleteTileIndex, 1);
            // delete current html object
            $("#" + rowArray[arrayIndex].tileId).remove();
            // delete current value (tile object)
            rowArray.splice(arrayIndex, 1);
            // if not combining
          } else {
            rowArray[arrayIndex].col = col;
            rowArray[arrayIndex].moveCount++;
            $("#" + rowArray[arrayIndex].tileId).attr("data-col", "c" + col);
          }
        }
      };
      break;
  }

  func = _.bind(func, this);
  Object.keys(groupedTiles).forEach(function(key) { return func(key); });
  afterMoves = this.board.map(function(tile) {return tile.moveCount;});
  matching = afterMoves.every(function(element, index) { return initMoves[index] === element; });
  if (!matching) {
    setTimeout(addTileCallback, 200);
  }
  if (this.gameWon === false) {
    this.updateGameWon();
    if (this.gameWon) {
      alert('Game won!');
    }
  }
};

Game.prototype.updateGameOver = function(){
};

$(document).ready(function() {
  // Any interactive jQuery functionality
  var game = new Game();
  game.startGame();
  $('body').keydown(function(event){
    var directions = [37, 38, 39, 40, 87, 65, 83, 68];
    if (directions.indexOf(event.which) > -1) {
      var tile = $('.tile');
      game.moveTile(tile, event.which);
      $('#score').html('Score: ' + game.score);
    }

  $('#reset').click(function () {
    game.startGame();
  });

  });
});
