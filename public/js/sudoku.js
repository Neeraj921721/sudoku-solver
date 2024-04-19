"use strict";

const sudokuSolver = (function(){
    // public functions
    const solveSudoku = (boardInput)=>{
        console.log(boardInput);
    };  

    const printBoard = function(result){
        console.log(result);
    };

    // private functions


    return{
        solveSudoku : solveSudoku,
        printBoard : printBoard
    }
})();