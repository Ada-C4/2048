var Game = function() {
  this.board = this.newBoard();
  this.score = 0;
  this.arrows = [37, 38, 39, 40];
};

Game.prototype.newBoard = function(){
  var rand = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, Math.random() < 0.9 ? 2 : 4, Math.random() < 0.9 ? 2 : 4];

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  rand = shuffleArray(rand);
  var board = [];
  for (var i = 0; i < 4; i++) {
    board.push(rand.splice(0,4));
  }

  set = new Set();

  for ( i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j] > 0){
        set.add([i, j, board[i][j]]);
      }
    }
  }

  var array = Array.from(set);
  var rowNum1 = array[0][0];
  var colNum1 = array[0][1];
  var randValue1 = array[0][2];
  var rowNum2 = array[1][0];
  var colNum2 = array[1][1];
  var randValue2 = array[1][2];

  $("#gameboard").append("<div class='tile' data-row='r" + rowNum1 + "', data-col='c" + colNum1 + "' data-val='" + randValue1 + "'>" + randValue1 + "</div>");
  $("#gameboard").append("<div class='tile' data-row='r" + rowNum2 + "', data-col='c" + colNum2 + "' data-val='" + randValue2 + "'>" + randValue2 + "</div>");

  return board;
};

Game.prototype.moveTile = function(tile, direction) {
  var column;
  var row;
  var tileToDelete;
  var rowToUpdate;
  var columnToUpdate;
  var newVal;
  var updateTile;

  switch(direction) {
    case 38: //up
      tile = tile.sort(function(a,b){
        return a.dataset.row[1] - b.dataset.row[1];
      });
      for (var i = 0; i < tile.length; i++) {
        row = tile[i].dataset.row;
        column = tile[i].dataset.col;
        if (row[1] - 1 >= 0) {
          while (this.board[row[1] - 1][column[1]] === 0) {
            this.removeFromBoard(tile[i]);
            tile[i].dataset.row = row[0] + (parseInt(row[1]) - 1);
            this.addToBoard(tile[i]);
            row = tile[i].dataset.row;
            if (row[1] - 1 < 0) {
              break;
            }
          }
          if (row[1] - 1 >= 0) {
            if (this.board[row[1] - 1][column[1]] == tile[i].dataset.val) {
              //update array board
              this.board[(row[1] - 1)][column[1]] *= 2;
              newVal = this.board[(row[1] - 1)][column[1]];
              this.board[row[1]][column[1]] = 0;
              //delete extra tile and update value
              tileToDelete = tile[i];
              rowToUpdate = (row[1] - 1);
              columnToUpdate = column[1];
              // setTimeout(function() {
                tileToDelete.remove();
                updateTile = $(".tile[data-row=\"r" + rowToUpdate + "\"][data-col=\"c" + columnToUpdate + "\"]");
                updateTile[0].dataset.val = newVal;
                updateTile[0].innerHTML = newVal;
              // update score
                this.updateScore(newVal);
              //  }, 200);
            }
          }
          }
        }
      break;
    case 40: //down
      tile = Array.from(tile);
      tile.sort(function(a,b){
        return (b.dataset.row[1] - a.dataset.row[1]);
      });
      for (i = 0; i < tile.length; i++) {
        row = tile[i].dataset.row;
        column = tile[i].dataset.col;
        if (parseInt(row[1]) + 1 <= 3) {
          while (this.board[parseInt(row[1]) + 1][column[1]] === 0) {
            this.removeFromBoard(tile[i]);
            tile[i].dataset.row = row[0] + (parseInt(row[1]) + 1);
            this.addToBoard(tile[i]);
            row = tile[i].dataset.row;
            if (parseInt(row[1]) + 1 > 3) {
              break;
            }
          }
          if (parseInt(row[1]) + 1 <= 3) {
            if (this.board[parseInt(row[1]) + 1][column[1]] == tile[i].dataset.val) {
              //update array board
              this.board[parseInt(row[1]) + 1][column[1]] *= 2;
              newVal = this.board[parseInt(row[1]) + 1][column[1]];
              this.board[row[1]][column[1]] = 0;
              //delete extra tile and update value
              tileToDelete = tile[i];
              rowToUpdate = parseInt(row[1]) + 1;
              columnToUpdate = column[1];
              // setTimeout(function() {
                tileToDelete.remove();
                updateTile = $(".tile[data-row=\"r" + rowToUpdate + "\"][data-col=\"c" + columnToUpdate + "\"]");
                updateTile[0].dataset.val = newVal;
                updateTile[0].innerHTML = newVal;
              // update score
                this.updateScore(newVal);
              //  }, 200);
            }
          }
        }
      }
      break;
    case 37: //left
      tile = tile.sort(function(a,b){
        return a.dataset.col[1] - b.dataset.col[1];
      });

      for (i = 0; i < tile.length; i++) {
        row = tile[i].dataset.row;
        column = tile[i].dataset.col;
        if (column[1] - 1 >= 0) {
          while (this.board[row[1]][column[1] - 1] === 0) {
            this.removeFromBoard(tile[i]);
            tile[i].dataset.col = column[0] + (parseInt(column[1]) - 1);
            this.addToBoard(tile[i]);
            column = tile[i].dataset.col;
            if (column[1] -1 < 0) {
              break;
            }
          }
          if (column[1] - 1 >= 0) {
            if (this.board[row[1]][column[1] - 1] == tile[i].dataset.val) {
              //update array board
              this.board[row[1]][column[1] - 1] *= 2;
              newVal = this.board[row[1]][column[1] - 1];
              this.board[row[1]][column[1]] = 0;
              //delete extra tile and update value
              tileToDelete = tile[i];
              rowToUpdate = row[1];
              columnToUpdate = column[1] - 1;
              // setTimeout(function() {
                tileToDelete.remove();
                updateTile = $(".tile[data-row=\"r" + rowToUpdate + "\"][data-col=\"c" + columnToUpdate + "\"]");
                updateTile[0].dataset.val = newVal;
                updateTile[0].innerHTML = newVal;
              // update score
                this.updateScore(newVal);
              //  }, 200);
            }
          }
        }
      }
      break;
    case 39: //right
      tile = tile.sort(function(a,b){
        return b.dataset.col[1] - a.dataset.col[1];
      });

      for (i = 0; i < tile.length; i++) {
        row = tile[i].dataset.row;
        column = tile[i].dataset.col;
        if (parseInt(column[1]) + 1 <= 3) {
          while (this.board[row[1]][parseInt(column[1]) + 1] === 0) {
            this.removeFromBoard(tile[i]);
            tile[i].dataset.col = column[0] + (parseInt(column[1]) + 1);
            this.addToBoard(tile[i]);
            column = tile[i].dataset.col;
            if (parseInt(column[1]) + 1 > 3) {
              break;
            }
          }
          if (parseInt(column[1]) + 1 <= 3) {
            if (this.board[row[1]][parseInt(column[1]) + 1] == tile[i].dataset.val) {
              //update array board
              this.board[row[1]][parseInt(column[1]) + 1] *= 2;
              newVal = this.board[row[1]][parseInt(column[1]) + 1];
              this.board[row[1]][column[1]] = 0;
              //delete extra tile and update value
              tileToDelete = tile[i];
              rowToUpdate = row[1];
              columnToUpdate = [parseInt(column[1]) + 1];
              // setTimeout(function() {
                tileToDelete.remove();
                updateTile = $(".tile[data-row=\"r" + rowToUpdate + "\"][data-col=\"c" + columnToUpdate + "\"]");
                updateTile[0].dataset.val = newVal;
                updateTile[0].innerHTML = newVal;
              // update score
                this.updateScore(newVal);
              //  }, 200);
            }
          }
        }
      }
      break;
    }
};


