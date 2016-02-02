var removeZeros = function(array) {
  // for(var i = array.length - 1; i >= 0; i--) {
  //     if(array[i] === 0) {
  //        array.splice(i, 1);
  //     }
  // }
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

var testOne = [0, 2, 0, 0];
var testTwo = [4, 2, 4, 4];
var testThree = [0, 0, 0, 16];
var testFour = [0, 0, 8, 16];

tileCollision(testTwo);