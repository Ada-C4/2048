var Game = function() {
  this.board = [[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];
  this.addTile();
  this.addTile();
};

Game.prototype.getTile = function(row, col, val) {
  if (val !== undefined) {
    return '.tile[data-row="r' + row + '"][data-col="c' + col + '"][data-val="' + val + '"]';
  } else {
    return '.tile[data-row="r' + row + '"][data-col="c' + col + '"]';
  }
};

Game.prototype.moveTile = function(tile, direction) {
  var b = this.board;
  var g = this;
  var currentTile;
  var currentRow;
  var currentCol;
  var locations = [];
  for (var t = 0; t < tile.length; t++) {
    var curr = tile[t];
    locations.push([$(curr).attr("data-row").replace("r", ""), $(curr).attr("data-col").replace("c", "")]);
  }

  switch(direction) {
    case 38: //up
      console.log('up');

      locations.sort();
      locations.forEach(function(loc) {
        currentTile = $(g.getTile(loc[0],loc[1]))[0];
        currentRow = Number(loc[0]);
        while ((currentRow-1) >= 0 && b[currentRow-1][loc[1]] === 0) {
          b[currentRow-1][loc[1]] = b[currentRow][loc[1]];        // set value of new space
          b[currentRow][loc[1]] = 0;                              // vacate current space
          $(currentTile).attr("data-row", "r" + (currentRow-1));  // update tile attributes
          currentRow--;
        }

        // check if above tile is a match AND the match is not a new tile
        var tileRow = $(currentTile).attr("data-row").replace("r", "");
        var tileCol = $(currentTile).attr("data-col").replace("c", "");
        var tileVal = $(currentTile).attr("data-val");
        var $adjTile = $(g.getTile(tileRow - 1, tileCol));
        
        if (tileRow > 0 && $adjTile.attr("data-val") === tileVal && $adjTile.attr("data-new") !== "true" ) {
          console.log("MATCH");
          // delete the other two tiles
          $(currentTile).remove();
          $adjTile.remove();

          // create a new tile with a flag on it
          var $newTile = $('<div class="tile"></div>');
          $newTile.attr("data-row", "r" + (tileRow - 1));
          $newTile.attr("data-col", "c" + tileCol);
          $newTile.attr("data-val", tileVal * 2);
          $newTile.attr("data-new", "true");
          $newTile.html(tileVal * 2);
          $("#gameboard").append($newTile.hide());
          $newTile.delay(200).fadeIn('fast');

          // update the board
          b[tileRow - 1][tileCol] = tileVal * 2;
          b[tileRow][tileCol] = 0;
        }
      });

      // remove flags
      $('.tile').attr("data-new", "false");
      break;

    case 40: //down
      console.log('down');

      locations.sort().reverse();
      locations.forEach(function(loc) {
        currentTile = $('.tile[data-row="r' + loc[0] + '"][data-col="c' + loc[1] + '"]')[0];
        currentRow = Number(loc[0]);
        while ((currentRow+1) <= 3 && b[currentRow+1][loc[1]] === 0) {
          b[currentRow+1][loc[1]] = b[currentRow][loc[1]];  // set value of new space
          b[currentRow][loc[1]] = 0; // vacate current space
          $(currentTile).attr("data-row", "r" + (currentRow+1));  // update tile attributes
          currentRow++;
        }
      });
      break;

    case 37: //left
      console.log('left');

      function byColumn (a, b) {
        if (a[1] === b[1]) {
          return 0;
        } else {
        return (a[1] < b[1]) ? -1 : 1;
        }
      }

      locations.sort(byColumn);
      locations.forEach(function(loc) {
        currentTile = $('.tile[data-row="r' + loc[0] + '"][data-col="c' + loc[1] + '"]')[0];
        currentCol = Number(loc[1]);
        while ((currentCol-1) >= 0 && b[loc[0]][currentCol-1] === 0) {
          b[loc[0]][currentCol-1] = b[loc[0]][currentCol];  // set value of new space
          b[loc[0]][currentCol] = 0; // vacate current space
          $(currentTile).attr("data-col", "c" + (currentCol-1));  // update tile attributes
          currentCol--;
        }
      });
      break;

    case 39: //right
      console.log('right');

      locations.sort(byColumn).reverse();
      locations.forEach(function(loc) {
        currentTile = $('.tile[data-row="r' + loc[0] + '"][data-col="c' + loc[1] + '"]')[0];
        currentCol = Number(loc[1]);
        while ((currentCol+1) <= 3 && b[loc[0]][currentCol+1] === 0) {
          b[loc[0]][currentCol+1] = b[loc[0]][currentCol];  // set value of new space
          b[loc[0]][currentCol] = 0; // vacate current space
          $(currentTile).attr("data-col", "c" + (currentCol+1));  // update tile attributes
          currentCol++;
        }
      });
      break;
  }
};

Game.prototype.get_empty_spaces = function() {
  var indexes = [], i, j;
  for (i = 0; i < this.board.length; i++) {
    for (j = 0; j < this.board[i].length; j++) {
      if (this.board[i][j] === 0) {
        indexes.push([i, j]);
      }
    }
  }
  return indexes;
};

Game.prototype.addTile = function () {
  // create a tile with a value of 2 or 4, based on weighted probability
  var rand = Math.random();

  var val;
  if (rand < 0.9) {
    val = 2;
  } else {
    val = 4;
  }

  // figure out which spaces are empty
  var avail = this.get_empty_spaces();

  // pick one (each is in the form [row, column])
  var dest = avail[Math.floor(Math.random() * avail.length)];

  // add tile to the board in an empty space
  var $div = $('<div class="tile"></div>');
  $div.attr("data-row", "r" + dest[0]);
  $div.attr("data-col", "c" + dest[1]);
  $div.attr("data-val", val);
  $div.html(val);
  $("#gameboard").append($div.hide());
  $div.delay(200).fadeIn('fast');

  // update board structure with placement of new tile
  this.board[dest[0]][dest[1]] = val;
};

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  $('#button').click(function(){
    $('.tile').remove();
    game.board = [[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];
    game.addTile();
    game.addTile();
  });

  var game = new Game();

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');
      game.moveTile(tile, event.which);
      game.addTile();
    }
  });
});
