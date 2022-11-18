# Project: Simon

## Installation: 
No need.

## Links:
- Wireframe:
![image](https://media.git.generalassemb.ly/user/46082/files/c0bcbfa3-6088-4d89-9aaf-961bcc5a174b)


- [Game link](https://maharnnop.github.io/Simon/).


## Preview

This is a simon game, that allow user can play by seeing and listening.

## Technology used:

- I used javascript, css and html.
- I used locally stored history of player.
- I used web speech api (SpeechSynthesisUtterance).


## Approach:
The main approach to the game is using math random to generate number then push to the array and using the number to control order and color that popup for playing

### How i solved for pass:
i use the input of user (click or arrow key) then check with the first element of array that is recoded. if both are same value, user will pass and i will remove the first element of array.


## Main features:
- random section of color pop up.
- input by click or arrow key.
- record history of player.
- Audio for color pop up .


## User Stories
- As a user, I should be able to fill username
- As a user, I should be able to click simon button or enter for start
- As a user, I should not be able to click simon button or enter repeat before i pass that stage 
- As a user, I should be able to click section of color or arrowkey after color pop up are finished
- As a user, I should be shown a modal after I pass or lose
- As a user, I should be shown a modal lose after time ranout
- As a user, I should be able to incrase 1 lifepoint (reserved life) every 5 stage
- As a user, I should be able to come back to play same stage that used to play if username is used
- As a user, I should be able to show high score board


## What left?
- hard mode (have 6 color) but now 4color that hard enought to pass
