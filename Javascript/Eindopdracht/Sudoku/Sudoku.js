
let row1 = document.getElementsByClassName('r1');
let row2 = document.getElementsByClassName('r2');
let row3 = document.getElementsByClassName('r3');
let row4 = document.getElementsByClassName('r4');
let row5 = document.getElementsByClassName('r5');
let row6 = document.getElementsByClassName('r6');
let row7 = document.getElementsByClassName('r7');
let row8 = document.getElementsByClassName('r8');
let row9 = document.getElementsByClassName('r9');

let col1 = document.getElementsByClassName('c1');
let col2 = document.getElementsByClassName('c2');
let col3 = document.getElementsByClassName('c3');
let col4 = document.getElementsByClassName('c4');
let col5 = document.getElementsByClassName('c5');
let col6 = document.getElementsByClassName('c6');
let col7 = document.getElementsByClassName('c7');
let col8 = document.getElementsByClassName('c8');
let col9 = document.getElementsByClassName('c9');

let square1 = document.getElementsByClassName('s1');
let square2 = document.getElementsByClassName('s2');
let square3 = document.getElementsByClassName('s3');
let square4 = document.getElementsByClassName('s4');
let square5 = document.getElementsByClassName('s5');
let square6 = document.getElementsByClassName('s6');
let square7 = document.getElementsByClassName('s7');
let square8 = document.getElementsByClassName('s8');
let square9 = document.getElementsByClassName('s9');

let cells = document.getElementsByClassName('sudokuCell');

for (i = 0; i < 9; i++) {
    switch (i) {
        case 1:
            for (a = 0; a < 9; a++) {
                if (row1[a].textContent == '') {
                    row1[a].possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                } else {
                    row1[a].possibleNumbers = [];
                }
            }
            break;
        case 2:
            for (a = 0; a < 9; a++) {
                if (row2[a].textContent == '') {
                    row2[a].possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                } else {
                    row2[a].possibleNumbers = [];
                }
            }
            break;
        case 3:
            for (a = 0; a < 9; a++) {
                if (row3[a].textContent == '') {
                    row3[a].possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                } else {
                    row3[a].possibleNumbers = [];
                }
            }
            break;
        case 4:
            for (a = 0; a < 9; a++) {
                if (row4[a].textContent == '') {
                    row4[a].possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                } else {
                    row4[a].possibleNumbers = [];
                }
            }
            break;
        case 5:
            for (a = 0; a < 9; a++) {
                if (row5[a].textContent == '') {
                    row5[a].possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                } else {
                    row5[a].possibleNumbers = [];
                }
            }
            break;
        case 6:
            for (a = 0; a < 9; a++) {
                if (row6[a].textContent == '') {
                    row6[a].possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                } else {
                    row6[a].possibleNumbers = [];
                }
            }
            break;
        case 7:
            for (a = 0; a < 9; a++) {
                if (row7[a].textContent == '') {
                    row7[a].possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                } else {
                    row7[a].possibleNumbers = [];
                }
            }
            break;
        case 8:
            for (a = 0; a < 9; a++) {
                if (row8[a].textContent == '') {
                    row8[a].possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                } else {
                    row8[a].possibleNumbers = [];
                }
            }
            break;
        case 9:
            for (a = 0; a < 9; a++) {
                if (row9[a].textContent == '') {
                    row9[a].possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                } else {
                    row9[a].possibleNumbers = [];
                }
            }
            break;
    }
}

function showPossibles(item) {
    for (i = 0; i < cells.length; i++) {
        if (cells[i].classList.contains('highlight')) {
            cells[i].classList.remove('highlight');
        }
    }
    let itemClasses = item.classList;
    for (i = 0; i < cells.length; i++) {
        if (cells[i].classList.contains(itemClasses[1]) ||
            cells[i].classList.contains(itemClasses[2]) ||
            cells[i].classList.contains(itemClasses[3])) {
            cells[i].classList.add('highlight')
        }
    }
}


// let puzzle;

