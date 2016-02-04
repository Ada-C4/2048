// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
//Random Tile Generation
// Steps:
// 1. Have a set of start values
// var tileStartValues = [2, 4];
// // 2. Select a random start value
// var result = ['January', 'February', 'March'][Math.floor(Math.random() * 3)]
// function getTwoOrFour(){
//   var result = [2, 4][Math.floor(Math.random() * 3)];
//   return result;
// }
// getTwoOrFour()
var gameBoard = [[0, 2, 0, 0], [0, 2, 0, 0], [0, 4, 4, 0], [0, 0, 4, 0]];
var freeSpaces = [];
// 3. Iterate through the rows and the columns in the gameboard
for(var i = 0; i < 4; i++){
  for(var j = 0; j < 4; j++){
    // and find all that are empty
    if (gameBoard[i][j] === 0){
      // keep a list of the indices in a new array saved as a variable
      freeSpaces.push([i, j]);
    }
  }
}
// getback a list of the indices of all free spaces on the board
console.log(freeSpaces);

//
// this.gameBoard[1]

// function getRandomIntInclusive(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }
