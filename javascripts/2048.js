var Game = function() {
  // Game logic and initialization here
  this.board =[[0,0,0,0],
               [0,0,0,0],
               [0,0,0,0],
               [0,0,0,0]];
  this.score = 0;
  this.gameOver = false;
  this.addRandomTile();
  this.addRandomTile();
  this.gameWon = false;
};

Game.prototype.addRandomTile = function(){
  var self = this;
  //find all the 0s in board, put their positions in separate array
  var array = [];
  for (var r = 0; r < 4; r++) {
    for (var c = 0; c < 4; c++) {
      if (this.board[r][c] === 0) {
        array.push([r, c]);
      }
    }
  }
  if(array.length === 0){
    self.gameOver = true;
    console.log("Game Over");
  }
  if(self.gameOver === false){
    // using the length of this array, choose a random empty (0 containing) position
    var randIndex = array[Math.floor(Math.random()* array.length)];
    // insert a 2 or 4 into that position on the board
    var startNumArray = [2,2,2,2,2,2,4];
    var randTile = startNumArray[Math.floor(Math.random()*startNumArray.length)];
    this.board[randIndex[0]][randIndex[1]] = randTile;
    var $tile = $('<div class="tile"></div>');
    if (randTile === 2) {
      $("#gameboard").append($tile);
      $tile.attr("data-row", ("r" + randIndex[0]));
      $tile.attr("data-col", ("c" + randIndex[1]));
      $tile.attr("data-val", ("2"));
      $tile.html("2");
    }
    if (randTile === 4) {
      $("#gameboard").append($tile);
      $tile.attr("data-row", ("r" + randIndex[0]));
      $tile.attr("data-col", ("c" + randIndex[1]));
      $tile.attr("data-val", ("4"));
      $tile.html("4");
    }
  }
};

Game.prototype.getPositions = function(){
  var tileRows = $(".tile").map(function(){
    return $(this).data("row");
  }).get();
  var tileColumns = $(".tile").map(function(){
    return $(this).data("col");
  }).get();
};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  var self = this;
  var tileLength = tile.length;
  switch(direction) {
    case 38: //up  // subtract from data-row, TODO: if cell is empty (?)
      self.moveUp();
      for (var i = 0; i < $(".tile").length; i++){
        var dataRow = $(".tile").attr("data-row").slice(1);
            var dataInt = parseInt(dataRow, 10);
            if(dataInt > 0){
              dataInt = 0;
            }
            $(".tile")[i].setAttribute("data-row", ("r" + dataInt));
        }
      break;
    case 40: //down
      self.moveDown();
      for (var i = 0; i < $(".tile").length; i++){
        var dataRow = $(".tile").attr("data-row").slice(1);
            var dataInt = parseInt(dataRow, 10);
            if(dataInt < 3){
              dataInt += 1;
            }
            $(".tile")[i].setAttribute("data-row", ("r" + dataInt));
        }
      break;
    case 37: //left
      self.moveLeft();
      for (var i = 0; i < $(".tile").length; i++){
        var dataColumn = $(".tile").attr("data-col").slice(1);
            var dataInt = parseInt(dataColumn, 10);
            if(dataInt > 0){
              dataInt -= 1;
            }
            $(".tile")[i].setAttribute("data-col", ("c" + dataInt));
      }
      break;
    case 39: //right
      self.moveRight();
      for (var i = 0; i < $(".tile").length; i++){
        var dataColumn = $(".tile").attr("data-col").slice(1);
            var dataInt = parseInt(dataColumn, 10);
            if(dataInt < 3){
              dataInt += 1;
            }
            $(".tile")[i].setAttribute("data-col", ("c" + dataInt));
        }
      break;
  }
};

Game.prototype.addToScore = function(amount) {
  var self = this;
  self.score += amount;
  // console.log(self.score);
};

Game.prototype.endGame = function() {
  var self = this;
  // if the board values contain any number that is 2048 or greater
  // if this.board.includes(){
  //   self.gameWon = true;
  // }
};

