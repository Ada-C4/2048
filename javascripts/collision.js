// var tileCollision = function (array, direction) {
//   // clone array
//   newArray = array.slice();
//   // remove 0's from array
//   for(var i = newArray.length - 1; i >= 0; i--) {
//       if(newArray[i] === 0) {
//          newArray.splice(i, 1);
//       }
//   }
//   // depending on direction, start checking one way or another
//   // determine if the newArray still has more than one thing in it
//   if (newArray.length > 2) {
//     if (newArray[0] === newArray[1]) {
//       newArray[0] = newArray[0] * 2;
//       newArray[1] = 0;
//       if (array[2] === array[3]) {
//         newArray[1] = newArray[2] * 2;
//         newArray[3] = 0;
//         newArray[2] = 0;
//       }
//     } else if (newArray[1] === newArray[2]) {
//       newArray[1] = newArray[1] * 2;
//       newArray[2] = 0;
//     } else if (newArray [2] === newArray[3]) {
//       newArray[2] = newArray[2] * 2;
//       newArray[3] = 0;
//     }
//   }
//   if (newArray.length < 4) {
//     while (newArray.length < 4) {
//       newArray.push(0);
//     }
//   }
//   return newArray;
// };

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


var cleanCollision = function(array, direction) {
  // clone array
  newArray = array.slice();
  // remove 0's from array
  newArray = removeZeros(newArray);

  // combine anything that needs combining
  if (newArray.length > 1) {
    if (direction === 'positive') {
      for ( a = newArray.length, j = 0; a > 0; j++, a--) {
        if (newArray[j] === newArray[(j+1)]) {
          newArray[j] = newArray[j] * 2;
          newArray[(j+1)] = 0;
        }
      }
    } else if (direction === 'negative') {
      for ( a = newArray.length; a > 0; a--) {
        if (newArray[a] === newArray[(a-1)]) {
          newArray[a] = newArray[a] * 2;
          newArray[(a-1)] = 0;
        }
      }
    }
  }
  // remove all zeros again
  newArray = removeZeros(newArray);

  // add in zeros until array reaches four spots
  if (newArray.length < 4) {
    if (direction === 'positive') {
      while (newArray.length < 4) {
        newArray.push(0);
      }
    } else if (direction === 'negative') {
      while (newArray.length < 4) {
        newArray.unshift(0);
      }
    }
  }
  return newArray;
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