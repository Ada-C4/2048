# 2048
For this project, we will be working in pairs to create a clone of the super-fun browser based game [2048](http://gabrielecirulli.github.io/2048/).

You will not use or reference of of the code or assets in the original or any clones, forks, remakes, extensions, or modifications of 2048. This one is yours. Own it.

This repo provides a bare minimum of markup, styles, and javascript. It's enough to get you going, but it's likely that your implementation will require significant extension and modification of the provided assets.

## Project Deliverables
Recreate as much of the original game as is reasonable in the one week we have alotted for this project. Focus on completing and delivering individual chunks of functionality. This is an ambitious project, so allocate your time wisely and focus on understanding the _how_ and _why_ of the code you write.

### Baseline Submission
[Trello Link](https://trello.com/b/uKc7d7cU/2048)

1. How does scoring work?
You get the number of points for tile that is created (Ex: If you combine 2 twos, you get 4 points)
2. When do tiles enter the game?
Anytime a player makes a valid move a new tile is created in one of the open spots
3. How do you know if you've won?
When you get the 2048 tile (combine two 1024 tiles)
4. How do you know if you've lost?
Board is full and there are no more moves
5. What makes tiles move?
Keyboard input - When the user touches either the up/down/right/left arrow key
6. What happens when they move?
Matching tiles that share an edge in the direction of the move get combined. All other tiles move as far as possible in the move direction.
7. How would you know how far a tile should move?
Tiles should move so that any empty spots are in the opposite direction of the move
8. How would you know if tiles would collide?
If a move results in two tiles of the same number sliding in place next to each other, the tiles should collide to form a new tile that equals their sums.
9. What happens when tiles collide?
The two tiles combine to form a new tile that equals their sum

### Learning Goals
- Organizing JavaScript functionality into maintainable objects.
- Exploring how HTML, CSS, and JavaScript work together to create a memorable user experience.
- Defining units of work--individually deliverable components--that can be ordered, scoped, and scheduled.
- Make things zoom around a grid with math and stuff.

### Project Baseline
- Play a couple games of [2048](http://gabrielecirulli.github.io/2048/). Think about everything that's likely happening in the code to support what's happening on the screen. Once you've got a feel for the game, talk with your pair and answer the following questions:
  1. How does scoring work?
  1. When do tiles enter the game?
  1. How do you know if you've won?
  1. How do you know if you've lost?
  1. What makes tiles move?
  1. What happens when they move?
  1. How would you know how far a tile should move?
  1. How would you know if tiles would collide?
  1. What happens when tiles collide?
- Document your answers to these questions in this README.
- Use your discussion and answers to create tasks for a trello board. Organize those tasks into deliverable components (e.e., _Scoring_, _Tile Collision_, _Win/Loss_).
- Open a PR with your discussion notes and answers to the above questions. Include a link to your Trello board. Indicate in the PR which deliverable(s) you are targeting first.
