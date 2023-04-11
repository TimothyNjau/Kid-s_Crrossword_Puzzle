let gridAnswers, k


startBtn.addEventListener("click", () => {
  try {
    gridAnswers = createCrosswordPuzzle().crossWord[0];
  loadImages(k);
  myLabel.innerText = "Click on 'Generate' to create a new puzzle. Solve the puzzle below"
  } catch (error) {
    myLabel.innerText = "Error in submitting answers to  create puzzle. Please try again"
  }  
})
soundBtn.addEventListener("click", () => {
  let soundImg = document.querySelector("#soundImg");
  if(audioFlag){
    myAudio.muted = audioFlag;
    soundImg.src = "./static/images/icons/mute_sound.png"
    audioFlag = !audioFlag;
  } else {
    myAudio.muted = audioFlag;
    soundImg.src = "./static/images/icons/sound.png"
    audioFlag = !audioFlag;
  }
})

let takeInput = (element) => {
  element.addEventListener('input', () => {
    console.log(element.value);
    return element.value;
  })
}
function loadImages(dictObject) {
  imageContainer.innerHTML = "";
  imageContainer.style.alignContent = "space-around";
  gridAnswers.forEach(val => {
    for (let elem in dictObject) {
      if (val == elem) {
        let url = dictObject[elem];
        let number = gridAnswers.indexOf(elem) + 1;
        let div = document.createElement("div");
        let label = document.createElement("label");
        label.innerText = number;
        label.id = "imageLabel";
        div.style.display = "flex";
        div.style.alignItems = "center";

        div.appendChild(label);
        if (textFlag) {
          let myText = document.createElement("text");
          myText.id = "myText";
          myText.innerHTML = url;
          myText.style.textTransform = "uppercase";
          div.appendChild(myText);
        }
        if (!textFlag) {
          let puzzleImages = document.createElement("img");
          puzzleImages.className = "puzzleImg";
          puzzleImages.src = url;
          div.appendChild(puzzleImages);
        }
        imageContainer.appendChild(div);
        mainContainer.style.backdropFilter = "blur(10px)";
        imageContainer.style.backgroundColor = "white";
      }
    }
  })
}
fruitBtn.addEventListener("click", () => {
  startUp();
  loadDataSets(fruitObject);
  k = fruitObject;
  body.style.backgroundImage = "url('./static/images/fruits/fruit-One.jpg')";
})
wild_AnimalBtn.addEventListener("click", () => {
  startUp();
  loadDataSets(wildAnimalObject);
  k = wildAnimalObject;
  body.style.backgroundImage = "url('./static/images/wild_animals/wild_animal_one.jpg')";
})
domestic_AnimalBtn.addEventListener("click", () => {
  startUp();
  loadDataSets(domesticAnimalObject);
  k = domesticAnimalObject;
  body.style.backgroundImage = "url('./static/images/domestic_animals/farm.jpg')"
})
sportBtn.addEventListener("click", () => {
  startUp();
  loadDataSets(sportsObject);
  k = sportsObject;
  body.style.backgroundImage = "url('./static/images/sports/sports-two.jpg')";
  body.style.backgroundSize = "cover";
  body.style.backgroundRepeat = "no-repeat";
})

function loadDataSets(dictObject) {
  Dict = [];
  for (let element in dictObject) {
    Dict.push(element);
  }
}
function startUp() {
  gridCanvas.style.visibility = "visible";
  imageContainer.innerHTML = "";
  imageContainer.style.backgroundColor = "";
  mainContainer.style.backdropFilter = "blur(0px)";
  if (textFlag) {
    textFlag = false;
  }
  myLabel.innerText = "Click on 'Generate' to create a new puzzle or 'Custom' to create your own"
  reload();
}
function reload() {
 gridCanvas.childNodes.forEach(elem => {
  elem.value = "";
  elem.style.border = "none";
  elem.style.backgroundColor = 'white'
 })  
}

openBtn.addEventListener("click", () => {
  imageContainer.style.backgroundColor = "rgba(255,250,250,0)";
  mainContainer.style.backdropFilter = "blur(10px)";
  imageContainer.innerHTML = "";
  imageContainer.style.width = "600px";
  imageContainer.style.alignContent = "flex-start";
  gridCanvas.style.visibility = "hidden";
  Dict = [];
  textFlag = true;
  myLabel.innerText = "Enter the clues and answers to your custom puzzle. Click 'Submit' when you are finished"
  addInpBtn = document.createElement("input"),
    removeInpbtn = document.createElement("input"),
    submitBtn = document.createElement("input");

  addInpBtn.value = "Add", addInpBtn.id = "addInp", addInpBtn.type = "button";
  removeInpbtn.value = "Remove", removeInpbtn.id = "removeInp", removeInpbtn.type = "button";
  submitBtn.value = "Submit", submitBtn.type = "submit", submitBtn.id = "submitInp";

  loadTextInput();

});
function loadTextInput() {
  let inpCont = document.createElement("div"),
    gridCont = document.createElement("div"),
    inpDiv = document.createElement("div");
  inpAns = document.createElement("input");
  inpClue = document.createElement("input");

  inpAns.type = "text", inpClue.type = "text";
  inpAns.maxLength = "15", inpClue.maxLength = "50";
  inpAns.placeholder = "answer", inpClue.placeholder = "clue";
  inpAns.id = "inpAns", inpClue.id = "inpClue";

  inpDiv.id = "inpDiv", gridCont.className = "gridCont", inpCont.id = "inpCont";

  inpDiv.appendChild(inpAns), inpDiv.appendChild(inpClue);
  gridCont.appendChild(inpDiv), gridCont.appendChild(addInpBtn), gridCont.appendChild(removeInpbtn);
  inpCont.appendChild(gridCont), inpCont.appendChild(submitBtn);

  imageContainer.appendChild(inpCont);

  addInpBtn.addEventListener("click", () => {
    let cloneDiv = inpDiv.cloneNode(true);

    cloneDiv.childNodes.forEach(elem => { elem.value = ""; })
    document.querySelector(".gridCont").appendChild(cloneDiv);
  });
  removeInpbtn.addEventListener("click", () => {
    let gridCont = document.querySelector(".gridCont");
    if (gridCont.lastChild.id == "removeInp") {

    } else {
      gridCont.removeChild(gridCont.lastChild);
    }
  });
  submitBtn.addEventListener("click", () => {
    let myAnswers = document.querySelectorAll("#inpAns"),
      myClues = document.querySelectorAll("#inpClue");

    for (let x = 0; x < myAnswers.length; x++) {
      if (myAnswers[x].value && myClues[x].value) {
        let fVal = myAnswers[x].value,
          sVal = myClues[x].value;

        textObject[`${fVal}`] = sVal;

        loadDataSets(textObject);
        k = textObject;
        reload();
        gridCanvas.style.visibility = "visible";        
        myLabel.innerText = "Submission is succesful! Click 'Generate' to create a new puzzle"
      } else if (!myAnswers[x].value || !myClues[x].value) {
        myLabel.innerText = "Submission is unsuccesful! Kindly fill in all answers and clues. Please try again"
      }
    }
  }
  );
}