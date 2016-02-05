var Game = function() {
  // Game logic and initialization here
  this.board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
  this.score = 0;
  // 15 because squares are counted based on the board array which starts at 0
  this.availableSquares = 15;
};

Game.prototype.sortTiles = function(tiles) {
  var arrayOfArrays = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
  for (var i = 0; i < tiles.length; i ++) {
    var tileRow = parseInt(tiles[i].dataset.row.charAt(1));
    var tileCol = parseInt(tiles[i].dataset.col.charAt(1));
    arrayOfArrays[tileRow][tileCol] = tiles[i];
  }
  var flattened = arrayOfArrays.reduce(function(a, b) {
    return a.concat(b);
  });
  return flattened;
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
      this.animateTiles(tiles);
      break;
    case 39: //right
      if (currentCol < 3) {
        tiles[0].dataset.col = "c" + (currentCol + 1);
        tiles.animate({left: '+=135px'}, 50);
      }
      break;
  }
};


Game.prototype.animateTiles = function(tiles) {
  var tileArray = this.sortTiles(tiles);
  for (var i = 0; i < tileArray.length; i++) {
    if (tileArray[i] !== 0) {
      var tileRow = tileArray[i].dataset.row.charAt(1);
      if (oldTileRow != tileRow) {
      var j = 0;
      }
      var tileVal = tileArray[i].dataset.val;
        var newCol = j;
        var oldCol = tileArray[i].dataset.col.charAt(1);
        if (this.board[tileRow][j] !== 0) {
          if(this.board[tileRow][j] === tileVal) {
            // move tile[i] to position of this.board[tileRow][i]
            // access tile element's dataset.col and update it
            var moveAmt = this.calcMoveAmt(oldCol, newCol);
            tileArray[i].animate({left: moveAmt}, 50);
            tileArray[i].dataset.col = "c" + j;
          }
          else {
            var moveAmt = this.calcMoveAmt(oldCol, newCol);
            tileArray[i].animate({left: moveAmt}, 50);
            // move tile[i] to position of this.board[tileRow][i]
            tileArray[i].dataset.col = "c" + j;
            tileArray[i].dataset.val = this.board[tileRow][j];
            console.log(typeof tileArray[i]);
            $(tileArray[i]).html(tileArray[i].dataset.val);
            // and reassign the value to be this.board[tileRow][i]
            // tileArray[i].dataset.val = this.board[tileRow][i];
          }
        }
        else {
          var moveAmt = this.calcMoveAmt(oldCol, 0);
          tileArray[i].animate({left: moveAmt}, 50);
          tileArray[i].dataset.col = "c" + 0;
          tileArray[i].remove();
          // then delete the tile because it has been combined
        }
      }
    var oldTileRow = tileRow;
    if (j !== undefined && tileArray[i] !== 0) {
      j++;
    }
  }
};

Game.prototype.calcMoveAmt = function(oldCol,newCol) {
  var colDiff = oldCol - newCol;
  var moveAmt = 135 * colDiff;
  return '-=' + moveAmt + 'px';
};

// used inside the moveTiles function
Game.prototype.updateBoard = function(arr,rowIndex) {
  var brd = this.board[rowIndex];
  switch(arr.length) {
    case 1:
      this.board[rowIndex] = [arr[0],0,0,0];
      break;
    case 2:
      if (arr[0] === arr[1]) {
        this.board[rowIndex] = [(arr[0] + arr[1]),0,0,0];
      } else {
        this.board[rowIndex] = [arr[0],arr[1],0,0];
      }
      break;
    case 3:
      if (arr[0] === arr[1]) {
        this.board[rowIndex] = [(arr[0] + arr[1]), arr[2],0,0];
      } else if (arr[1] === arr[2]) {
        this.board[rowIndex] = [arr[0],(arr[1] + arr[2]),0,0];
      } else {
        this.board[rowIndex] = [arr[0],arr[1],arr[2],0];
      };
      break;
    case 4:
      if (arr[0] == arr[1]) {
        if (arr[2] == arr[3]){
          this.board[rowIndex] = [(arr[0] + arr[1]), (arr[2] + arr[3]), 0,0];
        } else {
          this.board[rowIndex] = [(arr[0] + arr[1]),arr[2], arr[3], 0];
        }
      } else if (arr[1] === arr[2]) {
        this.board[rowIndex] = [arr[0], (arr[1] + arr[2]), arr[3], 0];
      } else if (arr[2] == arr[3]) {
        this.board[rowIndex] = [arr[0], arr[1], (arr[2] + arr[3]), 0];
      } else {
        this.board[rowIndex] = arr;
      }
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
  game.createRandomTile();
  game.createRandomTile();
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