Game.prototype.updateScore = function(value) {
  this.score += value;
  $(".score-val")[0].innerHTML = this.score;
};

Game.prototype.removeFromBoard = function(tile) {
  var row = tile.dataset.row[1];
  var column = tile.dataset.col[1];
  this.board[row][column] = 0;
};

Game.prototype.addToBoard = function(tile) {
  var row = tile.dataset.row[1];
  var column = tile.dataset.col[1];
  this.board[row][column] = tile.dataset.val;
};

Game.prototype.newTile = function() {
  var randValue = Math.random() < 0.9 ? 2 : 4;
  var randCol = Math.floor(Math.random() * 4);
  var randRow = Math.floor(Math.random() * 4);

  if (this.board[randRow][randCol] === 0) {
    $("#gameboard").append("<div class='tile' data-row='r" + randRow + "', data-col='c" + randCol + "' data-val='" + randValue + "'>" + randValue + "</div>");
    this.board[randRow][randCol] = randValue;
  } else {
    this.newTile();
    this.gameOver();
  }
};

Game.prototype.gameOver = function(){
  var loser;
  var board = this.board;
  var zeros = [];
  var winner = false;

  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j] === 0){
        zeros.push(board[i][j]);
      } else if (board[i][j] === 2048) {
        winner = true;
      }
    }
  }

  if (zeros.length === 0){
    loser = true;
  } else {
    loser = false;
  }

  var gameOverAlert = function() {
    swal({
      title: "Game Over!",
      text: "Do you want to play again?",
      type: "info",
      showCancelButton: false,
      closeOnConfirm: true,
      confirmButtonText: "Yes, play again!",
      confirmButtonColor: "#ec6c62"
    }, function() {
        window.location.reload();
    });
  };

  var gameWinAlert = function() {
    swal({
      title: "Congratulations! You won!",
      text: "Do you want to play again?",
      type: "info",
      showCancelButton: false,
      closeOnConfirm: true,
      confirmButtonText: "Yes, play again!",
      confirmButtonColor: "#ec6c62"
    }, function() {
        window.location.reload();
    });
  };

  if (loser) {
    this.newBoard();
    gameOverAlert();
  } else if (winner) {
    this.newBoard();
    gameWinAlert();
  }
};