// class hardSudoku {
//     constructor() {
//         this.items = [
//             new SudokuCell(1, 1, 1),
//             new SudokuCell(1, 2, 1, 1),
//             new SudokuCell(1, 3, 1, 7),
//             new SudokuCell(1, 4, 2),
//             new SudokuCell(1, 5, 2, 5),
//             new SudokuCell(1, 6, 2),
//             new SudokuCell(1, 7, 3, 9),
//             new SudokuCell(1, 8, 3),
//             new SudokuCell(1, 9, 3),
//             new SudokuCell(2, 1, 1),
//             new SudokuCell(2, 2, 1),
//             new SudokuCell(2, 3, 1),
//             new SudokuCell(2, 4, 2),
//             new SudokuCell(2, 5, 2),
//             new SudokuCell(2, 6, 2),
//             new SudokuCell(2, 7, 3),
//             new SudokuCell(2, 8, 3),
//             new SudokuCell(2, 9, 3, 1),
//             new SudokuCell(3, 1, 1, 2),
//             new SudokuCell(3, 2, 1),
//             new SudokuCell(3, 3, 1),
//             new SudokuCell(3, 4, 2),
//             new SudokuCell(3, 5, 2),
//             new SudokuCell(3, 6, 2),
//             new SudokuCell(3, 7, 3, 4),
//             new SudokuCell(3, 8, 3),
//             new SudokuCell(3, 9, 3),
//             new SudokuCell(4, 1, 4),
//             new SudokuCell(4, 2, 4),
//             new SudokuCell(4, 3, 4),
//             new SudokuCell(4, 4, 5),
//             new SudokuCell(4, 5, 5, 3),
//             new SudokuCell(4, 6, 5, 1),
//             new SudokuCell(4, 7, 6, 5),
//             new SudokuCell(4, 8, 6, 6),
//             new SudokuCell(4, 9, 6),
//             new SudokuCell(5, 1, 4, 9),
//             new SudokuCell(5, 2, 4),
//             new SudokuCell(5, 3, 4),
//             new SudokuCell(5, 4, 5, 6),
//             new SudokuCell(5, 5, 5),
//             new SudokuCell(5, 6, 5),
//             new SudokuCell(5, 7, 6),
//             new SudokuCell(5, 8, 6, 4),
//             new SudokuCell(5, 9, 6),
//             new SudokuCell(6, 1, 4),
//             new SudokuCell(6, 2, 4),
//             new SudokuCell(6, 3, 4, 8),
//             new SudokuCell(6, 4, 5),
//             new SudokuCell(6, 5, 5),
//             new SudokuCell(6, 6, 5),
//             new SudokuCell(6, 7, 6),
//             new SudokuCell(6, 8, 6, 9),
//             new SudokuCell(6, 9, 6),
//             new SudokuCell(7, 1, 7),
//             new SudokuCell(7, 2, 7, 4),
//             new SudokuCell(7, 3, 7, 6),
//             new SudokuCell(7, 4, 8),
//             new SudokuCell(7, 5, 8, 8),
//             new SudokuCell(7, 6, 8),
//             new SudokuCell(7, 7, 9),
//             new SudokuCell(7, 8, 9),
//             new SudokuCell(7, 9, 9),
//             new SudokuCell(8, 1, 7),
//             new SudokuCell(8, 2, 7),
//             new SudokuCell(8, 3, 7, 3),
//             new SudokuCell(8, 4, 8, 4),
//             new SudokuCell(8, 5, 8),
//             new SudokuCell(8, 6, 8),
//             new SudokuCell(8, 7, 9),
//             new SudokuCell(8, 8, 9),
//             new SudokuCell(8, 9, 9),
//             new SudokuCell(9, 1, 7),
//             new SudokuCell(9, 2, 7, 8),
//             new SudokuCell(9, 3, 7),
//             new SudokuCell(9, 4, 8),
//             new SudokuCell(9, 5, 8),
//             new SudokuCell(9, 6, 8, 6),
//             new SudokuCell(9, 7, 9),
//             new SudokuCell(9, 8, 9),
//             new SudokuCell(9, 9, 9),
//         ]
//     }
// }

// class SudokuCell {
//     constructor(row, column, block, value = null) {
//         this.row = row;
//         this.column = column;
//         this.block = block;
//         this.possible = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//         this.value = value;
//     }
// }

// function createSudoku() {
//     // Nu maar even als hack de values gehardcode in constructor van Sudoku
//     puzzle = new hardSudoku;
//     console.log(puzzle);
// }

// function showPossible() {
//     // Als je over een cell hovert moet je kunnen zien wat de mogelijke waarden zijn.
// }

