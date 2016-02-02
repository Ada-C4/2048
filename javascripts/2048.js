var Game = function() {
  // Game logic and initialization here
  this.board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
  this.score = 0;
  // 15 becuase squares are counted based on the board array which stars at 0
  this.availableSquares = 15;
};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  var currentRow = parseInt(tile[0].dataset.row.charAt(1));
  var currentCol = parseInt(tile[0].dataset.col.charAt(1));
  switch(direction) {
    case 38: //up
      console.log('up');
      // console.log(tile.attr("data-row"));
      // console.log(tile.attr("data-col"));
      // console.log(tile);
      // console.log(tile[0]);
      // console.log(tile[0].dataset.row);
      // console.log(tile[0].dataset.col);
      // console.log(tile[0].dataset.val);


      if (currentRow > 0) {
        tile[0].dataset.row = "r" + (currentRow - 1);
        tile.animate({top: '-=135px'}, 50);
      }
      console.log(tile[0].dataset.row);
      // check to see if the space above is empty, if Yes, move to that space
      break;
    case 40: //down
      if (currentRow < 3) {
        tile[0].dataset.row = "r" + (currentRow + 1);
        tile.animate({top: '+=135px'}, 50);
      }
      console.log(tile[0].dataset.row);
      console.log('down');
      break;
    case 37: //left
    // look at board and figure out where tile should go by iterating backwards through the board
    // start with innerArray[4] and compare it to each other element in that array
    // looping through this.board array
    for (var i = 0; i < 3; i++) {
      var innerArray = this.board[i];
      // looping through the inner arrays
      for (var j = 3; j > 0; j--) {
        // comparison of the numbers in the inner arrays
        // inputs 4 nums that represent the position of the tiles at the beginning of the turn for that row
        // outputs 4 nums that represent the position of the tiles at the end of the turn for that row
      }
    }

      if (currentCol > 0) {
        tile[0].dataset.col = "c" + (currentCol - 1);
        tile.animate({left: '-=135px'}, 50);
      }
      console.log(tile[0].dataset.col);
      console.log('left');
      break;
    case 39: //right
      if (currentCol < 3) {
        tile[0].dataset.col = "c" + (currentCol + 1);
        tile.animate({left: '+=135px'}, 50);
      }
      console.log(tile[0].dataset.col);
      console.log('right');
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
 // assign the tile's value to the board
    // calculates the index of the intter array
    console.log(rando);
    var innerArr = ((rando/4).toString()).charAt(0);
    // calculates the index in the innerArray that the tile should ba assiged to
    console.log(innerArr);
    var innerArrIndex = (rando - (innerArr * 4));
    // looks at the index in the inner Array and if no empty moves to the next index
    console.log(innerArrIndex);
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

 // assign a tile there

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
      var tile = $('.tile');
      game.moveTile(tile, event.which);
    }
  });

  // check to see if we lost
    // yes => it's over!
    // no => another game loop!
});
