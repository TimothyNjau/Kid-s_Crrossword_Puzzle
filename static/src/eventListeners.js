openBtn.addEventListener("click", () => {
    console.log("It works");
  });
startBtn.addEventListener("click", ()=>{
  createCrosswordPuzzle();
})
/*
function isGoodWord(tryWord,placedWord){
  tryWord = tryWord.split('');
  placedWord = placedWord.split('');
  tryWord.forEach((letter)=>{
    placedWord.forEach((text)=>{
      if(letter == text){
        let textString = "This letter " + letter + " is present";
        console.log(textString);
      }
    })
  })
}*/
