### Project Baseline
- Play a couple games of [2048](http://gabrielecirulli.github.io/2048/). Think about everything that's likely happening in the code to support what's happening on the screen. Once you've got a feel for the game, talk with your pair and answer the following questions:
  1. How does scoring work?

    Scoring works by adding the numbers of combined tiles to total score
  1. When do tiles enter the game?
    Tiles enter the game with every keydown of your turn
  1. How do you know if you've won?
    A tile with 2048 has been created by combining all the other tiles
  1. How do you know if you've lost?
    When there is no 2048 tile, no room for more tiles, and no combinations possible on the board.
  1. What makes tiles move?
    User key commands
  1. What happens when they move?
    If two of the same numbers are adjacent in the direction of movement, they combine. Everything moves as far on the board as possible in movement direction.
  1. How would you know how far a tile should move?
    It moves until it reaches another tile that is not empty and not the same number.
  1. How would you know if tiles would collide?
    If the tiles are the same number, next to each other, and next to each other in the direction of movement.
  1. What happens when tiles collide?
    The numbers add together and form one tile the furthest in the movement direction.

  
