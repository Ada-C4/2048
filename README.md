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
  When two tiles of the same value collide, the point value of the added tiles is added to the overall score.

  1. When do tiles enter the game?
  A tile with a value of either 2 or 4 is randomly placed on the board after a directional key is placed if there is space on the board for a new tile to appear.

  1. How do you know if you've won?
  When there is a tile with a value of 2048 on the board. It is also possible to keep playing after this goal is met to add more points to the overall score.

  1. How do you know if you've lost?
  If all the spaces on the board contain a tile that does not have a tile of the same value directly next to it and there is no tile with the value of 2048.

  1. What makes tiles move?
  Arrow key presses and a=left, s=down, d=right, w=up

  1. What happens when they move?
  If there are two tiles with the same value and there is not a tile of a different value in between them when a key is pressed, they combine into one tile with the combined value of the two previous tiles

  1. How would you know how far a tile should move?
  A tile can only move as far as the end of the game board, or combine with another tile of the same value, or slide next to a tile with a different value. All of the tiles will shift in the direction of the key that is pressed.

  1. How would you know if tiles would collide?
  If two tiles have the same value and there is not a tile of a different value in between them

  1. What happens when tiles collide?
  their combined value is added to the overall score, they combine into one tile and shift as far as they can in the direction of the button pressed.
  
- Document your answers to these questions in this README.
- Use your discussion and answers to create tasks for a trello board. Organize those tasks into deliverable components (e.e., _Scoring_, _Tile Collision_, _Win/Loss_).
- Open a PR with your discussion notes and answers to the above questions. Include a link to your Trello board. Indicate in the PR which deliverable(s) you are targeting first.
