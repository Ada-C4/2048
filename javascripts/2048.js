var Game = function() {
  this.board = this.newBoard();
  this.score = 0;
  this.arrows = [37, 38, 39, 40];
  this.scoreContainer  = document.querySelector(".score-container");
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

  $("#gameboard").append("<div class='tile' data-row='r" + rowNum1 + "', data-col='c" + colNum1 + "' data-val='" + randValue1 + "'></div>");
  $("#gameboard").append("<div class='tile' data-row='r" + rowNum2 + "', data-col='c" + colNum2 + "' data-val='" + randValue2 + "'></div>");

  return board;
};

Game.prototype.moveTile = function(tile, direction) {
  var column;
  var row;
  var rowToUpdate;
  var columnToUpdate;
  var tileToDelete;
  var rowToDelete;
  var columnToDelete;

  switch(direction) {
    case 38: //up
      tile = tile.sort(function(a,b){
        return a.dataset.row[1] - b.dataset.row[1];
      });
      // move tiles
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
          // combine tiles
          if (row[1] - 1 >= 0) {
            rowToUpdate = row[1] - 1;
            columnToUpdate = column[1];
            tileToDelete = tile[i];
            rowToDelete = row[1];
            columnToDelete = column[1];
            if (this.board[rowToUpdate][columnToUpdate] == tile[i].dataset.val) {
              this.combineTile(rowToUpdate, columnToUpdate, tileToDelete, rowToDelete, columnToDelete);
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
        // move tiles
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
          // combine tiles
          if (parseInt(row[1]) + 1 <= 3) {
            rowToUpdate = parseInt(row[1]) + 1;
            columnToUpdate = column[1];
            tileToDelete = tile[i];
            rowToDelete = row[1];
            columnToDelete = column[1];
            if (this.board[rowToUpdate][columnToUpdate] == tile[i].dataset.val) {
              this.combineTile(rowToUpdate, columnToUpdate, tileToDelete, rowToDelete, columnToDelete);
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
        // move tiles
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
          // combine tiles
          if (column[1] - 1 >= 0) {
            rowToUpdate = row[1];
            columnToUpdate = column[1] - 1;
            tileToDelete = tile[i];
            rowToDelete = row[1];
            columnToDelete = column[1];
            if (this.board[rowToUpdate][columnToUpdate] == tile[i].dataset.val) {
              this.combineTile(rowToUpdate, columnToUpdate, tileToDelete, rowToDelete, columnToDelete);
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
        // move tiles
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
          // combine tiles
          if (parseInt(column[1]) + 1 <= 3) {
            rowToUpdate = row[1];
            columnToUpdate = parseInt(column[1]) + 1;
            tileToDelete = tile[i];
            rowToDelete = row[1];
            columnToDelete = column[1];
            if (this.board[rowToUpdate][columnToUpdate] == tile[i].dataset.val) {
              this.combineTile(rowToUpdate, columnToUpdate, tileToDelete, rowToDelete, columnToDelete);
            }
          }
        }
      }
      break;
    }
};

Game.prototype.combineTile = function(rowToUpdate, columnToUpdate, tile, rowToDelete, columnToDelete) {
  //update array board
  this.board[rowToUpdate][columnToUpdate] *= 2;
  newVal = this.board[rowToUpdate][columnToUpdate];
  this.board[rowToDelete][columnToDelete] = 0;
  //delete extra tile and update value
  tile.remove();
  updateTile = $(".tile[data-row=\"r" + rowToUpdate + "\"][data-col=\"c" + columnToUpdate + "\"]");
  updateTile[0].dataset.val = newVal;
  // update score
  this.updateScore(newVal);
};


Game.prototype.updateScore = function(value) {
  this.score += value;
  $(".score-container")[0].innerHTML = this.score;

  var difference = value;
  this.scoreContainer = document.querySelector(".score-container");
  this.scoreContainer.textContent = this.score;

  if (difference > 0) {
    var addition = document.createElement("div");
    addition.classList.add("score-addition");
    addition.textContent = "+" + difference;

    this.scoreContainer.appendChild(addition);
  }
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
    $("#gameboard").append("<div class='tile' data-row='r" + randRow + "', data-col='c" + randCol + "' data-val='" + randValue + "'></div>");
    this.board[randRow][randCol] = randValue;
  } else {
    this.newTile();
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

  return loser;
};

Game.prototype.gameWin = function() {
  var board = this.board;
  var winner = false;

  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j] === 2048) {
        winner = true;
      }
    }
  }
  return winner;
};

