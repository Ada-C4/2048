var Game = function() {
  // Game logic and initialization here
  this.board = [[0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]];
};

Game.prototype.play = function() {

};

Game.prototype.moveTile = function(direction) {
  // Game method here
  switch(direction) {
    case 38: //up
    for (var i = 0; i < 4; i++) {
      this.moveColumnUp(i);
    }
      break;
    case 40: //down
      this.moveTileDown(tile);
      break;
    case 37: //left
      this.moveTileLeft(tile);
      break;
    case 39: //right
      this.moveTileRight(tile);
      break;
  }
};

Game.prototype.moveColumnUp = function(columnIndex) {

  for (var i = 0; i < 4; i++) {
    while (this.board[columnIndex][i] === 0) {
      console.log(this.board[columnIndex][i]);
      console.log(this.board[columnIndex][i + 1]);
      this.board[columnIndex][i] = this.board[columnIndex][i + 1];
      this.board[columnIndex][i+1] = 0;
    }
  }
  var valid = true;
  while (valid) {
    var y = parseInt($(".tile").attr("data-row").slice(-1));
    var newY = parseInt($(".tile").attr("data-row").slice(-1)) - 1;
    var x = parseInt($(".tile").attr("data-col").slice(-1));

    if (newY >= 0 && this.board[newY][x] === 0) {
      tile[0].setAttribute("data-row", ("r" + newY));
      this.board[newY][x] = this.board[y][x];
      this.board[y][x] = 0;
    } else {
      valid = false;
    }
}
};

Game.prototype.moveTileDown = function(tile) {
  var valid = true;
  while (valid) {
    var y = parseInt($(".tile").attr("data-row").slice(-1));
    var newY = parseInt($(".tile").attr("data-row").slice(-1)) + 1;
    var x = parseInt($(".tile").attr("data-col").slice(-1));
    if (newY <= 3 && this.board[newY][x] === 0) {
      tile[0].setAttribute("data-row", ("r" + newY));
      this.board[newY][x] = this.board[y][x];
      this.board[y][x] = 0;
    } else{
      valid = false;
    }
  }
};

Game.prototype.moveTileRight = function(tile) {
  var valid = true;
  while (valid) {
    var y = parseInt($(".tile").attr("data-row").slice(-1));
    var newY = parseInt($(".tile").attr("data-col").slice(-1)) + 1;
    var x = parseInt($(".tile").attr("data-col").slice(-1));
    if (newY <= 3 && this.board[x][newY] === 0) {
      tile[0].setAttribute("data-col", ("c" + newY));
      this.board[x][newY] = this.board[x][y];
      this.board[x][y] = 0;
    } else {
      valid = false;
    }
  }

};

Game.prototype.moveTileLeft = function(tile) {
  var valid = true;
  while (valid) {
    var y = parseInt($(".tile").attr("data-row").slice(-1));
    var newY = parseInt($(".tile").attr("data-col").slice(-1)) - 1;
    var x = parseInt($(".tile").attr("data-col").slice(-1));
    if (newY >= 0 && this.board[x][newY]) {
      tile[0].setAttribute("data-col", ("c" + newY));
      this.board[x][newY] = this.board[x][y];
      this.board[x][y] = 0;
    } else {
      valid = false;
    }
  }

};

Game.prototype.addRandoTile = function() {
  var tile = $("<div data-row='' data-col='' data-val=''></div>");
  var dataVal = Math.random() < 0.2 ? 4 : 2;
  var emptySpaces = this.returnEmptySpaces();
  var randoLocation = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
  tile.addClass("tile");
  tile.attr("data-row", "r" + randoLocation[0]);
  tile.attr("data-col", "c" + randoLocation[1]);
  tile.attr("data-val", dataVal);
  tile.text(dataVal);
  $("#gameboard").append(tile);
  this.board[randoLocation[0]][randoLocation[1]] = dataVal;
};

Game.prototype.returnEmptySpaces = function() {
  var emptySpaces = [];
  var row = null;
  var col = null;
  var tileLocation = null;
  for (var i = 0; i < 4; i++) {
    row = i;
    for (var j = 0; j < 4; j++) {
      col = j;
      tileLocation = this.board[row][col];
      if (tileLocation === 0) {
        emptySpaces.push([row, col]);
      }
    }
  }
  return emptySpaces;
};

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();
  game.addRandoTile();
  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');
      game.moveTile(event.which);
      game.addRandoTile();
    }
  });
});

function tileSelectText(row, col) {
  return ".tile[data-row=\"" + row + "\"][data-col=\"" + col + "\"]";
}
