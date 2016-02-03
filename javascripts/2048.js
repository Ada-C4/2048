var Game = function() {
  // Game logic and initialization here
  this.board = [[0, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 2, 0]];
  this.score = 0;
  this.arrows = [37, 38, 39, 40];
};

Game.prototype.moveTile = function(tile, direction) {
  var column;
  var row;
  // Game method here
  // console.log(this.board);
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
              this.board[row[1] - 1][column[1]] *= 2;
              this.board[row[1]][column[1]] = 0;
              //delete extra tile and update value
              var tileToDelete = tile[i];
              setTimeout(function() {
                tileToDelete.remove();
                var updateTile = $(".tile[data-row=\"r" + (row[1] - 1) + "\"][data-col=\"c" + column[1] + "\"]");
                console.log(updateTile);
                var newVal = updateTile[0].dataset.val * 2;
                updateTile[0].dataset.val = newVal;
                updateTile[0].innerHTML = newVal;
               }, 200);
            }
          }
          console.log(this.board);
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
        }
      }
      console.log(this.board);
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
        }
      }
      console.log(this.board);
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
        }
      }
      console.log(this.board);
      break;
    }
};


Game.prototype.combineTiles = function() {

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
  // console.log("new tile");
  var randValue = Math.random() < 0.9 ? 2 : 4;
  var randCol = Math.floor(Math.random() * 4);
  var randRow = Math.floor(Math.random() * 4);

  if (this.board[randRow][randCol] === 0) {
    $("#gameboard").append("<div class='tile' data-row='r" + randRow + "', data-col='c" + randCol + "' data-val='" + randValue + "'>" + randValue + "</div>");
    this.board[randRow][randCol] = randValue;
    // console.log(this.board[randRow][randCol]);
  } else {
    this.newTile();
    this.gameOver();
  }
};

Game.prototype.gameOver = function(){
  var loser;
  var board = this.board;
  var zeros = [];

  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j] === 0){
        zeros.push(board[i][j]);
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

  if (loser) {
    gameOverAlert();
    this.board = [[0, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 2, 0]];
  }
};

Game.prototype.availableMove = function(){

};

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();

  $('body').keydown(function(event){
    if (game.arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');
      game.moveTile(tile, event.which);
      setTimeout(function() { game.newTile(); }, 200);
    }
  });
});
