var Game = function() {
  // Game logic and initialization here
  this.board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
  this.score = 0;
  // 15 because squares are counted based on the board array which starts at 0
  this.availableSquares = 15;
};

Game.prototype.moveTiles = function(tiles, direction) {
  // Game method here
  var currentRow = parseInt(tiles[0].dataset.row.charAt(1));
  var currentCol = parseInt(tiles[0].dataset.col.charAt(1));
  switch(direction) {
    case 38: //up
      if (currentRow > 0) {
        tiles[0].dataset.row = "r" + (currentRow - 1);
        tiles.animate({top: '-=135px'}, 50);
      }
      break;
    case 40: //down
      if (currentRow < 3) {
        tiles[0].dataset.row = "r" + (currentRow + 1);
        tiles.animate({top: '+=135px'}, 50);
      }
      break;
    case 37: //left
    var boardCopy = Object.assign([], this.board);
    // looping through this.board array
      for (var i = 0; i < 4; i++) {
        var innerArray = this.board[i];
        var beginningTilesArray = [];
        for (var j = 0; j < 4; j++) {
          if (innerArray[j] !== 0) {
            beginningTilesArray.push(innerArray[j]);
          // bTA now looks like [2,4] if you started with [2,0,4,0]
          }
        }
        this.updateBoard(beginningTilesArray,i);
      }
      console.log(boardCopy);
      console.log(this.board);
      this.animateTiles(tiles, boardCopy);
      break;
    case 39: //right
      if (currentCol < 3) {
        tiles[0].dataset.col = "c" + (currentCol + 1);
        tiles.animate({left: '+=135px'}, 50);
      }
      break;
  }
};

Game.prototype.animateTiles = function(tileArray, boardCopy) {
  for (var i = 0; i < tileArray.length; i++) {
    var oldColumn = tileArray[i].dataset.col.charAt(1);
    var tileRow = tileArray[i].dataset.row.charAt(1);
    // moveTo should be the index of the column that we are going to move the tile to
    var newColumn = 0;
    var colDiff = oldColumn - newColumn;
    if (oldColumn > 0) {
      tileArray[i].dataset.col = "c" + (oldColumn - colDiff);
      var moveAmt = (135 * colDiff);
      tileArray[i].animate({left: '-=' + moveAmt + 'px'}, 50);
    }
  }
};

 // [0,2,2,2] becomes [2,2,2,0] - diff for each tile is one col
 // [0,2,0,2] becomes [2,2,0,0] - diff for first tile is 1, for second tile is 2
// [0,2,0,0] becomes [2,0,0,0] - diff for first tile is 1
// [0,0,0,2] becomes [2,0,0,0] - diff for first tile is 3
Game.prototype.animateTilesAlt = function(tileArray, boardCopy) {
  for (var i = 0; i < this.board.length; i++) {
    if (this.board[i] != boardCopy[i]) {
      for (var j = 0; j < 4; j++) {

      }
    }
  }
};


// used inside the moveTiles function
Game.prototype.updateBoard = function(arr,rowIndex) {
  switch(arr.length) {
    case 1:
      this.board[rowIndex] = [arr[0],0,0,0];
      break;
    case 2:
      this.board[rowIndex] = [arr[0],arr[1],0,0];
      break;
    case 3:
      this.board[rowIndex] = [arr[0],arr[1],arr[2],0];
      break;
    case 4:
      this.board[rowIndex] = arr;
      break;
  }
};

// call this function twice when creating a new game, call it on every turn
Game.prototype.createRandomTile = function() {
    function getRando(min,max){
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // randomly pick one
    var rando = getRando(0,this.availableSquares);
    // calculates the index of the intter array
    var innerArr = ((rando/4).toString()).charAt(0);
    // calculates the index in the innerArray that the tile should ba assiged to
    var innerArrIndex = (rando - (innerArr * 4));
    // looks at the index in the inner Array and if no empty moves to the next index
    while (this.board[innerArr][innerArrIndex] !== 0) {
      innerArrIndex++;
    }
    // assigns the tile value to the board
    var twoOrFour = getRando(0,9);
    var tileVal;
    if (twoOrFour === 0) {
      tileVal = 4;
    } else {
      tileVal = 2;
    }
    this.board[innerArr][innerArrIndex] = tileVal;
    // assign a tile there in the HTML
    $(".cells").after('<div class="tile" data-row="r' + innerArr +'", data-col="c' + innerArrIndex + '" data-val="' + tileVal + '">' + tileVal + '</div>');
};


$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();
  // randomly assign two tiles
  game.createRandomTile();
  game.createRandomTile();
  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tiles = $('.tile');
      game.moveTiles(tiles, event.which);
    }
  });

  // check to see if we lost
    // yes => it's over!
    // no => another game loop!
});
