var removeZeros = function(array) {
  return array.filter(function (val) {
    return val !== 0;
  });
};

var collision = function(array, direction) {
  // clone array
  newArray = array.slice();
  // remove 0's from array
  newArray = removeZeros(newArray);
  // reverse array if direction is negative
  if (direction === 'negative') {
    newArray.reverse();
  }
  // combine anything that needs combining
  if (newArray.length > 1) {
    for ( a = newArray.length, j = 0; a > 0; j++, a--) {
      if (newArray[j] === newArray[(j+1)]) {
        newArray[j] = newArray[j] * 2;
        newArray[(j+1)] = 0;
        // this.score += newArray[j]
      }
    }
  }
  // remove all zeros again
  newArray = removeZeros(newArray);
  if (newArray.length < 4) {
    while (newArray.length < 4) {
      newArray.push(0);
    }
  }

  // reverse again if direction was negative
  return direction === 'negative' ? newArray.reverse() : newArray;
};

var gameOver = function (gameArray) {
  var over = true;
  while (over === false) {

  }
  for (i = gameArray.length-1; i >= 0; i--) {
    if (collision(gameArray[i]) !== gameArray[i]) {
      over = false;
      break;
    }
  }
  return over;
};

var test =[[2, 4, 2, 4], [4, 2, 4, 2], [2, 4, 2, 4], [4, 2, 4, 2]];
var testOne = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 8, 9], [10, 11, 12, 13]];
var testThree = [[1, 2, 9, 10], [3, 4, 11, 12], [5, 6, 13, 14], [7, 8, 15, 16]];


console.log("expect: true");
console.log(gameOver(test));
console.log("expect: false");
console.log(gameOver(testOne));
console.log("expect: true");
console.log(gameOver(testThree));