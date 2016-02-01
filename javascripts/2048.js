var Game = function() {
  // Game logic and initialization here
  this.board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  this.score = 0;
  this.arrows = [37, 38, 39, 40];
};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      console.log(tile);
      var row = tile[0].dataset.row;
      if (row[1] - 1 >= 0) {
        tile[0].dataset.row = row[0] + (parseInt(row[1]) - 1);
        this.updateBoard(tile);
      }
      break;
    case 40: //down
      var row = tile[0].dataset.row;
      if (parseInt(row[1]) + 1 <= 3) {
        tile[0].dataset.row = row[0] + (parseInt(row[1]) + 1);
      }
      break;
    case 37: //left
      var column = tile[0].dataset.col;
      if (column[1] - 1 >= 0) {
        tile[0].dataset.col = column[0] + (parseInt(column[1]) - 1);
      }
      break;
    case 39: //right
      var column = tile[0].dataset.col;
      if (parseInt(column[1]) + 1 <= 3) {
        tile[0].dataset.col = column[0] + (parseInt(column[1]) + 1);
      }
      break;
  }
};

Game.prototype.updateBoard = function(tile, game) {
  var row = tile[0].dataset.row[1];
  var column = tile[0].dataset.col[1];
  this.board[row][column] = tile[0].dataset.val;
  console.log(this.board);
};

Game.prototype.newTile = function(tile, direction) {

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
