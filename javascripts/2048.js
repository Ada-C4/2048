var Game = function() {
  // Game logic and initialization here
  this.board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
};

Game.prototype.play = function() {

};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      console.log('up');
      var upRow = parseInt($(".tile").attr("data-row").slice(-1)) - 1;
      if (upRow >= 0) {
        tile[0].setAttribute("data-row", ("r" + upRow));
      }
      break;
    case 40: //down
      console.log('down');
      var downRow = parseInt($(".tile").attr("data-row").slice(-1)) + 1;
      if (downRow <= 3) {
        tile[0].setAttribute("data-row", ("r" + downRow));
      }
      break;
    case 37: //left
      console.log('left');
      var leftCol = parseInt($(".tile").attr("data-col").slice(-1)) - 1;
      if (leftCol >= 0) {
        tile[0].setAttribute("data-col", ("c" + leftCol));
      }
      break;
    case 39: //right
      console.log('right');
      var rightCol = parseInt($(".tile").attr("data-col").slice(-1)) + 1;
      if (rightCol <= 3) {
        tile[0].setAttribute("data-col", ("c" + rightCol));
      }
      break;
  }
};

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');

      game.moveTile(tile, event.which);
    }
  });
});
