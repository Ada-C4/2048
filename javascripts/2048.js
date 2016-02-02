var Game = function() {
  // Game logic and initialization here
};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      var dataRow = $(".tile").attr("data-row").slice(1);
          dataInt = parseInt(dataRow, 10);
          if(dataInt > 0){
            dataInt -= 1;
          }
          $(".tile")[0].setAttribute("data-row", ("r" + dataInt));
        // subtract from data-row, if cell is empty
      break;
    case 40: //down
      var dataRow = $(".tile").attr("data-row").slice(1);
          dataInt = parseInt(dataRow, 10);
          if(dataInt < 3){
            dataInt += 1;
          }
          $(".tile")[0].setAttribute("data-row", ("r" + dataInt));
      break;
    case 37: //left
      console.log('left');
      break;
    case 39: //right
      console.log('right');
      break;
  }
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
