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
      console.log('up');
      console.log(tile);
      var row = tile[0].dataset.row;
      if (row[1] - 1 >= 0) {
        tile[0].dataset.row = row[0] + (parseInt(row[1]) - 1);
      }
      game.newTile();
      break;
    case 40: //down
      console.log('down');
      var row = tile[0].dataset.row;
      if (parseInt(row[1]) + 1 <= 3) {
        tile[0].dataset.row = row[0] + (parseInt(row[1]) + 1);
      };
      game.newTile();
      break;
    case 37: //left
      console.log('left');
      var column = tile[0].dataset.col;
      if (column[1] - 1 >= 0) {
        tile[0].dataset.col = column[0] + (parseInt(column[1]) - 1);
      };
      game.newTile();
      break;
    case 39: //right
      console.log('right');
      var column = tile[0].dataset.col;
      if (parseInt(column[1]) + 1 <= 3) {
        tile[0].dataset.col = column[0] + (parseInt(column[1]) + 1);
      };
      game.newTile();
      break;
  }
};

Game.prototype.newTile = function(cell, direction) {
  var randCol = Math.floor(Math.random() * 4)
  var randRow = Math.floor(Math.random() * 4)

  $("#gameboard").append("<div class='tile' data-row='r" + randRow + "', data-col='c" + randCol + "' data-val='2'>2</div>");
}

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
