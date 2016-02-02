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
        }
      }
      this.newTile();
      console.log(this.board);
      break;
    case 40: //down
      tile = Array.from(tile);
      tile.sort(function(a,b){
        return (b.dataset.row[1] - a.dataset.row[1]);
      });

      console.log(tile[0]);

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
      // this.newTile();
      break;
    case 37: //left
      tile = tile.sort(function(a,b){
        return a.dataset.col[1] - b.dataset.col[1];
      });

      for (i = 0; i < tile.length; i++) {
        console.log(i);
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
      // this.newTile();
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
        // this.newTile();
      break;
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
  var randCol = Math.floor(Math.random() * 4);
  var randRow = Math.floor(Math.random() * 4);

  $("#gameboard").append("<div class='tile' data-row='r" + randRow + "', data-col='c" + randCol + "' data-val='2'>2</div>");
  this.board[randRow][randCol] = 2;
};

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();

  $('body').keydown(function(event){
    if (game.arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');
      game.moveTile(tile, event.which);
    }
  });
});
