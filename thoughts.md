Determining End of Game
* If all spaces in the game board contain a tile, and no tile is contiguous to a tile of the same value, the game is over.

Scoring
* When two tiles of the same value collide, their combined value is added to the total score.
var totalScore = 0;

Tile Movement
* When a directional key  is pressed, all of the tiles in a row (for left or right keys) or column (up or down keys) will shift in the direction of the key press to the furthest spot possible
example: [0, 2, 4, 0] + right directional key becomes [0, 0, 2, 4]

Combining Tiles
* When there are unimpeded tiles of the same value in a row or column and the directional button is pushed in the same direction as the line of values, the value closest to the edge of the board becomes combined with the preceding tile, and the tile that is considered the "bottom" disappears.
example [0, 2, 2, 0] + left key press becomes [4, 0, 0, 0]

example: 2 2 2 push the right directional arrow becomes: 2 4
vertical bottom 2 2 2 top push the up arrow becomes bottom 2 top 4

Any space that the original tile vacates becomes 0 (empty)

Tile movement and combination occurs simultaneously with all rows or columns corresponding to a given key press.

Random Tile Appearance
* After each directional key is pressed, a tile with a value of either two or 4 will appear randomly in an empty space on the game board.

Steps to make this happen:
Generate a tile("value")
Check the board for empty spots(if any of the spots in the array ==== 0)
Use two nested loops to select a random empty spot on the board and select the value


// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//The Math.floor() function returns the largest integer less than or equal to a given number.

function randomGameBoardIndex(min, max){
  return Math.floor(Math.random()(put an asterisk)(max-min+1)+min));
}
randomGameBoardIndex(0, 15);

myArray = [2, 4];
var rand = myArray[Math.floor(Math.random() * myArray.length)];

* Turn Sequence of functions
Key Press
Tile Slide
Tile Combination
Tile Slide
Increment Score
Check for conditions to determine end of game
Check for 2048 tile
If EOG is false, Generate Random Tile
