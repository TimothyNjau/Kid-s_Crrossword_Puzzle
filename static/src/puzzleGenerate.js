const attemptsToFitWords = 1000;
const gridsToMake = 10;

let generatedGrids = [];
let goodStartigLetters = new Set();
let usedWords = [];


function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomWordofSize(wordList, wordSize) {
    let properLengthWords = wordList.filter(val => val.length > wordSize);
    return properLengthWords[randomInt(properLengthWords.length)]
}
function getUnusedWords() {
    fruitDict = fruitDict.filter(val => !usedWords.includes(val));
    return fruitDict;
}
function getRandomWord() {
    let words = getUnusedWords();
    let new_Word = new Word(words[randomInt(words.length)],1,1);
    return new_Word;
}
function neWord() {
    return new Word(getRandomWordofSize(getUnusedWords(), 5), 1, 1)
}
function pushUsedWords(word) {
    usedWords.push(word.usedWord);
    console.log(usedWords);
    word.text.forEach(char => goodStartigLetters.add(char));
}
let createCrosswordPuzzle = () => {

   
    function isGoodWord(word) {
        let goodWord = false;
        for (let letter of goodStartigLetters) {
            if (letter == word.usedWord.charAt(0)) {
                goodWord = true;
                break
            }
        }
        return goodWord;
    }
    function getAWordToTry() {
        let word = getRandomWord();
        let goodWord = isGoodWord(word);
        while(usedWords.includes(word.usedWord) || !goodWord) {
            word = getRandomWord();
            goodWord = isGoodWord(word);
        }
        return word;
    }
    function attemptToPlaceWordOnGrid(puzzle, word) {
        let text = getAWordToTry();
        for (let row = 0; row < gridRowCnt; row++) {
            for (let column = 0; column < gridColumnCnt; column++) {
                word.text = text.text;
                word.usedWord = text
                word.row = row;
                word.column = column;
                word.vertical = Math.random() >= 0.5;

                if (puzzle.isLetter(row, column)) {
                    if (puzzle.update(word)) {
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
            let word = neWord();
            let puzzle = new crosswordPuzzle();
            puzzle.update(word);
            pushUsedWords(word);
            let continuousFails = 0;
            for (let attempts = 0; attempts < attemptsToFitWords; attempts++) {
                let placed = attemptToPlaceWordOnGrid(puzzle, word);
                if (placed) {
                    continuousFails = 0;
                } else {
                    continuousFails++;
                }
                if (continuousFails > 470) {
                    break;
                }
            }
            generatedGrids.push(puzzle);
           
            if (puzzle.getIntersections() >= 4) {
                break;
            }
          usedWords = [];
          //debugger;
        }
    }
    generateGrids();
    function getBestGrid(grids){
        let bestGrid = grids[0];
        for(let grid of grids){
            if(grid.getIntersections() >= bestGrid.getIntersections()){
                bestGrid = grid;
            }
        }
        console.log(bestGrid.getIntersections());
        return bestGrid;
    }
    getBestGrid(generatedGrids);
    
}

