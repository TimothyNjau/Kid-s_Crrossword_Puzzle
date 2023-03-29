const gridColumnCnt = 10, gridRowCnt = 10;
let row = 0, column = 0;
let slots = gridRowCnt * gridColumnCnt;
for (let slot = 0; slot < slots; slot++) {
  let inputBox = document.createElement("input");
  inputBox.maxLength = '1';
  inputBox.className = 'cell';
  inputBox.id = row + "_" + column;
  inputBox.type = 'text';
  gridCanvas.appendChild(inputBox);
  row++;
  if (row >= gridRowCnt) {
    row = 0;
    column++;
  }
}
for (let i = 0; i < 7; i++) {
  let puzzleImages = document.createElement("img");
  let label = document.createElement("label");
  let div = document.createElement("div");
  label.innerText = i + 1,
    label.id = "imageLabel";
  puzzleImages.className = "puzzleImg";
  let x = fruitArrImg[i];
  puzzleImages.src = x;
  div.style.display = "flex";
  div.style.alignItems = "center";
  div.appendChild(puzzleImages);
  div.appendChild(label);
  imageContainer.appendChild(div);
}

class createGrid {
  constructor(){
    //code below loads grid cells created above to an array: arr
  const arr = document.getElementsByClassName("cell");
  //create a 2D array: gridSize
  const gridSize = []
  for (row = 0; row < gridRowCnt; row++) {
    gridSize[row] = [];
    for (column = 0; column < gridColumnCnt; column++) {
      gridSize[row][column] = column
    }
  }
  //assign each cell to specific gridSize[row][column]
  for (let i = 0; i < gridRowCnt; i++) {
    for (let j = 0; j < gridColumnCnt; j++) {
      gridSize[i][j] = arr[`${i}_${j}`];
    }
  }
  this.grid = gridSize;
  }
}


