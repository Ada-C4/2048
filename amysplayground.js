var gameBoard = [[0, 2, 0, 0], [0, 2, 0, 0], [0, 4, 4, 0], [0, 0, 4, 0]];

function getFreeSpaces(){
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
  return freeSpaces;
};

function addOneTile(){
  var num = Math.random();

  var result;
  if (num < 0.9) {
    result = 2;
  } else {
    result = 4;
  }

  var openSpots = this.getFreeSpaces();
  var selectedSpot = openSpots[Math.floor(Math.random() * openSpots.length)];
  gameBoard[selectedSpot[0]][selectedSpot[1]] = result;
  // console.log(selectedSpot);
  return result;
}
//
// console.log(getFreeSpaces());
// console.log(addOneTile());