Game.prototype.moveLeft = function() {
  var self = this;
  var board = this.board;
  // first go through each row top to bottom
  for (var r = 0; r < 4; r++) {
    // go through each column left to right
    var emptyCols = [];
    var filledCols = {};
    for (var c = 0; c < 4; c++) {
      //if content is empty, store c position in an array
      if (board[r][c] === 0) {
        emptyCols.push(c);
      } else  {   // if content not empty
        if(filledCols.hasOwnProperty(board[r][c])){ //if current content matches a previous content
          //if prev matching content is adjacent to current content OR only empty spaces between
          if((filledCols[board[r][c]] === (c - 1))||  //ex [match,current,0,0]
          ((filledCols[board[r][c]] === (c - 2)) && emptyCols.includes(c - 1)) || // ex [m,0,c,0]
          ((filledCols[board[r][c]] === (c - 3))  &&  emptyCols.includes(1) && emptyCols.includes(2))  // ex [m,0,0,c]
          ){
            board[r][filledCols[board[r][c]]] = 2 * (board[r][c]); //merge
            self.addToScore(2 * (board[r][c]));
            delete filledCols[board[r][c]]; //delete filledCols old key
            board[r][c] = 0; //empty col where content was
            emptyCols.push(c);// add current c to emptyCols
          // there is a non matching filledCol between matching and current
          } else if(emptyCols.includes(c - 1)){ //there is a space between current and a non matching filledCol  // ex [m,d,0,c] only
            var index = emptyCols.indexOf(c - 1);
            board[r][c-1] = board[r][c]; //content replaces the empty col to the left of it
            filledCols[board[r][c]]= c - 1; //add/update filledCols
            emptyCols.splice(index, 1); //delete that entry in the empty array
            board[r][c] = 0; //empty col where content was
            emptyCols.push(c); //add current c to emptyCols
          } else { // ex [m,d,c,0]
            filledCols[board[r][c]]= c; //add to filledCols
          }
        } else { //if content unique to row so far
          if(emptyCols.length){ //if empty cols before current, shift over
            board[r][emptyCols[0]] = board[r][c]; //content moves to leftmost empty col
            filledCols[board[r][c]]= emptyCols[0];
            emptyCols.shift(); //delete that entry in the empty array
            board[r][c] = 0; //empty col where content was
            emptyCols.push(c); //add current c to emptyCols
          } else {
            filledCols[board[r][c]]= c; //add to filledCols
          }
        }
      }
    }
  }
};

Game.prototype.moveRight = function() {
  var self = this;
  var board = this.board;
  // first go through each row top to bottom
  for (var r = 0; r < 4; r++) {
    // go through each column right to left
    var emptyCols = [];
    var filledCols = {};
    for (var c = 3; c >= 0; c--) {
      //if content is empty, store c position in an array
      if (board[r][c] === 0) {
        emptyCols.push(c);
      } else  {   // if content not empty
        if(filledCols.hasOwnProperty(board[r][c])){ //if current content matches a previous content
          //if prev matching content is adjacent to current content OR only empty spaces between
          if((filledCols[board[r][c]] === (c + 1))||
          ((filledCols[board[r][c]] === (c + 2)) && emptyCols.includes(c + 1)) ||
          ((filledCols[board[r][c]] === (c + 3))  && emptyCols.includes(1) && emptyCols.includes(2))
          ){
            board[r][filledCols[board[r][c]]] = 2 * (board[r][c]); //merge
            self.addToScore(2 * (board[r][c]));
            delete filledCols[board[r][c]]; //delete filledCols old key
            board[r][c] = 0; //empty col where content was
            emptyCols.push(c);// add current c to emptyCols
          // there is a non matching filledCol between matching and current
          } else if(emptyCols.includes(c + 1)){ //there is a space between current and a non matching filledCol
            var index = emptyCols.indexOf(c + 1);
            board[r][c + 1] = board[r][c]; //content replaces the empty col to the right of it
            filledCols[board[r][c]]= emptyCols[index]; // add/update filledCols
            emptyCols.splice(index, 1); //delete that entry in the empty array
            board[r][c] = 0; //empty col where content was
            emptyCols.push(c); //add current c to emptyCols
          } else { //content replaces the empty col to the right of it/
            filledCols[board[r][c]]= c; //add to filledCols
          }
        } else { //if content unique to row so far
          if(emptyCols.length){ //if empty cols before current, shift over
            board[r][emptyCols[0]] = board[r][c]; //content moves to rightmost empty col
            filledCols[board[r][c]]= emptyCols[0];
            emptyCols.shift(); //delete that entry in the empty array
            board[r][c] = 0; //empty col where content was
            emptyCols.push(c); //add current c to emptyCols
          } else {
            filledCols[board[r][c]]= c; //add to filledCols
          }
        }
      }
    }
  }
};

