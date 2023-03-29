const emptyCell = '';
let word = [];

function crosswordPuzzle() {
  let gridSize = new createGrid();
  function updateGrid(word) {
    let updated = false;
    if (canBePlaced(word)) {
      addWord(word);
      updated = true
    }
    return updated;
  }
  function addWord(word) {
    row = word.row; column = word.column;
    if (word.vertical) {
      for (let j = 0; j < word.text.length; j++) {
        gridSize.grid[row][column].value = word.text[j];
        row++;
      }
    } else {
      for (let j = 0; j < word.text.length; j++) {
        gridSize.grid[row][column].value = word.text[j];
        column++;
      }
    }
  }
  function canBePlaced(word) {
    let canBePlaced = true;
    if (isValidPosition(word.row, word.column) && fitsOnGrid(word)) {
      let index = 0;
      while (index < word.text.length) {
        let currentRow = word.vertical ? word.row + index : word.row;
        let currentColumn = !word.vertical ? word.column + index : word.column;
        if ((word.text[index] === gridSize.grid[currentRow][currentColumn].value ||
          emptyCell === gridSize.grid[currentRow][currentColumn].value) && placementLegal(currentRow, currentColumn, word)) {
          //can place word
        }
        else {
          canBePlaced = false;
        }
        index++;
      }
    } else {
      canBePlaced = false;
    }
    return canBePlaced;
  }

  //checks to see if this is a valid positon.
  let isValidPosition = function (row, column) {
    return row >= 0 && row < gridRowCnt && column >= 0 && column < gridColumnCnt;
  } //returns a boolean expression to confirm if true or false
  // code below checks if there is a letter in the specified row & column. returns a boolean
  function isLetter(row, column) {
    return gridSize.grid[row][column].value !== emptyCell
  }
  //checks if cell is empty
  function isEmptyCell(row, column) {
    return !isLetter(row, column);
  }

  //checks to see if there is interference for a set of row/column positions
  function isInterference(row, column, nextRow, nextColumn) {
    return isValidPosition(row, column) &&
      isValidPosition(nextRow, nextColumn) &&
      isLetter(row, column) &&
      isLetter(nextRow, nextColumn);
  }

  //determines if a character exists at a certain position
  function doesCharExist(row, column) {
    return isValidPosition(row, column) &&
      isLetter(row, column);
  }
  //checks to see if the word fits on the grid
  function fitsOnGrid(word) {
    if (word.vertical) {
      return word.row + word.text.length <= gridRowCnt
    }
    else {
      return word.column + word.text.length <= gridColumnCnt
    }
  }
  //determines if a placing a char at a particular row/column would be overwriting a vertical word
  function overwritingVerticalWord(row, column) {
    let rowAbove = row - 1;
    return (isValidPosition(rowAbove, column) && isLetter(row, column) && isLetter(rowAbove, column));
  }
  //determines if a placing a char at a particular row/column would be overwriting a horizontal word
  function overwritingHorizontalWord(row, column) {
    let leftColumn = column - 1;
    return (isValidPosition(row, leftColumn) && isLetter(row, column) && isLetter(row, leftColumn));
  }
  //determines if a particular row/position corresponds to end of word
  function endOfWord(row, column, word) {
    if (word.vertical) {
      return gridSize.grid[row - 1][column].value === word.text[word.text.length - 1];
    } else {
      return gridSize.grid[row][column - 1].value === word.text[word.text.length - 1];
    }
  }
  //determines if a word will invade another word's territory ata certain position
  function invadingTerritory(row, column, word) {
    let invading = true;
    let empty = isEmptyCell(row, column)
    if (word.vertical) {
      let weHaveNeighbours = (doesCharExist(row, column - 1) || doesCharExist(row, column + 1)) || endOfWord(row, column, word) && doesCharExist(row + 1, column);
      invading = empty && weHaveNeighbours;
    } else {
      let weHaveNeighbours = (doesCharExist(row - 1, column) || doesCharExist(row + 1, column)) || endOfWord(row, column, word) && doesCharExist(row, column + 1);
      invading = empty && weHaveNeighbours;
    }
    return invading;
  }
  function placementLegal(row, column, word) {
    let illegal = false;
    if (word.vertical) {
      illegal = isInterference(row, column + 1, row + 1, column) || isInterference(row, column - 1, row + 1, column) || overwritingVerticalWord(row, column) || invadingTerritory(row, column, word);
    } else {
      illegal = isInterference(row + 1, column, row, column + 1) || isInterference(row - 1, column, row, column + 1) || overwritingHorizontalWord(row, column) || invadingTerritory(row, column, word);
    }
    return !illegal;
  }
  function getIntersections() {
    let intersections = 0;
    for (let row = 0; row < gridRowCnt; row++) {
      for (let column = 0; column < gridColumnCnt; column++) {
        if (isLetter(row, column)) {
          if (isValidPosition(row - 1, column) &&
            isValidPosition(row + 1, column) &&
            isValidPosition(row, column - 1) &&
            isValidPosition(row, column + 1) &&
            isLetter(row - 1, column) &&
            isLetter(row + 1, column) &&
             isLetter(row, column - 1) &&
            isLetter(row, column + 1)) {
            ++intersections;
          }
        }
      }
    }
    return intersections;
  }
  return {
    "update": updateGrid,
    "isLetter":isLetter,
    "getIntersections": getIntersections,
  };
}
