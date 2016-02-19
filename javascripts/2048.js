var Game = function() {
  // Game logic and initialization here
  this.board = [[0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]];
  this.boardSize = 4;
  this.score = 0;
  this.hasMoved = false;
  this.winningTile = 2048;
  this.hasWon = false;
};

$(document).ready(function() {
  var game = new Game();
  $(".numbers").append("0");
  game.addRandoTile();
  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      game.moveTiles(event.which);
      if (game.hasMoved) {
        setTimeout(function() {
          game.addRandoTile();
          emptySpaces = game.returnEmptySpaces();
          if (emptySpaces.length === 0 ) {
          if (game.checkLoss()) { alert("Sorry! Try again!"); console.log("i've lost it");}
          }
        },
          250);
      }
      if (game.hasWon === true) { alert("Congratulations! You've won!"); }
    }
  });
});

function tileSelect(row, col) {
  return "div[data-row=\"r" + row + "\"][data-col=\"c" + col + "\"]";
}

Game.prototype.reverseIndices = function(indicesIn) {
  var indicesOut = [];
  for (var i = 0; i < indicesIn.length; i++) {
    indicesOut.push(this.boardSize - 1 - indicesIn[i]);
  }
  return indicesOut;
};

Game.prototype.moveTiles = function(direction) {
  this.hasMoved = false;
  var i;
  switch(direction) {
    case 38: //up
      for (i = 0; i < this.boardSize; i++) {
        this.move(i, "col", "towards");
      }
      break;
    case 40: //down
      for (i = 0; i < this.boardSize; i++) {
        this.move(i, "col", "away");
      }
      break;
    case 37: //left
    for (i = 0; i < this.boardSize; i++) {
      this.move(i, "row", "towards");
    }
      break;
    case 39: //right
    for (i = 0; i < this.boardSize; i++) {
      this.move(i, "row", "away");
    }
      break;
  }
};

Game.prototype.getValsByDim = function(dim, index) {
  //uses dim and index to push only the non zero values in each array onto a new array
  var vals = [];
  var indices = [];
  for (var i = 0; i < this.boardSize; i++) {
    var val;
    switch(dim) {
      case "row":
        val = this.board[index][i];
        break;
      case "col":
        val = this.board[i][index];
        break;
    }
    if (val !== 0) {vals.push(val); indices.push(i); } // ignore zeros, and push everything else into values array.
  }
// values is an array with the value of the numbers pushed into it.
// indices is an array with the index within the dim of where the value came from.
  return [vals, indices];
};

Game.prototype.setValsByDim = function(dim, index, values) {
  //iterating through entire board, places values at their new indices
  var i;
  for (i = 0; i < values.length; i++) {
    switch(dim){
      case "row":
        this.board[index][i] = values[i];
        break;
      case "col":
        this.board[i][index] = values[i];
        break;
    }
  }
  for (i; i < this.boardSize; i++) {  //pick up where i left off in case we need to add 0s
    switch(dim){
      case "row":
        this.board[index][i] = 0;
        break;
      case "col":
        this.board[i][index] = 0;
        break;
    }
  }
};

Game.prototype.smash = function(valsIn) {
  if (valsIn.length === 0) { return [ [], [] ]; }
  var valsOut = [valsIn[0]]; //the first value out will be the first in
  var indicesOut = [0]; //the first value out will be pushed to index 0
  var alreadySmashed = false;
  for (var i = 1; i < valsIn.length; i++) {
    if (valsIn[i] === valsOut[valsOut.length-1] && !alreadySmashed) { //if the next iteration of valsIn has a value the same as the last value out, they should be at the same index
      valsOut[valsOut.length-1] *= 2; //numbers add together
      if (valsOut[valsOut.length-1] == this.winningTile) { this.hasWon = true; }
      alreadySmashed = true;
      indicesOut.push(indicesOut[indicesOut.length-1]); //if value is smashing, the indice out should be the same as the one it smashed into, in this case the last value in indices out
      this.score += valsOut[valsOut.length-1];
    }
      else { //if they're not equal to each other, push the value and the indices OUT.
      alreadySmashed = false; //alreadySmashed prevents everything form combining (like [2,2,2,2] to [8,0,0,0] automatically)
      indicesOut.push(indicesOut[indicesOut.length-1] + 1); //If I didn't smash, then make my out index the one after the last index in indicesOut because math of plus one.
      valsOut.push(valsIn[i]);// I didn't smash, so push my value at i to valsOut. Save me!
    }
  }
  $(".numbers").empty();
  $(".numbers").append(this.score);
  return [valsOut, indicesOut];
};