Game.prototype.gameWinAlert = function(){
  swal({
    title: "Congratulations! You won!",
    text: "Do you want to play again?",
    imageUrl: "../assets/images/win.png",
    showCancelButton: true,
    closeOnConfirm: true,
    confirmButtonText: "Yes, play again!",
    confirmButtonColor: "#006666"
  }, function() {
      window.location.reload();
  });
};

Game.prototype.gameOverAlert = function() {
  swal({
    title: "Game Over!",
    text: "Do you want to play again?",
    imageUrl: "assets/images/lose.png",
    showCancelButton: false,
    closeOnConfirm: true,
    confirmButtonText: "Yes, play again!",
    confirmButtonColor: "#006666"
  }, function() {
      window.location.reload();
  });
};

Game.prototype.isMoveAvailable = function(tile, direction) {
  switch(direction) {
    case 38: //up
      var move = [];
      for (var i = 0; i < tile.length; i++) {
        row = tile[i].dataset.row;
        column = tile[i].dataset.col;
        if (row[1] - 1 >= 0) {
          if ((this.board[row[1] - 1][column[1]] === 0) || (this.board[row[1] - 1][column[1]] == this.board[row[1]][column[1]])) {
            move.push(true);
          } else {
            move.push(false);
          }
        }
      }
      if (move.includes(true)){
        return true;
      } else {
        return false;
      }
      break;
    case 40: //down
      move = [];
      for (i = 0; i < tile.length; i++) {
        row = tile[i].dataset.row;
        column = tile[i].dataset.col;
        if (parseInt(row[1]) + 1 <= 3) {
          if ((this.board[parseInt(row[1]) + 1][column[1]] === 0) || (this.board[parseInt(row[1]) + 1][column[1]] == this.board[parseInt(row[1])][column[1]])) {
            move.push(true);
          } else {
            move.push(false);
          }
        }
      }
      if (move.includes(true)){
        return true;
      } else {
        return false;
      }
      break;
    case 37: //left
      move = [];
      for (i = 0; i < tile.length; i++) {
        row = tile[i].dataset.row;
        column = tile[i].dataset.col;
        if (column[1] - 1 >= 0) {
          if ((this.board[row[1]][column[1] - 1] === 0) || (this.board[row[1]][column[1] - 1] == this.board[row[1]][column[1]])) {
            move.push(true);
          } else {
            move.push(false);
          }
        }
      }
      if (move.includes(true)){
        return true;
      } else {
        return false;
      }
      break;
    case 39: //right
      move = [];
      for (i = 0; i < tile.length; i++) {
        row = tile[i].dataset.row;
        column = tile[i].dataset.col;
        if (parseInt(column[1]) + 1 <= 3) {
          if ((this.board[row[1]][parseInt(column[1]) + 1] === 0) || (this.board[row[1]][parseInt(column[1]) + 1] == this.board[row[1]][parseInt(column[1])])) {
            move.push(true);
          } else {
            move.push(false);
          }
        }
      }
      if (move.includes(true)){
        return true;
      } else {
        return false;
      }
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
        if (game.gameWin()){
          game.gameWinAlert();
        }
        setTimeout(function() { game.newTile(); }, 200);
      } else if (game.gameOver() && !(game.isMoveAvailable(tile, 37) || game.isMoveAvailable(tile, 38) || game.isMoveAvailable(tile, 39) || game.isMoveAvailable(tile, 40))) {
        game.gameOverAlert();
      }
    }
  });

  $(".new-game-btn").click(function() {
    game.resetGame();
  });
});

$.fn.preload = function() {
  this.each(function(){
    $('<img/>')[0].src = this;
  });
};

$(['assets/images/2.png','assets/images/4.png','assets/images/8.png','assets/images/16.png','assets/images/32.png','assets/images/64.png','assets/images/128.png','assets/images/256.png','assets/images/512.png','assets/images/2048.png','assets/images/1024.png']).preload();
