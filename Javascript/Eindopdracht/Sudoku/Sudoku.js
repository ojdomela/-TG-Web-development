let cells = document.getElementsByClassName('sudokuCell');
let squares = document.getElementsByClassName('sudokuSquare');
let itemSelected = '';

for (i = 0; i < cells.length; i++) {
    if (cells[i].textContent == '') {
        cells[i].possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    } else {
        cells[i].possibleNumbers = [];
    }
}

function modifyItem(item) {
    
    if (itemSelected == 'Possibles') {
        console.log(item.possibleNumbers)
    } else if (itemSelected == '') {
        item.textContent = itemSelected;
        item.possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    } else {
        let highlighted = Array.from(document.getElementsByClassName('highlight'))
        let highlightContainsItem = false;
        for (i=0;i<highlighted.length;i++) {
            if (highlighted[i].textContent == itemSelected) {
                highlightContainsItem = true;
            }
        }
        if (!highlightContainsItem) {
            item.textContent = itemSelected;
            item.possibleNumbers = [];
            sanitizeSudoku()
        } else {
            console.log('This cant fit here!')
        }
    }
}

function clickCell(item) {
    highlight(item)
    modifyItem(item)
}

function highlight(item) {
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

function cleanSudoku() {
    for (i = 0; i < cells.length; i++) {
        cells[i].textContent = ''
        cells[i].possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
}

function clickSelector(item) {
    if (item.textContent == 'Erase!') {
        itemSelected = '';
    } else {
        itemSelected = item.textContent;
    }
}

function iterateSudoku() {

    sanitizeSudoku()

    doubleDoubleCleaner()

    checkforUniques()

    crossOutLines()
}

function sanitizeSudoku() {
    // Checks all cells for content
    // Then removes that content from the possible numbers of any other cell with a matching square, row or column
    // It could be cleaned up a bit by chucking the if (textcontent) outside the second for loop instead of inside

    for (a = 0; a < cells.length; a++) {
        let itemClasses = cells[a].classList;
        for (i = 0; i < cells.length; i++) {
            if ((cells[i].classList.contains(itemClasses[1]) ||
                cells[i].classList.contains(itemClasses[2]) ||
                cells[i].classList.contains(itemClasses[3])) &&
                cells[i].textContent == '') {

                let itemIndex = cells[i].possibleNumbers.indexOf(Number(cells[a].textContent))
                if (itemIndex != -1) {
                    cells[i].possibleNumbers.splice(itemIndex, 1)
                }
                if (cells[i].possibleNumbers.length == 1) {
                    cells[i].textContent = cells[i].possibleNumbers.shift();
                }
            }
        }
    }
}

function doubleDoubleCleaner() {
    let firstValueToRemove = [];
    let secondValueToRemove = [];
    let firstClassList = [];
    let secondClassList = [];

    // Selects all items with 2 remaining possible numbers one by one, then checks for other items in the same square with matching values
    // Then adds those numbers and their "location classes" to arrays for the next bit to process
    // Not 100% sure that it doesn't sometimes add false positives, but the next bit that processes them has a failsafe

    for (a = 0; a < squares.length; a++) {
        for (i = 0; i < squares.length; i++) {
            if (squares[a].children[i].possibleNumbers.length == 2) {
                let firstNumbers = Array.from(squares[a].children[i].possibleNumbers)
                let itemArray = Array.from(squares[a].children);
                let otherItems = itemArray.slice(0, i).concat(itemArray.slice(i + 1));
                for (z = 0; z < otherItems.length; z++) {
                    let comparedNumbers = Array.from(otherItems[z].possibleNumbers)
                    if (firstNumbers[0] == comparedNumbers[0] &&
                        firstNumbers[1] == comparedNumbers[1] &&
                        firstNumbers.length == comparedNumbers.length) {
                        firstValueToRemove.push(firstNumbers[0]);
                        secondValueToRemove.push(firstNumbers[1]);
                        firstClassList.push(Array.from(squares[a].children[i].classList));
                        secondClassList.push(Array.from(otherItems[z].classList));
                    }
                }
            }
        }
    }

    // Run through every item in the arrays created above, then check if they have matching squares, rows or columns
    // Then check those matching squares / rows / columns for their possible numbers, and removes them if present
    // If any cell has 1 possible number remaining afterwards, it gets filled in


    for (z = 0; z < firstClassList.length; z++) {
        for (a = 1; a < 4; a++) {
            if (firstClassList[z][a] == secondClassList[z][a]) {
                let removalArray = Array.from(document.getElementsByClassName(firstClassList[z][a]))
                for (i = 0; i < removalArray.length; i++) {
                    let comparedValues = Array.from(removalArray[i].possibleNumbers)
                    if (!(comparedValues.length == 2 &&
                        comparedValues[0] == firstValueToRemove[z] &&
                        comparedValues[1] == secondValueToRemove[z]) &&
                        (comparedValues.includes(firstValueToRemove[z]) ||
                            comparedValues.includes(secondValueToRemove[z]))) {
                        let firstIndex = comparedValues.indexOf(firstValueToRemove[z])
                        let secondIndex = comparedValues.indexOf(secondValueToRemove[z])
                        if (firstIndex != -1) {
                            comparedValues.splice(firstIndex, 1)
                            removalArray[i].possibleNumbers = comparedValues;
                        } else if (secondIndex != -1) {
                            comparedValues.splice(secondIndex, 1)
                            removalArray[i].possibleNumbers = comparedValues;
                        }
                        if (removalArray[i].possibleNumbers.length == 1) {
                            removalArray[i].textContent = removalArray[i].possibleNumbers.shift();
                        }
                    }
                }
            }
        }
    }
}

function checkforUniques() {
    // Checks for any unique values in possible numbers in all squares, rows and columns
    for (a = 1; a < 10; a++) {
        for (i = 1; i < 10; i++) {
            let checkedSquare = Array.from(document.getElementsByClassName('s' + i));
            let checkedRow = Array.from(document.getElementsByClassName('r' + i));
            let checkedCol = Array.from(document.getElementsByClassName('c' + i));

            let squarePossibleNumbers = checkedSquare.map(x => x.possibleNumbers)
            let squareIncludesA = squarePossibleNumbers.map(x => x.includes(a));
            if (squareIncludesA.includes(true)) {
                let trueIndex = squareIncludesA.indexOf(true)
                squareIncludesA.splice(trueIndex, 1);
                if (!squareIncludesA.includes(true)) {
                    let itemClasses = Array.from(checkedSquare[trueIndex].classList);
                    let itemExistsCheck = false;
                    for (z = 0; z < cells.length; z++) {
                        if ((cells[z].classList.contains(itemClasses[1]) ||
                            cells[z].classList.contains(itemClasses[2]) ||
                            cells[z].classList.contains(itemClasses[3])) &&
                            cells[z].textContent == a) {
                            itemExistsCheck = true;
                        }
                    }
                    if (!itemExistsCheck) {
                        checkedSquare[trueIndex].textContent = a;
                        checkedSquare[trueIndex].possibleNumbers = [];
                    }
                }
            }
            let rowPossibleNumbers = checkedRow.map(x => x.possibleNumbers)
            let rowIncludesA = rowPossibleNumbers.map(x => x.includes(a));
            if (rowIncludesA.includes(true)) {
                let trueIndex = rowIncludesA.indexOf(true)
                rowIncludesA.splice(trueIndex, 1);
                if (!rowIncludesA.includes(true)) {
                    let itemClasses = Array.from(checkedRow[trueIndex].classList);
                    let itemExistsCheck = false;
                    for (z = 0; z < cells.length; z++) {
                        if ((cells[z].classList.contains(itemClasses[1]) ||
                            cells[z].classList.contains(itemClasses[2]) ||
                            cells[z].classList.contains(itemClasses[3])) &&
                            cells[z].textContent == a) {
                            itemExistsCheck = true;
                        }
                    }
                    if (!itemExistsCheck) {
                        checkedRow[trueIndex].textContent = a;
                        checkedRow[trueIndex].possibleNumbers = [];
                    }
                }
            }
            let colPossibleNumbers = checkedCol.map(x => x.possibleNumbers)
            let colIncludesA = colPossibleNumbers.map(x => x.includes(a));
            if (colIncludesA.includes(true)) {
                let trueIndex = colIncludesA.indexOf(true)
                colIncludesA.splice(trueIndex, 1);
                if (!colIncludesA.includes(true)) {
                    let itemClasses = Array.from(checkedCol[trueIndex].classList);
                    let itemExistsCheck = false;
                    for (z = 0; z < cells.length; z++) {
                        if ((cells[z].classList.contains(itemClasses[1]) ||
                            cells[z].classList.contains(itemClasses[2]) ||
                            cells[z].classList.contains(itemClasses[3])) &&
                            cells[z].textContent == a) {
                            itemExistsCheck = true;
                        }
                    }
                    if (!itemExistsCheck) {
                        checkedCol[trueIndex].textContent = a;
                        checkedCol[trueIndex].possibleNumbers = [];
                    }
                }
            }
        }
    }
}

function crossOutLines() {
    // Check for objects in a line here! (WIP)

    for (a = 1; a < 10; a++) {
        for (i = 0; i < squares.length; i++) {
            let newArray = Array.from(squares[i].children);
            let arrayOfValues = [];
            newArray.forEach(element => {
                if (element.possibleNumbers.includes(a)) {
                    arrayOfValues.push(element.classList)
                }
            });
            if (arrayOfValues.every(arrayItem => arrayItem[1] === arrayOfValues[0][1]) &&
                arrayOfValues.length > 1 && arrayOfValues[0]) {
                let removalRow = Array.from(document.getElementsByClassName(arrayOfValues[0][1]))
                removalRow.forEach(item => {
                    if (item.possibleNumbers.includes(a) && item.classList[3] != arrayOfValues[0][3]) {
                        item.possibleNumbers.splice(item.possibleNumbers.indexOf(a), 1)
                    }

                });
            } else if (arrayOfValues.every(arrayItem => arrayItem[2] === arrayOfValues[0][2]) &&
                arrayOfValues.length > 1 && arrayOfValues[0]) {
                let removalCol = Array.from(document.getElementsByClassName(arrayOfValues[0][2]))
                removalCol.forEach(item => {
                    if (item.possibleNumbers.includes(a) && item.classList[3] != arrayOfValues[0][3]) {
                        item.possibleNumbers.splice(item.possibleNumbers.indexOf(a), 1)
                    }

                });
            }
        }
    }


}

function solveSudoku() {
    let before;
    let after;
    do {
        before = Array.from(cells).flatMap(x => x.possibleNumbers).length
        iterateSudoku();
        after = Array.from(cells).flatMap(x => x.possibleNumbers).length
    } while (before != after && after != 0)

    if (after != 0) {
        console.log('You beat me! I cant solve this Sudoku')
    }
}