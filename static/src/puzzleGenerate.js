const attemptsToFitWords = 3500;
const gridsToMake = 15;

let generatedGrids = [];
let goodStartigLetters = new Set();
let usedWords = [];
let bestGrid;
let gridAns = [];


function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomWordofSize(wordList, wordSize) {
    let properLengthWords = wordList.filter(val => val.length >= wordSize);
    return properLengthWords[randomInt(properLengthWords.length)]
}
function getUnusedWords() {
    return Dict;
}
function getRandomWord() {
    let words = getUnusedWords();
    let new_Word = new Word(words[randomInt(words.length)], 1, 1);
    let new_word = new_Word.usedWord;
    return new_word;
}
function neWord() {
    return new Word(getRandomWordofSize(getUnusedWords(), 5), 1, 1)
}

let createCrosswordPuzzle = () => {
    function pushUsedWords(word) {
        usedWords.push(word);
        word.split('').forEach(char => goodStartigLetters.add(char));
    }
    function isGoodWord(word) {
        let goodWord = false;
        for (let letter of goodStartigLetters) {
            if (letter == word.charAt(0)) {
                goodWord = true;
                break
            }
        }
        return goodWord;
    }
    function getAWordToTry() {
        let word = getRandomWord();
        let goodWord = isGoodWord(word);
        while (usedWords.includes(word) || !goodWord) {
            word = getRandomWord();
            goodWord = isGoodWord(word);
        }
        return word;
    }
    function getBestGrid(grids) {
        let bestGrid = grids[0];
        for (let grid of grids) {
            if (grid.getIntersections() >= bestGrid.getIntersections()) {
                bestGrid = grid;
            }
        }
        return bestGrid;
    }
    function attemptToPlaceWordOnGrid(puzzle, word) {
        let text = getAWordToTry();
        for (let row = 0; row < gridRowCnt; row++) {
            for (let column = 0; column < gridColumnCnt; column++) {
                word.text = text.split('');
                word.usedWord = text
                word.row = row;
                word.column = column;
                word.vertical = Math.random() >= 0.5;

                if (puzzle.isLetter(row, column)) {
                    if (puzzle.update(word)) {
                        puzzle.isWord(word);
                        pushUsedWords(word.usedWord);
                        return true;
                    }
                }
            }
        }
        return false;
    }
    function generateGrids() {
        generatedGrids = [];

        for (let gridsMade = 0; gridsMade < gridsToMake; gridsMade++) {
            let puzzle = new crosswordPuzzle();
            let word = neWord();
            puzzle.update(word);
            puzzle.isWord(word);
            pushUsedWords(word.usedWord);
            let continuousFails = 0;
            for (let attempts = 0; attempts < attemptsToFitWords; attempts++) {
                let placed = attemptToPlaceWordOnGrid(puzzle, word);
                if (placed) {
                    continuousFails = 0;
                } else {
                    continuousFails++;
                }
                if (continuousFails > 350) {
                    break;
                }
            }
            if (puzzle.getIntersections() >= 6) {
                break;
            }            
            if (usedWords.length > 3) {
                let gridAnswer = [];
                gridAnswer.push(usedWords);
                Object.assign(puzzle, gridAnswer);
                generatedGrids.push(puzzle);
            }
            usedWords = [];
            //debugger;
        }
    }
    function displayCrossword(bestGrid) {
        const arr = document.getElementsByClassName("cell");
        let count = 1;
        for (row = 0; row < gridRowCnt; row++) {
            for (column = 0; column < gridColumnCnt; column++) {
                arr[`${row}_${column}`].value = "";
                if (bestGrid.isLetter(row, column)) {
                    arr[`${row}_${column}`].style.backgroundColor = '#f5f5dc';
                    arr[`${row}_${column}`].disabled = false
                    arr[`${row}_${column}`].style.border = '1px dashed black';
                }
                else {
                    arr[`${row}_${column}`].value = "";
                    arr[`${row}_${column}`].style.backgroundColor = '#e9e9e9';
                    arr[`${row}_${column}`].style.border = '#e9e9e9';
                    arr[`${row}_${column}`].disabled = true
                }
            }
        }
        bestGrid[0].forEach(elem =>{
            let wordElem = elem;
            for (let i = 0; i < bestGrid.gridRowWord.length; i++) {
                if (bestGrid.gridRowWord[i].word === wordElem) {
                    row = bestGrid.gridRowWord[i].row;
                    column = bestGrid.gridRowWord[i].column;
                    arr[`${row}_${column}`].value = bestGrid.grid[row][column];
                    printNumber(bestGrid.gridRowWord[i].row, bestGrid.gridRowWord[i].numberColumn, bestGrid.gridRowWord[i].row);
                    break;
                } /*else {
                    continue;
                }*/
            }
            for (let i = 0; i < bestGrid.gridColumnWord.length; i++) {
                if (bestGrid.gridColumnWord[i].word === wordElem) {
                    row = bestGrid.gridColumnWord[i].row;
                    column = bestGrid.gridColumnWord[i].column;
                    arr[`${row}_${column}`].value = bestGrid.grid[row][column];
                    printNumber(bestGrid.gridColumnWord[i].numberRow, bestGrid.gridColumnWord[i].column);
                    break;                   
                }/* else {
                    continue;
                }*/
            }
            //debugger;
        })
        function printNumber(rowPass, columnPass) {
            let row = rowPass, column = columnPass;
            arr[`${row}_${column}`].value = count;
            bestGrid.grid[row][column] = count;
            return count++;
        }
    }
    function getAnswer(bestGrid) {
        const arr = document.getElementsByClassName("cell");
        for (let row = 0; row < gridRowCnt; row++) {
            for (let column = 0; column < gridColumnCnt; column++) {
                if (bestGrid.isLetter(row, column)) {
                    setInterval(takeInput(arr[`${row}_${column}`]), 500);
                     //setInterval(checkAnswer, 1500);
                }
                function checkAnswer() {
                    if (arr[`${row}_${column}`].value === bestGrid.grid[row][column]) {
                        arr[`${row}_${column}`].style.backgroundColor = "#00FFFF";
                    }
                }
            }
        }
    }


    generateGrids();
    bestGrid = getBestGrid(generatedGrids);
    displayCrossword(bestGrid);
    getAnswer(bestGrid);
    myAudio.src = "./static/sounds/congrats.mp3";
    checkGridbtn.addEventListener('click', (bestGrid) => {
        const arr = document.getElementsByClassName("cell");
        bestGrid = getBestGrid(generatedGrids);
        for (let row = 0; row < gridRowCnt; row++) {
            gridAns[row] = [];
            for (let column = 0; column < gridColumnCnt; column++) {
                gridAns[row][column] = arr[`${row}_${column}`].value;
                if (bestGrid.isLetter(row, column) && !arr[`${row}_${column}`].disabled) {
                    if (bestGrid.grid[row][column] === gridAns[row][column]) {
                        arr[`${row}_${column}`].style.backgroundColor = "#90EE90";
                        myAudio.play();
                    }
                }
            }
        }
    })
    return { "crossWord": bestGrid }
}
