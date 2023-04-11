let
  body = document.querySelector("body"),
  mainContainer = document.querySelector(".main-container"),
  gridCanvas = document.querySelector(".grid"),
  gridContainer = document.querySelector(".grid-container"),
  imageContainer = document.querySelector(".imageContainer"),
  listBtn = document.querySelectorAll("li"),
  openBtn = document.querySelector("#open"),
  startBtn = document.querySelector("#start"),
  soundBtn = document.querySelector("#sound"),
  checkGridbtn = document.querySelector("#checkGrid"),
  fruitBtn = document.querySelector("#fruit"),
  wild_AnimalBtn = document.querySelector("#wild_Animals"),
  domestic_AnimalBtn = document.querySelector("#domestic_Animals"),
  myAudio = document.createElement("audio"),
  sportBtn = document.querySelector("#sports"),
  myLabel = document.querySelector(".label"),
  textFlag = false, audioFlag = true;

let Dict = [],
    textObject = {};

class Word {
  constructor(text, row, column) {
    let usedWord = text;
    let vertical = Math.random() >= 0.5;
    this.text = text.split('');
    this.row = row;
    this.column = column;
    this.vertical = vertical;
    this.usedWord = usedWord;
  }
}

let fruitObject = {
  "mango": './static/images/fruits/mango.jpg',
  "banana": "./static/images/fruits/Banana.png",
  "orange": "./static/images/fruits/orange.jpg",
  "passion": "./static/images/fruits/passion.jpg",
  "pineapple": "./static/images/fruits/pineapple.png",
  "guava": "./static/images/fruits/guava.jpg",
  "apple": "./static/images/fruits/apple.jpg",
  "watermelon": "./static/images/fruits/watermelon.jpg",
  "pear": "./static/images/fruits/pear.jpg",
  "peach": "./static/images/fruits/peach.jpg",
  "berry": "./static/images/fruits/berry.jpg"
}
let wildAnimalObject = {
  "elephant": "./static/images/wild_animals/elephant.jpg",
  "lion": "./static/images/wild_animals/lion.jpg",
  "cheetah": "./static/images/wild_animals/cheetah.jpg",
  "ostrich": "./static/images/wild_animals/ostrich.jpg",
  "buffalo": "./static/images/wild_animals/buffalo.jpg",
  "rhinoceros": "./static/images/wild_animals/rhinoceros.jpg",
  "giraffe": "./static/images/wild_animals/giraffe.jpg",
  "crocodile": "./static/images/wild_animals/crocodile.jpg",
  "zebra": "./static/images/wild_animals/zebra.jpg",
  "monkey": "./static/images/wild_animals/monkey.jpg",
  "bear": "./static/images/wild_animals/bear.jpg",
  "hyena": "./static/images/wild_animals/hyena.jpg",
  "kangaroo": "./static/images/wild_animals/kangaroo.jpg",
  "koala": "./static/images/wild_animals/koala.jpg",
}
let domesticAnimalObject = {
  "cat": "./static/images/domestic_animals/cat.jpg",
  "cow": "./static/images/domestic_animals/cow.jpg",
  "bull": "./static/images/domestic_animals/bull.jpg",
  "chicken": "./static/images/domestic_animals/rooster.jpg",
  "duck": "./static/images/domestic_animals/duck.jpg",
  "goat": "./static/images/domestic_animals/goat.jpg",
  "sheep": "./static/images/domestic_animals/sheep.jpg",
  "dog": "./static/images/domestic_animals/dog.jpg",
  "camel": "./static/images/domestic_animals/camel.jpg",
  "pig": "./static/images/domestic_animals/pig.jpg",
  "donkey": "./static/images/domestic_animals/donkey.jpg",
  "horse": "./static/images/domestic_animals/horse.jpg",
  "turkey": "./static/images/domestic_animals/turkey.jpg",
  "goose": "./static/images/domestic_animals/goose.jpg",
}
let sportsObject = {
  "hockey": './static/images/sports/hockey.jpg ',
  "karate": './static/images/sports/karate.jpg',
  "tennis": './static/images/sports/tennis.jpg',
  "football": './static/images/sports/football.jpg',
  "rugby": './static/images/sports/rugby.jpg',
  "netball": './static/images/sports/netball.png',
  "archery": './static/images/sports/archery.jpg ',
  "cricket": './static/images/sports/cricket.jpg ',
  "golf": './static/images/sports/golf.jpg',
  "boxing": './static/images/sports/boxing.jpg',
  "wrestling": './static/images/sports/wrestling.png ',
  "handball": './static/images/sports/handball.jpg',
  "paintball": './static/images/sports/paintball.jpg ',
  "chess": './static/images/sports/chess.jpg',
  "baseball": './static/images/sports/baseball.jpg',
  "basketball": './static/images/sports/basketball.jpg',
  "fencing": './static/images/sports/fencing.jpg',
  "surfing": './static/images/sports/surfing.jpg ',
  "bowling": './static/images/sports/bowling.jpg',
}