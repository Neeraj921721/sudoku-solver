import {solveSudoku, isValidBoard} from './sudoku.mjs'; 

const sudokuBoard = document.getElementById("sudoku-board");
const solveButton = document.getElementById("solve-btn");
const clearBoardButton = document.getElementById("clear-board-btn");



// pop content
document.addEventListener("DOMContentLoaded", function () {
	const popupOverlay = document.getElementById("popupOverlay");
	const closePopupButton = document.getElementById("closePopup");

	function showPopup() {
		popupOverlay.style.display = "flex";
	}

	const popupShown = sessionStorage.getItem("popupShown");
	if (!popupShown) {
		showPopup();
		sessionStorage.setItem("popupShown", "true");
	}

	closePopupButton.addEventListener("click", function () {
		popupOverlay.style.display = "none";
	});
});

// Function to move cursor to the end of a contenteditable element
function moveCursorToEnd(contentEditableElement) {
    var range = document.createRange();
    range.selectNodeContents(contentEditableElement);
    range.collapse(false); // Collapse the range to the end
    var selection = window.getSelection();
    selection.removeAllRanges(); // Clear existing selection
    selection.addRange(range); // Set new selection range
}

sudokuBoard.addEventListener("keyup", (event) => {
	if (event.target && event.target.nodeName == "TD") {
		let validNumberRegex = /[1-9]/;
		let tdElement = event.target;

		if (
			tdElement.innerText.length > 0 &&
			validNumberRegex.test(tdElement.innerText[0])
		) {
			tdElement.innerText = tdElement.innerText[0];
			moveCursorToEnd(tdElement);
		} else {
			tdElement.innerText = "";
		}
	}
});

function clearBoard() {
	let tdElements = document.querySelectorAll(".grid td");
	for (let el of tdElements) {
		el.innerText = "";
	}
}

clearBoardButton.addEventListener("click", clearBoard);

function getInputBoard(){
	let boardInputElements = [];

	let tdElements = document.querySelectorAll(".grid td");
	for (let el of tdElements) {
		boardInputElements.push(el.innerText[0]);
	}

	// convert the input elements from string to int
	boardInputElements = boardInputElements.map(str => parseInt(str));

	return boardInputElements;
}

function populateBoard(boardInput, solutionArray){
	let tdElements = document.querySelectorAll(".grid td");
	for(let i=0; i<solutionArray.length; i++){
		// if(isNaN(boardInput[i])){
		// 	tdElements[i].innerText = String(solutionArray[i]);
		// }
		tdElements[i].innerText = String(solutionArray[i]);
	}
}

solveButton.addEventListener("click", () => {
	// check for valid input
	const boardInputElements = getInputBoard();

	// if valid input then call the
	// backtracking algorithm to solve the sudoku
	if(isValidBoard(boardInputElements)){
		const solution = solveSudoku(boardInputElements);
		if(solution){
			populateBoard(boardInputElements, solution);
		}else{
			alert('Invalid Board!');
		}
	}else{
		alert('Invalid Board Elements. Please read the rules carefully and try again!');
	}
});
