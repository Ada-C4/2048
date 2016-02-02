var Game = function() {
  // Game logic and initialization here
  this.gameBoard = [[0, 0, 0, 0], [0, 2, 0, 0], [0, 0, 4, 0], [0, 0, 0, 0]];
};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  var self = this;
  switch(direction) {
    case 38: //up
      console.log('up');
      break;
    case 40: //down
      console.log('down');
      $('.tile').animate({ top: '+=135'}, 100);
      break;
    case 37: //left
      console.log('left');
      // iterate through each "row" (each array within gameboard array)
      self.gameBoard.forEach(function(row, rowIndex){
        // iterate through each "column" (each item within a row)
        row.forEach(function(column, columnIndex){
          var numSpaces = 0;
          // don't look at tiles that don't have a a value to them, AND don't look left if column is farthest left
          if (column !== 0 && columnIndex !== 0) {
            // iterate through each item further left of current item
            for (var i = columnIndex; i >= 0; i--) {
              // increment numSpaces to move left by 1 if the next left over is 0
              if (self.gameBoard[rowIndex][i-1] === 0) {
                row[columnIndex - 1] = column;
                row[columnIndex] = 0;
                numSpaces += 1;
              }
            }
          }
        });
      });
      console.log(self.gameBoard);

      break;
    case 39: //right
      console.log('right');
      // iterate through each "row" (each array within gameboard array)
      // self.gameBoard.forEach(function(row, rowIndex){
      for (var k = 0; k < self.gameBoard.length; k++) {
        // iterate through each "column" (each item within a row)
        var row = self.gameBoard[k], rowIndex = k;

        for (var j = 0; j < row.length; j++) {
          var column = row[j], columnIndex = j;
        // row.forEach(function(column, columnIndex){
          var numSpaces = 0;
          // don't look at tiles that don't have a a value to them, AND don't look right if column is farthest right

          if (column !== 0) {
            if (columnIndex <= 3) {
              // console.log('column: ' + column + ' columnindex: ' + columnIndex);

              // increment numSpaces to move right by 1 if the next right over is 0
              if (self.gameBoard[rowIndex][columnIndex + 1] === 0) {
                // select current tile and move it appropriate num spaces right
                console.log('column: ' + column + ' columnindex: ' + columnIndex);
                row[columnIndex + 1] = column;
                row[columnIndex] = 0;
              }
            }
          }
        }
      }
      console.log(self.gameBoard);
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
