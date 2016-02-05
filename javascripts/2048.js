var Game = function() {
  this.board = [[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];
  this.addTile();
  this.addTile();
  this.score = 0;
  this.isGettingNewTile = true;
};

Game.prototype.getTile = function(row, col, val) {
  if (val !== undefined) {
    return '.tile[data-row="r' + row + '"][data-col="c' + col + '"][data-val="' + val + '"]';
  } else {
    return '.tile[data-row="r' + row + '"][data-col="c' + col + '"]';
  }
};

Game.prototype.isGameLost = function() {
  var matches;
  var i;
  var j;

  if (this.getEmptySpaces().length === 0) {
    // check if there are any adjacent tiles of the same value
    matches = 0;

    // check for matches within rows
    for (i = 0; i < this.board.length - 1; i++) {
      for (j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === this.board[i][j+1]) {
          matches += 1;
        }
      }
    }

    // check within columns
    for (i = 0; i < this.board.length; i++) {
      for (j = 0; j < this.board[i].length - 1; j++) {
        if (this.board[i][j] === this.board[i][j+1]) {
          matches += 1;
        }
      }
    }

    if (matches === 0) {
      console.log("GAME OVER");
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

Game.prototype.shouldGetNewTile = function(before, after) {
  if (JSON.stringify(before) === JSON.stringify(after)) {
    console.log("no tile for you");
    this.isGettingNewTile = false;
  } else if (this.getEmptySpaces().length === 0) {
    this.isGettingNewTile = false;
  } else {
    this.isGettingNewTile = true;
  }
};

Game.prototype.moveTile = function(tile, direction) {
  var b = this.board;
  var boardDupe = [[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];
  var g = this;
  var currentTile;
  var currentRow;
  var currentCol;
  var locations = [];
  var tileRow;
  var tileCol;
  var tileVal;
  var $adjTile;
  var $newTile;
  var score;

  for (var i = 0; i < this.board.length; i++) {
    for (var j = 0; j < this.board[i].length; j++) {
      boardDupe[i][j] = this.board[i][j];
    }
  }

  for (var t = 0; t < tile.length; t++) {
    var curr = tile[t];
    locations.push([$(curr).attr("data-row").replace("r", ""), $(curr).attr("data-col").replace("c", "")]);
  }
  switch(direction) {
    case 38: //up
      console.log('up');
      locations.sort();
      locations.forEach(function(loc) {
        currentTile = $(g.getTile(loc[0],loc[1]));
        currentRow = Number(loc[0]);
        while ((currentRow-1) >= 0 && b[currentRow-1][loc[1]] === 0) {
          b[currentRow-1][loc[1]] = b[currentRow][loc[1]];        // set value of new space
          b[currentRow][loc[1]] = 0;                              // vacate current space
          $(currentTile).attr("data-row", "r" + (currentRow-1));  // update tile attributes
          currentRow--;
        }
        // check if above tile is a match AND the match is not a new tile
        tileRow = Number($(currentTile).attr("data-row").replace("r", ""));
        tileCol = Number($(currentTile).attr("data-col").replace("c", ""));
        tileVal = Number($(currentTile).attr("data-val"));
        $adjTile = $(g.getTile(tileRow - 1, tileCol));
        if (tileRow > 0 && Number($adjTile.attr("data-val")) === tileVal && $adjTile.attr("data-new") !== "true" ) {
          console.log("MATCH");
          // delete the other two tiles
          $(currentTile).remove();
          $adjTile.remove();
          // create a new tile with a flag on it
          $newTile = $('<div class="tile"></div>');
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
          g.score += Number(tileVal * 2);
          $("#scoreboard").html("<p>" + g.score + "</p>");
        }
      });
      // remove flags
      $('.tile').attr("data-new", "false");

      // update whether a new tile should be added
      g.shouldGetNewTile(boardDupe, g.board);

      break;

    case 40: //down
      console.log('down');
      locations.sort().reverse();
      locations.forEach(function(loc) {
        currentTile = $(g.getTile(loc[0],loc[1]));
        currentRow = Number(loc[0]);
        while ((currentRow+1) <= 3 && b[currentRow+1][loc[1]] === 0) {
          b[currentRow+1][loc[1]] = b[currentRow][loc[1]];  // set value of new space
          b[currentRow][loc[1]] = 0; // vacate current space
          $(currentTile).attr("data-row", "r" + (currentRow+1));  // update tile attributes
          currentRow++;
        }
        // check if below tile is a match AND the match is not a new tile
        tileRow = Number($(currentTile).attr("data-row").replace("r", ""));
        tileCol = Number($(currentTile).attr("data-col").replace("c", ""));
        tileVal = Number($(currentTile).attr("data-val"));
        $adjTile = $(g.getTile(tileRow + 1, tileCol));
        if (tileRow < 3 && Number($adjTile.attr("data-val")) === tileVal && $adjTile.attr("data-new") !== "true" ) {
          console.log("MATCH");
          // delete the other two tiles
          $(currentTile).remove();
          $adjTile.remove();
          // create a new tile with a flag on it
          $newTile = $('<div class="tile"></div>');
          $newTile.attr("data-row", "r" + (tileRow + 1));
          $newTile.attr("data-col", "c" + tileCol);
          $newTile.attr("data-val", tileVal * 2);
          $newTile.attr("data-new", "true");
          $newTile.html(tileVal * 2);
          $("#gameboard").append($newTile.hide());
          $newTile.delay(200).fadeIn('fast');
          // update the board
          b[tileRow + 1][tileCol] = tileVal * 2;
          b[tileRow][tileCol] = 0;
          g.score += Number(tileVal * 2);
          $("#scoreboard").html("<p>" + g.score + "</p>");
        }
      });
      $('.tile').attr("data-new", "false");

      // update whether a new tile should be added
      g.shouldGetNewTile(boardDupe, g.board);
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
        currentTile = $(g.getTile(loc[0],loc[1]));
        currentCol = Number(loc[1]);
        while ((currentCol -1 ) >= 0 && b[loc[0]][currentCol - 1] === 0) {
          b[loc[0]][currentCol-1] = b[loc[0]][currentCol];  // set value of new space
          b[loc[0]][currentCol] = 0; // vacate current space
          $(currentTile).attr("data-col", "c" + (currentCol - 1));  // update tile attributes
          currentCol--;
        }
        // check if next left tile is a match AND the match is not a new tile
        tileRow = Number($(currentTile).attr("data-row").replace("r", ""));
        tileCol = Number($(currentTile).attr("data-col").replace("c", ""));
        tileVal = Number($(currentTile).attr("data-val"));
        // this is where the error is - tileRow is adding 1 to numbers above 3
        $adjTile = $(g.getTile(tileRow, tileCol - 1));
        if (tileCol > 0 && Number($adjTile.attr("data-val")) === tileVal && $adjTile.attr("data-new") !== "true" ) {
          console.log("MATCH");
          // delete the other two tiles
          $(currentTile).remove();
          $adjTile.remove();
          // create a new tile with a flag on it
          $newTile = $('<div class="tile"></div>');
          $newTile.attr("data-row", "r" + (tileRow));
          $newTile.attr("data-col", "c" + (tileCol - 1));
          $newTile.attr("data-val", tileVal * 2);
          $newTile.attr("data-new", "true");
          $newTile.html(tileVal * 2);
          $("#gameboard").append($newTile.hide());
          $newTile.delay(200).fadeIn('fast');
          // update the board
          b[tileRow][tileCol - 1] = tileVal * 2;
          b[tileRow][tileCol] = 0;
          g.score += Number(tileVal * 2);
          $("#scoreboard").html("<p>" + g.score + "</p>");
          console.log(g.score);
        }
      });
      $('.tile').attr("data-new", "false");

      // update whether a new tile should be added
      g.shouldGetNewTile(boardDupe, g.board);
      break;

    case 39: //right
      console.log('right');
      locations.sort(byColumn).reverse();
      locations.forEach(function(loc) {
        currentTile = $(g.getTile(loc[0],loc[1]));
        currentCol = Number(loc[1]);
        while ((currentCol+1) <= 3 && b[loc[0]][currentCol+1] === 0) {
          b[loc[0]][currentCol+1] = b[loc[0]][currentCol];  // set value of new space
          b[loc[0]][currentCol] = 0; // vacate current space
          $(currentTile).attr("data-col", "c" + (currentCol+1));  // update tile attributes
          currentCol++;
        }
        // check if below tile is a match AND the match is not a new tile
        tileRow = Number($(currentTile).attr("data-row").replace("r", ""));
        tileCol = Number($(currentTile).attr("data-col").replace("c", ""));
        tileVal = Number($(currentTile).attr("data-val"));
        $adjTile = $(g.getTile(tileRow, tileCol + 1));
        if (tileCol < 3 && Number($adjTile.attr("data-val")) === tileVal && $adjTile.attr("data-new") !== "true" ) {
          console.log("MATCH");
          // delete the other two tiles
          $(currentTile).remove();
          $adjTile.remove();
          // create a new tile with a flag on it
          $newTile = $('<div class="tile"></div>');
          $newTile.attr("data-row", "r" + (tileRow));
          $newTile.attr("data-col", "c" + (tileCol + 1));
          $newTile.attr("data-val", tileVal * 2);
          $newTile.attr("data-new", "true");
          $newTile.html(tileVal * 2);
          $("#gameboard").append($newTile.hide());
          $newTile.delay(200).fadeIn('fast');
          // update the board
          b[tileRow][tileCol + 1] = tileVal * 2;
          b[tileRow][tileCol] = 0;
          g.score += Number(tileVal * 2);
          $("#scoreboard").html("<p>" + g.score + "</p>");
          // console.log(g.score);
        }
      });
      $('.tile').attr("data-new", "false");

      // update whether a new tile should be added
      g.shouldGetNewTile(boardDupe, g.board);
      break;
  }
};
Game.prototype.getEmptySpaces = function() {
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
  var avail = this.getEmptySpaces();
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


Game.prototype.won = function(){
  for (i = 0; i < this.board.length; i++) {
    for (j = 0; j < this.board[i].length; j++) {
      if (this.board[i][j] === 2048) {
        console.log("You win!!!");
        return true;
      }
    }
  }
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
      $("#scoreboard").html("<p> Score: " + game.score + "</p>");
      if (game.won() !== true && game.isGettingNewTile === true) {
        game.addTile();
      } else if (game.isGameLost() === true) {
        console.log("GAME OVER");
      } else if (game.won() === true){
        swal({
          title: "YOU WON!",
          text: "Do you want to play again?",
          showCancelButton: false,
          closeOnConfirm: true,
          confirmButtonText: "Yes, play again!",
          confirmButtonColor: "#006666"
        }, function() {
            window.location.reload();
        });
      }
    }
  });
});
