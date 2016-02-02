var Game = function() {
  // Game logic and initialization here
  this.board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  this.score = 0;
  this.arrows = [37, 38, 39, 40];
};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  var game = new Game();
  switch(direction) {
    case 38: //up
      var row = tile[0].dataset.row;
      var column = tile[0].dataset.col;
      while (this.board[row[1] - 1][column[1]] === 0) {
        this.removeFromBoard(tile);
        tile[0].dataset.row = row[0] + (parseInt(row[1]) - 1);
        this.addToBoard(tile);
        row = tile[0].dataset.row;
        if (row[1] - 1 < 0) {
          break;
        }
      }
      game.newTile();
      break;
    case 40: //down
      row = tile[0].dataset.row;
      column = tile[0].dataset.col;
      while (this.board[parseInt(row[1]) + 1][column[1]] === 0) {
        this.removeFromBoard(tile);
        tile[0].dataset.row = row[0] + (parseInt(row[1]) + 1);
        this.addToBoard(tile);
        row = tile[0].dataset.row;
        if (parseInt(row[1]) + 1 > 3) {
          break;
        }
      }
      game.newTile();
      break;
    case 37: //left
      row = tile[0].dataset.row;
      column = tile[0].dataset.col;
      while (this.board[row[1]][column[1] - 1] === 0) {
        this.removeFromBoard(tile);
        tile[0].dataset.col = column[0] + (parseInt(column[1]) - 1);
        this.addToBoard(tile);
        column = tile[0].dataset.col;
        if (column[1] -1 < 0) {
          break;
        }
      }
      game.newTile();
      break;
    case 39: //right
      row = tile[0].dataset.row;
      column = tile[0].dataset.col;
      while (this.board[row[1]][parseInt(column[1]) + 1] === 0) {
        this.removeFromBoard(tile);
        tile[0].dataset.col = column[0] + (parseInt(column[1]) + 1);
        this.addToBoard(tile);
        column = tile[0].dataset.col;
        if (parseInt(column[1]) + 1 > 3) {
          break;
        }
      }
      game.newTile();
      break;
  }
};

Game.prototype.removeFromBoard = function(tile) {
  var row = tile[0].dataset.row[1];
  var column = tile[0].dataset.col[1];
  this.board[row][column] = 0;
};

Game.prototype.addToBoard = function(tile) {
  var row = tile[0].dataset.row[1];
  var column = tile[0].dataset.col[1];
  this.board[row][column] = tile[0].dataset.val;
};

Game.prototype.newTile = function(cell, direction) {
  var randCol = Math.floor(Math.random() * 4);
  var randRow = Math.floor(Math.random() * 4);

  $("#gameboard").append("<div class='tile' data-row='r" + randRow + "', data-col='c" + randCol + "' data-val='2'>2</div>");
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
