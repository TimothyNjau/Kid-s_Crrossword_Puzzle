const gridCanvas = document.querySelector(".grid"),
  gridContainer = document.querySelector(".grid-container"),
  imageContainer = document.querySelector(".imageContainer"),
  openBtn = document.querySelector("#open"),
  startBtn = document.querySelector("#start"),
  gridComputedStyle = window.getComputedStyle(gridCanvas);


class Word {
  constructor(text, row, column) {
    let t = Math.floor(Math.random() * fruitDict.length);
    text = [];
    text = fruitDict[t].split("");
    let usedWord = fruitDict[t]
    let vertical = Math.random() >= 0.5;
    this.text = text;
    this.row = row;
    this.column = column;
    this.vertical = vertical;
    this.usedWord = usedWord;
  }
}

let fruitArrImg = [
  "./static/images/apple.jpg",
  "./static/images/Banana.png",
  "./static/images/guava.jpg",
  "./static/images/passion.jpg",
  "./static/images/pineapple.png",
  "./static/images/mango.jpg",
  "./static/images/orange.jpg"
]
let fruitDict = [
  'mango',
  'banana',
  'orange',
  'passion',
  'pineapple',
  'guava',
  'apple'
]
let otherFruitDict = [
  'berry',
  'kiwi',
  'watermelon',
  'pear',
  'peach'
]