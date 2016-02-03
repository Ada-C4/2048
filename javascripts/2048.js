var Game = function() {
  // Game logic and initialization here
  this.gameBoard = [[0, 0, 0, 0], [0, 2, 0, 0], [0, 4, 4, 0], [0, 0, 0, 0]];
};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  var self = this;
  switch(direction) {
    case 38: //up
      console.log('up');
      // iterate through each "row" (each array within gameboard array)
      self.gameBoard.forEach(function(row, rowIndex){
        // iterate through each "column" (each item within a row)
        row.forEach(function(column, columnIndex){
          var numSpaces = 0;
          // don't look at tiles that don't have a a value to them, AND don't look left if column is farthest left
          if (column !== 0 && rowIndex !== 0) {
            // iterate through each item further left of current item
            for (var i = rowIndex; i >= 0; i--) {
              // increment numSpaces to move left by 1 if the next left over is 0
              // for (self.gameBoard[rowIndex - i][columnIndex] === 0) {
              if (self.gameBoard[rowIndex - i][columnIndex] === 0) {
                numSpaces += 1;
              }
            }
            self.gameBoard[rowIndex - numSpaces][columnIndex] = column;
            row[columnIndex] = 0;
          }
        });
      });
      console.log(self.gameBoard);
      self.upTileCollision();
      break;
    case 40: //down
      console.log('down');
      // iterate through each "row" (each array within gameboard array)
      for (var k = 3; k <= 0; k--) {
        var row = self.gameboard[k], rowIndex = k;
        // iterate through each "column" (each item within a row)
        row.forEach(function(column, columnIndex){
          var numSpaces = 0;
          // don't look at tiles that don't have a a value to them, AND don't look left if column is farthest down already
          if (column !== 0 && rowIndex < 3) {
            // iterate through each item further up of current item
            for (var i = rowIndex; i < 3; i++) {
              // increment numSpaces to move down by 1 if the next num down is 0
              if (self.gameBoard[i + 1][columnIndex] === 0) {
                numSpaces += 1;
              }
            }
            self.gameBoard[rowIndex + numSpaces][columnIndex] = column;
            row[columnIndex] = 0;
          }
        });
      }
      console.log(self.gameBoard);
      self.downTileCollision();
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
                numSpaces += 1;
              }
            }
            row[columnIndex - numSpaces] = column;
            row[columnIndex] = 0;
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
          // don't look at tiles that don't have a a value to them, AND don't look right if column is farthest right

          if (column !== 0) {
            if (columnIndex <= 3) {

              // increment numSpaces to move right by 1 if the next right over is 0
              if (self.gameBoard[rowIndex][columnIndex + 1] === 0) {
                // select current tile and move it appropriate num spaces right
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

Game.prototype.upTileCollision = function(){
  var self = this;
  for(var i = 0; i <= 3; i++){
    for(var j = 0; j <= 3; j++){
      if(self.gameBoard[i][j] > 0){
        if(self.gameBoard[i + 1][j] === self.gameBoard[i][j]){
          self.gameBoard[i][j] *= 2;
          self.gameBoard[i + 1][j] = 0;
        }
      }
    }
  }
  console.log(self.gameBoard);
};

Game.prototype.downTileCollision = function(){
  var self = this;
  for(var i = 3; i >= 3; i--){
    for(var j = 0; j <= 3; j++){
      if(self.gameBoard[i][j] > 0){
        if(self.gameBoard[i - 1][j] === self.gameBoard[i][j]){
          self.gameBoard[i][j] *= 2;
          self.gameBoard[i - 1][j] = 0;
        }
      }
    }
  }
  console.log(self.gameBoard);
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
