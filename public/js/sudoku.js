"use strict";

const sudokuSolver = (function(){
    // public functions
    function solveSudoku(boardInput){
        return recursivelySolveTheBoard(boardInput);
    }
    
    function isValidBoard(boardInputElements){
        let validateRows = getRowsValidation(boardInputElements);
        let validateCols = getColumnsValidation(boardInputElements);
        let validateBox = getBoxValidation(boardInputElements);

        if(validateRows && validateCols && validateBox){
            return true;
        }
        return false;
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

    // private functions
    function removeUndefined(array) {
        return array.filter(element => !isNaN(element));
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

    function boardIsSolved(boardArray){
        const array = removeUndefined(boardArray);
        return array.length === boardArray.length;
    }

    function recursivelySolveTheBoard(boardArray){
        if(boardIsSolved(boardArray)){
            return boardArray;
        }
        const cellPossibilities = getNextCellAndPossibilities(boardArray);
        const nextUnSolvedCellIndex = cellPossibilities.index;
        const possibilities = cellPossibilities.choices;

        for(let i=0; i<possibilities.length; i++){
            boardArray[nextUnSolvedCellIndex] = possibilities[i];
            let solvedBoard = recursivelySolveTheBoard(boardArray);
            if(solvedBoard){
                return solvedBoard;
            }
        }
        return false;
    }

    function getNextCellAndPossibilities(boardArray){
        for(let i=0; i<boardArray.length; i++){
            if(isNaN(boardArray[i])){
                const existingValues = getAllIntersectionsRowColBox(boardArray, i);
                const choices = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(function(num){
                    return existingValues.indexOf(num) < 0;
                });
                return {
                    index: i,
                    choices: choices
                }
            }
        }
    }

    function getRow(boardArray, i){
        const startingIndex = Math.floor(i/9)*9;
        const chunkSize = 9;
        return boardArray.slice(startingIndex, startingIndex + chunkSize);
    }

    function getColumn(boardArray, i){
        const chunkSize = 9;
        const startIndexArray = [0,1,2,3,4,5,6,7,8];
        return startIndexArray.map(function(num){
            return boardArray[i+num*chunkSize];
        });
    }

    function getBox(boardArray, i){
        const boxRow = Math.floor(i/27);
        const boxCol = Math.floor(i/3)%3;
        const startIndex = boxRow * 27 + boxCol * 3;

        return [0,1,2,9,10,11,18,19,20].map((numToAdd)=>{
            return boardArray[startIndex + numToAdd];
        });
    }

    function getAllIntersectionsRowColBox(boardArray, i){
        const rows = getRow(boardArray, i);
        const cols = getColumn(boardArray, i);
        const box = getBox(boardArray, i);
        const values = (rows.concat(cols)).concat(box);
        
        let iArray = removeUndefined(values);
        const intersectionArray = [...new Set(iArray)];
        return intersectionArray;
    }

    return{
        solveSudoku : solveSudoku,
        isValidBoard : isValidBoard
    };
})();