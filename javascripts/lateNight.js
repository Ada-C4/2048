var Game = function() {
  // Game logic and initialization here
  this.board = [[0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]];
  this.boardSize = 4;
  this.score = 0;
  this.hasMoved = false;
};

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();
  $(".numbers").append("0");
  game.addRandoTile();
  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      game.moveTiles(event.which);
      if (game.hasMoved) {
        setTimeout(function() {
          game.addRandoTile();},
          250);
      }
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
  // Game method here
  switch(direction) {
    case 38: //up
      for (i = 0; i < this.boardSize; i++) {
        this.move(i, "col", "towards");
      }
      break;
    case 40: //down
      for (i = 0; i < this.boardSize; i++) {
        this.moveColumnDown(i);
      }
      break;
    case 37: //left
    for (i = 0; i < this.boardSize; i++) {
      this.move(i, "row", "towards");
    }
      break;
    case 39: //right
    for (i = 0; i < this.boardSize; i++) {
      this.moveRowRight(i);
    }
      break;
  }
};

Game.prototype.getValsByDim = function(dim, index) {
  var vals = [];
  var indices = [];
  for (var i = 0; i < this.boardSize; i++) {
//passes in the dim we're in, the column index we're working with and i,
// which iterates through 0-3;
    var val;
    switch(dim) {
      case "row":
        val = this.board[index][i];
        break;
      case "col":
        val = this.board[i][index];
        break;
    }
// ignore zeros, and push everythign else into values array. It knows where
// the values are.
    if (val !== 0) {vals.push(val); indices.push(i); }
  }
// values is an array with the value of the numbers pushed into it.
// indices is also an array that contains the indecies of where the values came from.
  return [vals, indices];
};

