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
      if (currentCol > 0) {
        tiles[0].dataset.col = "c" + (currentCol - 1);
        tiles.animate({left: '-=135px'}, 50);
      }
      break;
    case 39: //right
      if (currentCol < 3) {
        tiles[0].dataset.col = "c" + (currentCol + 1);
        tiles.animate({left: '+=135px'}, 50);
      }
      break;
  }
};

// used inside the moveTile function
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