Game.prototype.moveUp = function() {
  var self = this;
  var board = this.board;
  // first go through each column right to left
  for (var c = 3; c >= 0; c--) {
    // go through each row top to bottom
    var emptyRows = [];
    var filledRows = {};
    for (var r = 0; r < 4; r++) {
      if (board[r][c] === 0) {
        emptyRows.push(r);
      } else  {   // if content not empty
        if(filledRows.hasOwnProperty(board[r][c])){ //if current content matches a previous content
          //if prev matching content is adjacent to current content OR only empty spaces between
          if((filledRows[board[r][c]] === (r - 1))||
          ((filledRows[board[r][c]] === (r - 2)) && emptyRows.includes(r - 1)) ||
          ((filledRows[board[r][c]] === (r - 3))  &&  emptyRows.includes(1) && emptyRows.includes(2))
          ){
            board[filledRows[board[r][c]]][c] = 2 * (board[r][c]);
            self.addToScore(2 * (board[r][c]));
            delete filledRows[board[r][c]];
            board[r][c] = 0;
            emptyRows.push(r);
          // there is a non matching filledCol between matching and current
        } else if(emptyRows.includes(r - 1)){  //there is a space between current and a non matching filledCol
            var index = emptyRows.indexOf(r - 1);
            board[r-1][c] = board[r][c];
            filledRows[board[r][c]]= r - 1;
            emptyRows.splice(index, 1);
            board[r][c] = 0;
            emptyRows.push(r);
          } else {
            filledRows[board[r][c]]= r;
          }
        } else { //if content unique to row so far
          if(emptyRows.length){ //if empty cols before current, shift over
            board[emptyRows[0]][c] = board[r][c];
            filledRows[board[r][c]]= emptyRows[0];
            emptyRows.shift();
            board[r][c] = 0;
            emptyRows.push(r);
          } else {
            filledRows[board[r][c]]= r;
          }
        }
      }
    }
  }
};

Game.prototype.moveDown = function() {
  var self = this;
  var board = this.board;
  // first go through each column right to left
  for (var c = 3; c >= 0; c--) {
    // go through each row bottom to top
    var emptyRows = [];
    var filledRows = {};
    for (var r = 3; r >= 0; r--) {
      if (board[r][c] === 0) {
        emptyRows.push(r);
      } else  {   // if content not empty
        if(filledRows.hasOwnProperty(board[r][c])){ //if current content matches a previous content
          //if prev matching content is adjacent to current content OR only empty spaces between
          if((filledRows[board[r][c]] === (r + 1))||
          ((filledRows[board[r][c]] === (r + 2)) && emptyRows.includes(r + 1)) ||
          ((filledRows[board[r][c]] === (r + 3))  &&  emptyRows.includes(1) && emptyRows.includes(2))
          ){
            board[filledRows[board[r][c]]][c] = 2 * (board[r][c]);
            self.addToScore(2 * (board[r][c]));
            delete filledRows[board[r][c]];
            board[r][c] = 0;
            emptyRows.push(r);
          // there is a non matching filledCol between matching and current
        } else if(emptyRows.includes(r + 1)){  //there is a space between current and a non matching filledCol
            var index = emptyRows.indexOf(r + 1);
            board[r+1][c] = board[r][c];
            filledRows[board[r][c]]= r + 1;
            emptyRows.splice(index, 1);
            board[r][c] = 0;
            emptyRows.push(r);
          } else {
            filledRows[board[r][c]]= r;
          }
        } else { //if content unique to row so far
          if(emptyRows.length){ //if empty cols before current, shift over
            board[emptyRows[0]][c] = board[r][c];
            filledRows[board[r][c]]= emptyRows[0];
            emptyRows.shift();
            board[r][c] = 0;
            emptyRows.push(r);
          } else {
            filledRows[board[r][c]]= r;
          }
        }
      }
    }
  }
};

Game.prototype.displayBoard = function() {

};

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();
  console.log(game.board);
  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');
      game.moveTile(tile, event.which);
      game.addRandomTile();
      game.displayBoard();
      console.log(game.board);
      console.log(`| ${game.board[0][0]} ${game.board[0][1]} ${game.board[0][2]} ${game.board[0][3]} |`);
      console.log(`| ${game.board[1][0]} ${game.board[1][1]} ${game.board[1][2]} ${game.board[1][3]} |`);
      console.log(`| ${game.board[2][0]} ${game.board[2][1]} ${game.board[2][2]} ${game.board[2][3]} |`);
      console.log(`| ${game.board[3][0]} ${game.board[3][1]} ${game.board[3][2]} ${game.board[3][3]} |`);
    }
  });
});
