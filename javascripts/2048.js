var Game = function() {
  // Game logic and initialization here
  this.board = [[0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]];
};

Game.prototype.play = function() {

};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      this.moveTileUp(tile);
      break;
    case 40: //down
      var downRow = parseInt($(".tile").attr("data-row").slice(-1)) + 1;
      if (downRow <= 3) {
        tile[0].setAttribute("data-row", ("r" + downRow));
      }
      break;
    case 37: //left
      var leftCol = parseInt($(".tile").attr("data-col").slice(-1)) - 1;
      if (leftCol >= 0) {
        tile[0].setAttribute("data-col", ("c" + leftCol));
      }
      break;
    case 39: //right
      var rightCol = parseInt($(".tile").attr("data-col").slice(-1)) + 1;
      if (rightCol <= 3) {
        tile[0].setAttribute("data-col", ("c" + rightCol));
      }
      break;
  }
};

Game.prototype.moveTileUp = function(tile) {
  var upRow = parseInt($(".tile").attr("data-row").slice(-1)) - 1;
  var y = upRow;
  var x = parseInt($(".tile").attr("data-col").slice(-1));
  if (upRow >= 0) {
    tile[0].setAttribute("data-row", ("r" + upRow));
    console.log(this.board);
    this.board[x][newY] = this.board[x][y];
    this.board[x][y] = 0;
    console.log(this.board);
  }
};

Game.prototype.setRandoTile = function() {
  $("#gameboard").append("<div></div>");
  $("div").last().addClass("tile");
  $("div").last().attr("data-row", "r0");
  $("div").last().attr("data-col", "c0");
  $("div").last().attr("data-val", "2");
  $("div").last().text("2048");
};



$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();
  game.setRandoTile();
  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');

      game.moveTile(tile, event.which);
    }
  });
});
