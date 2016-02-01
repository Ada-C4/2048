# 2048
For this project, we will be working in pairs to create a clone of the super-fun browser based game [2048](http://gabrielecirulli.github.io/2048/).

You will not use or reference of of the code or assets in the original or any clones, forks, remakes, extensions, or modifications of 2048. This one is yours. Own it.

This repo provides a bare minimum of markup, styles, and javascript. It's enough to get you going, but it's likely that your implementation will require significant extension and modification of the provided assets.

## Project Deliverables
Recreate as much of the original game as is reasonable in the one week we have alotted for this project. Focus on completing and delivering individual chunks of functionality. This is an ambitious project, so allocate your time wisely and focus on understanding the _how_ and _why_ of the code you write.

### Learning Goals
- Organzizing JavaScript functionality into maintainable objects.
- Exploring how HTML, CSS, and JavaScript work together to create a memorable user experience.
- Defining units of work--individually deliverable components--that can be ordered, scoped, and scheduled.
- Make things zoom around a grid with math and stuff.

### Project Baseline
- Play a couple games of [2048](http://gabrielecirulli.github.io/2048/). Think about everything that's likely happening in the code to support what's happening on the screen. Once you've got a feel for the game, talk with your pair and answer the following questions:
  1. How does scoring work?
    Each time numbers collide & combine, their sum is added to the score.
  1. When do tiles enter the game?
    Tiles enter the game any time the board moves, whether that is from a shift of direction, and/or a collision of numbers.
  1. How do you know if you've won?
    If you get any tile number to atleast 2048.
  1. How do you know if you've lost?
    If the board is filled with no more moves and all numbers on the board are under 2048.
  1. What makes tiles move?
    The arrow keys.
  1. What happens when they move?
    All tiles will shift completely over in the direction the arrow points, and if any number shifts toward and touches a number that is the same as itself then they combine into one tile totaling their sum.
  1. How would you know how far a tile should move?
    It will move until it hits a non blank space or hits a same number that it could collide with.
  1. How would you know if tiles would collide?
    They will collide if they match/ equal each other.
  1. What happens when tiles collide?
    They combine. See above.

- Document your answers to these questions in this README.
- Use your discussion and answers to create tasks for a trello board. Organize those tasks into deliverable components (e.e., _Scoring_, _Tile Collision_, _Win/Loss_).
- Open a PR with your discussion notes and answers to the above questions. Include a link to your Trello board. Indicate in the PR which deliverable(s) you are targeting first.
