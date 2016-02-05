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

### Questions and Answers
**How does scoring work?**  
Scoring happens when two tiles of the same value are combined. The value of those two tiles are added to your total score.  
**When do tiles enter the game?**  
Every time you move on the board, a new tile enters the game. It can be a 2 or a 4, but 2 is much more likely. It is seemingly placed in a random empty spot on the board, after the pre-existing tiles have already moved.  
**How do you know if you've won?**  
You win the game when one of your tiles on the board has a value of 2048.  
**How do you know if you've lost?**  
You lose when you cannot add another tile to the board (it’s full).  
**What makes tiles move?**  
Arrow keys- up, down, left, right.  
**What happens when they move?**  
If the values on two tiles match, their total is combined. If the values on the two tiles do not match, they are moved as closely as possible together (no empty spaces between the tiles). All of the tiles move as far as they can (not just a single space), in the direction of the key press.  
**How would you know how far a tile should move?**  
Tiles will move in the direction of the key you’ve hit until there is no more empty space between that tile and the next tile or the edge of the board.  
**How would you know if tiles would collide?**  
Tiles change colors and value.  
**What happens when tiles collide?**  
If the tiles match in value, they are combined into one tile with the value of the sum of the two tiles (e.g., two 32 tiles makes one 64, or two 128s make one 256).  