Game.prototype.move = function(index, dim, vertex) {
  var valsAndIndicesIn = this.getValsByDim(dim, index);
  var valsIn = valsAndIndicesIn[0];
  var indicesIn = valsAndIndicesIn[1];

  if (vertex === "away") {
    valsIn.reverse();
    indicesIn.reverse();
  }
  var valsandIndicesOut = this.smash(valsIn);

//below begins the unsmashing;
  var valsOut = valsandIndicesOut[0];
  var indicesOut = valsandIndicesOut[1];

  if (vertex === "away") {
    while  (valsOut.length != this.boardSize) {
      valsOut.push(0);
    }
    valsOut.reverse();
    indicesOut = this.reverseIndices(indicesOut);
  }
  this.setValsByDim(dim, index, valsOut);
  this.display(index, vertex, dim, indicesIn, indicesOut, valsOut);
};

  //loop over indices in and indices out to see if they are the same. if they are, then nothing has moved!
Game.prototype.display = function(index, vertex, dim, indicesIn, indicesOut, valsOut) {
  for (var i = 0; i < indicesIn.length; i++) {
    var tileQuery;
    if (dim === "col") {
      tileQuery = $(tileSelect(indicesIn[i], index));
    } else if (dim === "row") {
      tileQuery = $(tileSelect(index, indicesIn[i]));
    }
    if (i < indicesIn.length - 1) { //if I am smashed into, delete myself
      if (indicesOut[i] === indicesOut[i+1]) {
        tileQuery[0].remove();
      }
    }
    if (i >= 1) { // if i smashed into someone (same indices)
      if (indicesOut[i] === indicesOut[i-1]) {
        var newVal = valsOut[indicesOut[i]];
        tileQuery.text(newVal);
        tileQuery[0].setAttribute("data-val", newVal);
      }
    }
    if (indicesIn[i] !== indicesOut[i]) {
      if (dim === "col") {
        tileQuery[0].setAttribute("data-row", ("r" + indicesOut[i]));
      } else {
        tileQuery[0].setAttribute("data-col", ("c" + indicesOut[i]));
      }
      this.hasMoved = true; //to prevent a tile from appearing when nothing has moved;
    }
  }
};

Game.prototype.addRandoTile = function() {
  var tile = $("<div data-row='' data-col='' data-val=''></div>");
  var dataVal = Math.random() < 0.1 ? 4 : 2;
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
  for (var i = 0; i < this.boardSize; i++) {
    row = i;
    for (var j = 0; j < this.boardSize; j++) {
      col = j;
      tileLocation = this.board[row][col];
      if (tileLocation === 0) {
        emptySpaces.push([row, col]);
      }
    }
  }
  return emptySpaces;
};

Game.prototype.smashable = function(vals) {
  for (var i = 0; i < this.boardSize - 1; i++) {
    if (vals[i] === vals[i+1]) { return true; } //if two values are the same this can be smashed
  }
  return false;
};

Game.prototype.checkLoss = function() {
  for (var i = 0; i < this.boardSize; i++) {
    var valsAndIndices = this.getValsByDim("row", i);
    if (this.smashable(valsAndIndices[0])) { return false;}
    valsAndIndices = this.getValsByDim("col", i);
    if (this.smashable(valsAndIndices[0])) {return false; }
  }
  return true;
};
