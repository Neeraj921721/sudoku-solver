This is a project based on board game Sudoku. 
Use this to solve the sudoku that is looking hard for you!!

Prerequisites environment setup:
1. Download and install node.
2. Install sass compiler extension in your vs code.

How to set up:
1. clone the repository in your local.
2. head to project directory which is sudoku-solver directory.
3. open the command prompt/terminal and run the command to install all the dependencies: <b>npm install</b>
4. Once all the dependencies are installed run the command to start the server: <b>npm start</b>
5. open your favourite browser and go to http://localhost:3000
6. And that's all you need to do to start with the project.

How to play:
1. Enter random numbers in the boxes clicking on it in the range of 1-9 inclusive.
2. Make sure no same digits are there in the same row or same column as this makes the problem board invalid. Although, upon wrong board setup, program will alert you.
3. Once the numbers are entered, to solve the sudoku problem - just click on the button <b>Solve</b> and it will solve the sudoku for you.
4. To clear the board and start afresh, click on the button <b>Clear Board</b>.


Technologies Used:
1. HTML
2. SCSS (sass) - it generates scss using sass compiler. Please note that the generated css file is referenced in index.html present in the same directory as styles.scss
3. Pure Vanilla Javascript.
4. Node server enironment and Express framework.
5. For the logic part [backtracking algorithm](https://www.geeksforgeeks.org/sudoku-backtracking-7/) is used. refer <b>Sudoku.js</b> file for the core logic.

This is built using HTML, SCSS/CSS, Javascript & Backtracking algorithm.
For Local server, node & express sever code is used to host the page in local.

Happy Coding!!!
