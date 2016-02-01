# 2048
For this project, we will be working in pairs to create a clone of the super-fun browser based game [2048](http://gabrielecirulli.github.io/2048/).

You will not use or reference of of the code or assets in the original or any clones, forks, remakes, extensions, or modifications of 2048. This one is yours. Own it.

This repo provides a bare minimum of markup, styles, and javascript. It's enough to get you going, but it's likely that your implementation will require significant extension and modification of the provided assets.

## Project Deliverables
Recreate as much of the original game as is reasonable in the one week we have alotted for this project. Focus on completing and delivering individual chunks of functionality. This is an ambitious project, so allocate your time wisely and focus on understanding the _how_ and _why_ of the code you write.

### Learning Goals
- Organizing JavaScript functionality into maintainable objects.
- Exploring how HTML, CSS, and JavaScript work together to create a memorable user experience.
- Defining units of work--individually deliverable components--that can be ordered, scoped, and scheduled.
- Make things zoom around a grid with math and stuff.

### Project Baseline
- Play a couple games of [2048](http://gabrielecirulli.github.io/2048/). Think about everything that's likely happening in the code to support what's happening on the screen. Once you've got a feel for the game, talk with your pair and answer the following questions:
  1. How does scoring work?  
  Each time you combine two tiles, their sum is added to the score. So combining a 2 and a 2 adds 4 to your score, combining a 4 and a 4 adds 8 to your score, combining an 8 and an 8 adds 16 to your score, etc.  
  1. When do tiles enter the game?  
  The game starts with two tiles on the board. A new tile is placed in a random empty space every time you swipe. Most new tiles are 2s, but a small percentage of these are 4s.  
  1. How do you know if you've won?  
  You win if you get a tile with a score of 2048.  
  1. How do you know if you've lost?  
  If the board is full and you have no more possible moves (there are no tiles that are adjacent to each other with the same number).  
  1. What makes tiles move?  
  Hitting an arrow key.  
  1. What happens when they move?  
  All of the cells in the rows or columns (depending on the direction of the move) move to the edge of the grid in the direction that they were swiped. If two cells are next to each other (or there are only empty cells between them) and have the same number, they should be combined. Cells can only combine once on each move.
  1. How would you know how far a tile should move?  
  It should move until it hits the edge of the grid or it hits a tile that it cannot combine with. Or, if it hits a tile that it can combine with, it should combine with that tile. Depending on what is on the other side of the combined tile, the combined tile may still need to move towards the edge of the grid.
  1. How would you know if tiles would collide?  
  Tiles have to have the same number, and should not have already combined in this move.
  1. What happens when tiles collide?  
  If the tiles have the same number and haven't combined yet on this move, they should combine. If they have already combined on this move, they don't combine again. If the tiles don't have the same number, they stay next to each other. 
- Document your answers to these questions in this README.
- Use your discussion and answers to create tasks for a trello board. Organize those tasks into deliverable components (e.e., _Scoring_, _Tile Collision_, _Win/Loss_).
- Open a PR with your discussion notes and answers to the above questions. Include a link to your Trello board. Indicate in the PR which deliverable(s) you are targeting first.
