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

sudokuBoard.addEventListener("keyup", (event) => {
	if (event.target && event.target.nodeName == "TD") {
		let validNumberRegex = /[1-9]/;
		let tdElement = event.target;

		if (
			tdElement.innerText.length > 0 &&
			validNumberRegex.test(tdElement.innerText[0])
		) {
			tdElement.innerText = tdElement.innerText[0];
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
	const boardInputElements = [];

	let tdElements = document.querySelectorAll(".grid td");
	for (let el of tdElements) {
		boardInputElements.push(el.innerText[0]);
	}
	return boardInputElements;
}

function removeUndefined(array) {
	return array.filter(element => element !== undefined);
}

function isArrayUnique(arr){
	const f_arr = removeUndefined(arr);
	if(f_arr.length == 0)
		return true;
	const uniqueSet = new Set();
	for(const el of f_arr){
		if(uniqueSet.has(el)){
			return false;
		}
		uniqueSet.add(el);
	}
	return (uniqueSet.size === f_arr.length);
}

function getRowsValidation(boardInputElements){
	let i = 0;
	let chunkSize = 9;
	for(let i=0; i<boardInputElements.length; i++){
		let startIndex = i * chunkSize;
		let endingIndex = startIndex + chunkSize;
		const arr = boardInputElements.slice(startIndex, endingIndex);
		let unique = isArrayUnique(arr);
		if(!unique)
			return false;
	}
	return true;
}

function getColumnsValidation(boardInputElements){
	const chunkSize = 9;
	const startIndexArray = [0,1,2,3,4,5,6,7,8];
	for(let i=0; i<chunkSize; i++){
		const columnArray = startIndexArray.map(function(num){
			return boardInputElements[i + num * chunkSize];
		});
		let unique = isArrayUnique(columnArray);
		if(!unique)
			return false;
	}
	return true;
}

function getBoxValidation(boardInputElements){
	const startIndexArray = [0,3,6,27,30,33,54,57,60];
	for(let startIndex of startIndexArray){
		const boxArray = [0,1,2,9,10,11,18,19,20].map((numToAdd)=>{
			return boardInputElements[startIndex + numToAdd];
		});
		let unique = isArrayUnique(boxArray);
		if(!unique)
			return false;
	}
	return true;
}

solveButton.addEventListener("click", () => {
	// check for valid input
	const boardInputElements = getInputBoard();
	let validateRows = getRowsValidation(boardInputElements);
	let validateCols = getColumnsValidation(boardInputElements);
	let validateBox = getBoxValidation(boardInputElements);

	// if valid input then call the
	// backtracking algorithm to solve the sudoku
	if(validateRows && validateCols && validateBox){
		SolveSudoku(boardInputElements);
	}else{
		alert('Invalid Board Elements. Please read the rules carefully and try again!');
	}
});