Game.prototype.setValsByDim = function(dim, index, values) {
  var i;
  for (i = 0; i < values.length; i++) {
//iterating through entire board (setValue)
    switch(dim){
      case "row":
        this.board[index][i] = values[i];
        break;
      case "col":
        this.board[i][index] = values[i];
        break;
    }
  }
  //pick up where i left off in case we need to add 0s
  for (i; i < this.boardSize; i++) {
// puts zeroes to fill in the board if there are empty spaces;
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
  var valsOut = [valsIn[0]];
// puts 0 in new array at index 0;
  var indicesOut = [0];
  var alreadySmashed = false;
  for (var i = 1; i < valsIn.length; i++) {
// if the numbers next to and equal to each other, add them together (multiply one number by 2)
// the .lenth -1 functions is equal to ruby .last methods. So
    if (valsIn[i] === valsOut[valsOut.length-1] && !alreadySmashed) {
      //this is the same as valsOut[valsOut.length - 1] += valsIn[i];
      valsOut[valsOut.length-1] *= 2;
      alreadySmashed = true;
      //if I am smashing, I want my indices to be the same number as what I smashed. So, take the last value of indicesOut and push it to indicesOut again. Double whammy.
      indicesOut.push(indicesOut[indicesOut.length-1]);
      this.score += valsOut[valsOut.length-1];
      // console.log(this.score);
    }
//if they're not equal to each other, push the value and the indices OUT.
      else {
//alreadySmashed prevents everything form combining (like [2,2,2,2] to [8,0,0,0] automatically)
      alreadySmashed = false;
      //If I didn't smash, then make my out index the one after the last index in indicesOut because math of plus one.
      indicesOut.push(indicesOut[indicesOut.length-1] + 1);
      // I didn't smash, so push my value at i to valsOut. Save me!
      valsOut.push(valsIn[i]);
    }
  }
  $(".numbers").empty();
  $(".numbers").append(this.score);
  console.log(this.score);
//returns 2D array
  return [valsOut, indicesOut];
};

// columnIndex is the index of all four columns (see iteration above);
Game.prototype.move = function(index, dim, vertex) {
// we pass in 1 because we're working in column dimension (dimesnion can be 0 or 1),
// columnIndex can be [0,1,2,3]. Loop in case statement iterates through numbers.
  var valsAndIndicesIn = this.getValsByDim(dim, index);
  var valsIn = valsAndIndicesIn[0];
  var indicesIn = valsAndIndicesIn[1];
// smash values (like [2,2])
  var valsandIndicesOut = this.smash(valsIn);
//below begins the unsmashing;
  var valsOut = valsandIndicesOut[0];
  var indicesOut = valsandIndicesOut[1];
  this.setValsByDim(dim, index, valsOut);
  this.display(index, vertex, dim, indicesIn, indicesOut, valsOut);
};

  //loop over indices in and indices out to see if they are the same. if they are, then nothing has moved!
Game.prototype.display = function(index, vertex, dim, indicesIn, indicesOut, valsOut) {
  for (var i = 0; i < indicesIn.length; i++) {
    var tileQuery;
    if (dim === "col") {
      tileQuery = $(tileSelect(indicesIn[i], index));
      console.log(dim);
    } else if (dim === "row") {
      tileQuery = $(tileSelect(index, indicesIn[i]));
    }
    //if I am smashed into, delete myself
    if (i < indicesIn.length - 1) {
      if (indicesOut[i] === indicesOut[i+1]) {
        tileQuery[0].remove();
      }
    }
    // if i smashed into someone
    if (i >= 1) {
      //aka, they are in the same spot
      if (indicesOut[i] === indicesOut[i-1]) {
        var newVal = valsOut[indicesOut[i]];
        tileQuery.text(newVal);
        tileQuery[0].setAttribute("data-val", newVal);
      }
    }
    // dim = ("col") ? "row" : "col";

    if (indicesIn[i] !== indicesOut[i]) {
      if (dim === "col") {
        tileQuery[0].setAttribute("data-row", ("r" + indicesOut[i]));
      } else {
        tileQuery[0].setAttribute("data-col", ("c" + indicesOut[i]));
      }

//will use this later to prevent a tile from appearing when nothing has moved;
      this.hasMoved = true;
    }
  }
};

Game.prototype.moveRowLeft = function(rowIndex) {

  var valsAndIndicesIn = this.getValsByDim("row", rowIndex);
  var valsIn = valsAndIndicesIn[0];
  var indicesIn = valsAndIndicesIn[1];
  var valsandIndicesOut = this.smash(valsIn);
  var valsOut = valsandIndicesOut[0];
  var indicesOut = valsandIndicesOut[1];
  this.setValsByDim("row", rowIndex, valsOut);
  //loop over indices in and indices out to see if they are the same. if they are, then nothing has moved!
  for (var i = 0; i < indicesIn.length; i++){
    var tileQuery = $(tileSelect(rowIndex, indicesIn[i]));
    //if I am smashed into, delete myself
    if (i < indicesIn.length - 1) {
      if (indicesOut[i] === indicesOut[i+1]) {
        tileQuery[0].remove();
      }
    }
    // if i smashed into someone
    if (i >= 1) {
      if (indicesOut[i] === indicesOut[i-1]) {
        var newVal = valsOut[indicesOut[i]];
        tileQuery.text(newVal);
        tileQuery[0].setAttribute("data-val", newVal);
      }
    }
    if (indicesIn[i] !== indicesOut[i]) {
      tileQuery[0].setAttribute("data-col", ("c" + indicesOut[i]));
      this.hasMoved = true;
    }
  }
};

// columnIndex is the index of all four columns (see iteration above);
Game.prototype.moveColumnDown = function(columnIndex) {
// columnIndex can be [0,1,2,3]. Loop in case statement iterates through numbers.
  var valsAndIndicesIn = this.getValsByDim("col", columnIndex);
  var valsIn = valsAndIndicesIn[0];
  valsIn.reverse();
  var indicesIn = valsAndIndicesIn[1];
  indicesIn.reverse();
// smash values (like [2,2])
  var valsandIndicesOut = this.smash(valsIn);
  var valsOut = valsandIndicesOut[0];
  while  (valsOut.length != this.boardSize) {
    valsOut.push(0);
  }
  valsOut.reverse();
  var indicesOut = valsandIndicesOut[1];
  indicesOut = this.reverseIndices(indicesOut);
  this.setValsByDim("col", columnIndex, valsOut);
  //loop over indices in and indices out to see if they are the same. if they are, then nothing has moved!
  for (var i = 0; i < indicesIn.length; i++){
    var tileQuery = $(tileSelect(indicesIn[i], columnIndex));
    //if I am smashed into, delete myself
    if (i < indicesIn.length - 1) {
      if (indicesOut[i] === indicesOut[i+1]) {
        tileQuery[0].remove();
      }
    }
    // if i smashed into someone
    if (i >= 1) {
      //aka, they are in the same spot
      if (indicesOut[i] === indicesOut[i-1]) {
        var newVal = valsOut[indicesOut[i]];
        tileQuery.text(newVal);
        tileQuery[0].setAttribute("data-val", newVal);
      }
    }
    if (indicesIn[i] !== indicesOut[i]) {
      tileQuery[0].setAttribute("data-row", ("r" + indicesOut[i]));
      this.hasMoved = true;
    }
  }
};
/// this is all the code from Down function but should be making it move the row.
//make this work for right;
Game.prototype.moveRowRight = function(rowIndex) {
// rowIndex can be [0,1,2,3]. Loop in case statement iterates through numbers.
  var valsAndIndicesIn = this.getValsByDim("row", rowIndex);
  var valsIn = valsAndIndicesIn[0];
  valsIn.reverse();
  var indicesIn = valsAndIndicesIn[1];
  indicesIn.reverse();
// smash values (like [2,2])
  var valsandIndicesOut = this.smash(valsIn);
  var valsOut = valsandIndicesOut[0];
  while  (valsOut.length != this.boardSize) {
    valsOut.push(0);
  }
  valsOut.reverse();
  var indicesOut = valsandIndicesOut[1];
  indicesOut = this.reverseIndices(indicesOut);
  this.setValsByDim("row", rowIndex, valsOut);
  //loop over indices in and indices out to see if they are the same. if they are, then nothing has moved!
  for (var i = 0; i < indicesIn.length; i++){
    var tileQuery = $(tileSelect(rowIndex, indicesIn[i]));
    //if I am smashed into, delete myself
    if (i < indicesIn.length - 1) {
      if (indicesOut[i] === indicesOut[i+1]) {
        tileQuery[0].remove();
      }
    }
    // if i smashed into someone
    if (i >= 1) {
      //aka, they are in the same spot
      if (indicesOut[i] === indicesOut[i-1]) {
        var newVal = valsOut[indicesOut[i]];
        tileQuery.text(newVal);
        tileQuery[0].setAttribute("data-val", newVal);
      }
    }
    if (indicesIn[i] !== indicesOut[i]) {
      tileQuery[0].setAttribute("data-col", ("c" + indicesOut[i]));
      this.hasMoved = true;
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