Game.prototype.isMoveAvailable = function(tile, direction) {
  switch(direction) {
    case 38: //up
      var move = [];
      for (var i = 0; i < tile.length; i++) {
        row = tile[i].dataset.row;
        column = tile[i].dataset.col;
        if (row[1] - 1 >= 0) {
          if ((this.board[row[1] - 1][column[1]] == 0) || (this.board[row[1] - 1][column[1]] == this.board[row[1]][column[1]])) {
            move.push(true);
          } else {
            move.push(false);
          }
        }
      }
      if (move.includes(true)){ return true };
      break;
    case 40: //down
      var move = [];
      for (var i = 0; i < tile.length; i++) {
        row = tile[i].dataset.row;
        column = tile[i].dataset.col;
        if (parseInt(row[1]) + 1 <= 3) {
          if ((this.board[parseInt(row[1]) + 1][column[1]] == 0) || (this.board[parseInt(row[1]) + 1][column[1]] == this.board[parseInt(row[1])][column[1]])) {
            move.push(true);
          } else {
            move.push(false);
          }
        }
      }
      if (move.includes(true)){ return true };
      break;
    case 37: //left
      var move = [];
      for (var i = 0; i < tile.length; i++) {
        row = tile[i].dataset.row;
        column = tile[i].dataset.col;
        if (column[1] - 1 >= 0) {
          if ((this.board[row[1]][column[1] - 1] == 0) || (this.board[row[1]][column[1] - 1] == this.board[row[1]][column[1]])) {
            move.push(true);
          } else {
            move.push(false);
          }
        }
      }
      if (move.includes(true)){ return true };
      break;
    case 39: //right
      var move = [];
      for (var i = 0; i < tile.length; i++) {
        row = tile[i].dataset.row;
        column = tile[i].dataset.col;
        if (parseInt(column[1]) + 1 <= 3) {
          if ((this.board[row[1]][parseInt(column[1]) + 1] == 0) || (this.board[row[1]][parseInt(column[1]) + 1] == this.board[row[1]][parseInt(column[1])])) {
            move.push(true);
          } else {
            move.push(false);
          }
        }
      }
      if (move.includes(true)){ return true };
      break;
  }
};

Game.prototype.resetGame = function() {
  // Reset score
  this.score = 0;
  this.updateScore(this.score);
  // Reset tiles on board
  var tiles = $('.tile');
  tiles = Array.from(tiles);
  tiles.forEach(function(tile) {
    tile.remove();
  });
  // Generate two new random tiles;
  this.board = this.newBoard();
};

$(document).ready(function() {
  var game = new Game();

  $('body').keydown(function(event){
    if (game.arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');
      if (game.isMoveAvailable(tile, event.which)){
        game.moveTile(tile, event.which);
        setTimeout(function() { game.newTile(); }, 200);
      }
    }
  });

  $(".new-game-btn").click(function() {
    game.resetGame();
  });
});
