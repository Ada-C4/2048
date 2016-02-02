var Game = function() {
  // Game logic and initialization here
  this.board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
  this.score = 0;
};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      console.log('up');
      // console.log(tile.attr("data-row"));
      // console.log(tile.attr("data-col"));
      console.log(tile);
      console.log(tile[0]);
      console.log(tile[0].dataset.row);
      console.log(tile[0].dataset.col);
      console.log(tile[0].dataset.val);
      $('.tile').animate({top: '-=135px'}, 50);
      // check to see if the space above is empty, if Yes, move to that space
      break;
    case 40: //down
      console.log('down');
      $('.tile').animate({top: '+=135px'}, 50);
      break;
    case 37: //left
      console.log('left');
      $('.tile').animate({left: '-=135px'}, 50);
      break;
    case 39: //right
      console.log('right');
      $('.tile').animate({left: '+=135px'}, 50);
      break;
  }
};

// call this function twice when creating a new game, call it on every turn
Game.prototype.createRandomTile = function() {

};


$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');
      game.moveTile(tile, event.which);
    }
  });
});
