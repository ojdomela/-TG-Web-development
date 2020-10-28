let cells = document.getElementsByClassName('sudokuCell');
let squares = document.getElementsByClassName('sudokuSquare');

for (i = 0; i < cells.length; i++) {
    if (cells[i].textContent == '') {
        cells[i].possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    } else {
        cells[i].possibleNumbers = [];
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
    console.log(item.possibleNumbers)
}

function iterateSudoku() {
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
                    cells[i].textContent = cells[i].possibleNumbers[0];
                }
            }
        }
    }


    let firstValueToRemove;
    let secondValueToRemove;
    let firstClassList;
    let secondClassList;

    for (a = 0; a < squares.length; a++) {
        for (i = 0; i < squares.length; i++) {
            if (squares[a].children[i].possibleNumbers.length == 2) {
                let firstNumbers = squares[a].children[i].possibleNumbers
                let itemArray = Array.from(squares[a].children);
                let otherItems = itemArray.slice(0, i).concat(itemArray.slice(i + 1));
                for (z = 0; z < otherItems.length; z++) {
                    let comparedNumbers = Array.from(otherItems[z].possibleNumbers)
                    if (firstNumbers[0] == comparedNumbers[0] &&
                        firstNumbers[1] == comparedNumbers[1] &&
                        firstNumbers.length == comparedNumbers.length) {
                        firstValueToRemove = firstNumbers[0]
                        secondValueToRemove = firstNumbers[1]
                        firstClassList = Array.from(squares[a].children[i].classList);
                        secondClassList = Array.from(otherItems[z].classList);
                    }
                }
            }
        }
    }
    for (a = 1; a < 4; a++) {
        if (firstClassList[a] == secondClassList[a]) {
            let removalArray = Array.from(document.getElementsByClassName(firstClassList[a]))
            for (i = 0; i < removalArray.length; i++) {
                let comparedValues = Array.from(removalArray[i].possibleNumbers)
                if (!(comparedValues.length == 2 &&
                    comparedValues[0] == firstValueToRemove &&
                    comparedValues[1] == secondValueToRemove) &&
                    (comparedValues.includes(firstValueToRemove) ||
                        comparedValues.includes(secondValueToRemove))) {
                    let firstIndex = comparedValues.indexOf(firstValueToRemove)
                    let secondIndex = comparedValues.indexOf(secondValueToRemove)
                    if (firstIndex != -1) {
                        comparedValues.splice(firstIndex, 1)
                        removalArray[i].possibleNumbers = comparedValues;
                    } else if (secondIndex != -1) {
                        comparedValues.splice(secondIndex, 1)
                        removalArray[i].possibleNumbers = comparedValues;
                    }
                    if (removalArray[i].possibleNumbers.length == 1) {
                        removalArray[i].textContent = removalArray[i].possibleNumbers[0];
                    }
                }
            }
        }
    }
}
