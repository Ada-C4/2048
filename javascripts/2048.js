var Game = function() {
  // Game logic and initialization here
  this.gameBoard = [[0, 0, 0, 0], [0, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  var self = this;
  switch(direction) {
    case 38: //up
      console.log('up');
      this.gameBoard = [[0, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
      break;
    case 40: //down
      console.log('down');
      $('.tile').animate({ top: '+=135'}, 100);
      break;
    case 37: //left
      console.log('left');
      var movePlaces = 0;
      this.gameBoard.forEach(function(row, rowIndex){
        row.forEach(function(column, columnIndex){
          if(column !== 0 && columnIndex !== 0) {
            for (var i = columnIndex; i >= 0; i--) {
              if (self.gameBoard[rowIndex][i-1] === 0) {
                movePlaces += 135;
              }
            $('.tile[data-row=r' + rowIndex + ']' + ', .tile[data-col=c' + columnIndex + ']').animate({ left: '-=' + movePlaces }, 100);            }
          }
        });
      });
      for (var i = 0; i >= 0; i--) {
        if (this.gameBoard[0][i] === 0) {
          movePlaces += 135;
        }
      }
      console.log(movePlaces);

      break;
    case 39: //right
      console.log('right');
      $('.tile').animate({ left: '+=135'}, 100);
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
