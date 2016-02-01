var Game = function() {
  var board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
};

Game.prototype.randTile = function(board) {
  console.log(board)
  var arr = [];
  for(var i = 0; i < 4; i++) {
    for(var j = 0; j < 4; j++ ) {
      if( board[i][j] === 0 ) {
        arr.push([i,j]);
      }
    }
  }
  var randNum = Math.floor((Math.random() * arr.length));
  var i_board = arr[randNum][0];
  var j_board = arr[randNum][1];

    if (Math.floor((Math.random() * 10) + 1) == 7) {
      board[i_board][j_board] = 4;
    } else { board[i_board][j_board] = 2; }
  return board;
}

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      console.log('up');
      break;
    case 40: //down
      console.log('down');
      break;
    case 37: //left
      console.log('left');
      break;
    case 39: //right
      console.log('right');
      break;
  }
};

// $(document).ready(function() {
//   console.log("ready to go!");
//   // Any interactive jQuery functionality
//   var game = new Game();
//
//   $('body').keydown(function(event){
//     var arrows = [37, 38, 39, 40];
//     if (arrows.indexOf(event.which) > -1) {
//       var tile = $('.tile');
//
//       game.moveTile(tile, event.which);
//     }
//   });
// });
// 
// var game = new Game();
// game.randTile([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
