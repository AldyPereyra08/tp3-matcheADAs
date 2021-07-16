/// SCORE //////////////////////////////////////////////////////////

let score = 0
let combo = 0
const valueScore = document.querySelector("#value-score")
const finalScore = document.querySelector("#scoring-final")
const valueCombo = document.querySelector("#value-combo")

const addScore = () => {
  const animalsEliminated = document.querySelectorAll(".delete-animal")
  let totalScore = 200 * animalsEliminated.length
  return score += totalScore
};

const addCombo = () => {
  return combo++
};
 
const updateValueScore = () => {
  valueScore.textContent = score
};

const updateValueCombo = () => {
  valueCombo.textContent = combo
};

const showFinalScore = () => {
  finalScore.textContent = score
};

const resetScore = () => {
  valueScore.textContent = 0
};

const resetCombo = () => {
  valueCombo.textContent = 0
};

/// TIMER ///////////////////////////////////////////////


let initialSeconds = 30
let timer = null

const timerStart = () => {
  let totalSeconds = initialSeconds;

  minutes = Math.floor(totalSeconds / 60);
  minutes = (minutes < 10 ? "0" : "") + minutes;

  totalSeconds %= 60;
  totalSeconds = (totalSeconds < 10 ? "0" : "") + totalSeconds;

  let timerSeconds = document.getElementById("timer")
  timerSeconds.innerHTML = minutes + ":" + totalSeconds;
  initialSeconds--;

  if (initialSeconds > -1) {
    timer = setTimeout(timerStart, 1000);
  }

  if (totalSeconds == 00) {
    showOverlay()
    showModalEndGame()
  }
    
};

const clearTimer = () => {
  clearTimeout(timer)
  initialSeconds = 30
};




//MODALES ///////////////////////////////////////////////
const overlay = document.querySelector(".overlay");

const modalWelcome = document.getElementById("modal-welcome");
const buttonLetsPlay = document.getElementById("button-play");

const modalNewPlay = document.getElementById("modal-new-play");
const buttonEasy = document.getElementById("button-easy");
const buttonNormal = document.getElementById("button-normal");
const buttonDifficult = document.getElementById("button-difficult");

const modalEndGame = document.getElementById("modal-end-game");
const buttonNewGame = document.getElementById("button-new-game");
const buttonResetFinishGame = document.getElementById("button-continue-finishgame");

const buttonInfo = document.getElementById("button-help");
const modalInfo = document.getElementById("modal-info");
const buttonContinuePlay = document.getElementById("button-play-info");
const buttonResetGame = document.getElementById("button-reset-game");

const modalResetGame = document.getElementById("modal-reset-game");
const buttonCancelResetGame = document.getElementById("button-cancel");
const buttonNewGameRebooted = document.getElementById("button-new-game-rebooted");

const showModalInfoGame = () => {
  modalInfo.classList.remove("hide")
};

const hideModalInfoGame = () => {
  modalInfo.classList.add("hide")
};

const hideOverlay = () => {
  overlay.classList.add("hide");
};

const showOverlay = () => {
  overlay.classList.remove("hide")
};

const hidemodalNewPlay = () => {
  modalNewPlay.classList.add("hide");
};

const showmodalNewPlay = () => {
  modalNewPlay.classList.remove("hide")
};

const hidemodalEndGame = () => {
  modalEndGame.classList.add("hide")
};

const showModalEndGame = () => {
  modalEndGame.classList.remove("hide")
  showFinalScore()
};

const hidemodalWelcome = () => {
  modalWelcome.classList.add("hide");
};

const showModalWelcome = () => {
  modalWelcome.classList.remove("hide");
};

const hidemodalResetGame = () => {
  modalResetGame.classList.add("hide")
};

const showModalResetGame = () => {
  modalResetGame.classList.remove("hide")
};

let difficulty = ''

buttonNewGame.onclick = () => {
  hidemodalEndGame()
  showmodalNewPlay()
  resetScore()
  resetCombo()
};

buttonResetFinishGame.onclick = () => {
  hidemodalEndGame()
  hideOverlay()
  resetGame(difficulty)
  resetScore()
  resetCombo()
};

buttonLetsPlay.onclick = () => {
  hidemodalWelcome()
  showmodalNewPlay()
};

buttonEasy.onclick = () => {
  difficulty = 7 
  hideOverlay()
  hidemodalNewPlay()
  checkIfItIsHiddenModalReset()
  cleanGrids()
  do {
    generateGrids(difficulty);
  } while (checkForHorizontalMatches() || checkForVerticalMatches())
    addGridToHtml(difficulty)
    resetScore()
    //updateValueScore()
    timerStart()
};

buttonNormal.onclick = () => {
  difficulty = 8
  hideOverlay()
  hidemodalNewPlay()
  checkIfItIsHiddenModalReset()
  cleanGrids()
  do {
    generateGrids(difficulty);
  } while (checkForHorizontalMatches() || checkForVerticalMatches())
  addGridToHtml(difficulty);
  updateClock()
  resetScore()
  //updateValueScore()
  timerStart()
};

buttonDifficult.onclick = () => {
  difficulty = 9
  hideOverlay()
  hidemodalNewPlay()
  checkIfItIsHiddenModalReset()
  cleanGrids()
  do {
    generateGrids(difficulty);
  } while (checkForHorizontalMatches() || checkForVerticalMatches())
  addGridToHtml(difficulty);
  updateClock()
  resetScore()
  //updateValueScore()
  timerStart()
};

buttonInfo.onclick = () => {
  showOverlay()
  showModalInfoGame()
};

buttonContinuePlay.onclick = () => {
  hideOverlay()
  hideModalInfoGame()
};
 buttonResetGame.onclick = () => {
  showOverlay()
  showModalResetGame()
};

buttonCancelResetGame.onclick = () => {
  hideOverlay()
  hidemodalResetGame()
};

buttonNewGameRebooted.onclick = () => {
  hideOverlay()
  hidemodalResetGame()
  resetGame(difficulty)
  resetScore()
  resetCombo()
};

const checkIfItIsHiddenModalReset = () => {
  if (modalResetGame.classList.contains("hide")) {

  }
  else {
    hidemodalResetGame()
  }
};

 
//GRID ///////////////////////////////////////////////

const gridHtml = document.querySelector(".grid");

const animals = ["🐬", "🐭", "🐮", "🐯", "🐰", "🐱"];

let grid = [];

const getRandomAnimals = (animals) => {
  return animals[Math.floor(Math.random() * animals.length)];
};

const generateGrids = (difficulty) => {
  grid = [];
  for (let i = 0; i < difficulty; i++) {
    grid[i] = [];
    for (let j = 0; j < difficulty; j++) {
      grid[i][j] = getRandomAnimals(animals);
    }
  }
  return grid;
};

let size = ""

const generateSquare = (x, y, array, difficulty) => {
  size = 474 / difficulty;

  const square = document.createElement("div");
  square.dataset.x = x;
  square.dataset.y = y;
  square.classList.add("animal")
  square.innerHTML = `<div style="font-size: ${
    size - 15
  }px;"> ${array[x][y]} </div>`;
  square.addEventListener('click', selectAnimals)
  square.style.top = `${x * size}px`;
  square.style.left = `${y * size}px`;
  square.style.width = `${size}px`;
  square.style.height = `${size}px`;
  return square;
};

const addGridToHtml = (difficulty) => {
  gridHtml.style.width = `474px`;
  gridHtml.style.height = `474px`;
  const listOfAnimals = grid;
  for (let i = 0; i < listOfAnimals.length; i++) {
    for (let j = 0; j < listOfAnimals[i].length; j++) {
      gridHtml.appendChild(generateSquare(i, j, listOfAnimals, difficulty));
    }
  }
};

const cleanGrids = () => {
  grid = []
  gridHtml.innerHTML = ''
};

const resetGame = (difficulty) => {
  cleanGrids()
  clearTimer()
  do {
    generateGrids(difficulty);
  } while (checkForHorizontalMatches() || checkForVerticalMatches())
  addGridToHtml(difficulty);
  timerStart()
};


/// ENCONTRAR MATCHES //////////////////////////////////////////////////////////

const checkForHorizontalMatches = () => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
       if (grid[i][j] === grid[i][j + 1] && grid[i][j + 1] === grid[i][j + 2]) {
       return true
      }        
    } 
  }
  return false
};

const checkForVerticalMatches = () => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
       if (grid[i + 1] && grid[i + 2] && grid[i][j] === grid[i + 1][j] && grid[i + 1][j] === grid[i + 2][j]) {
        return true
      }         
    } 
  }
  return false
};

const findMatches = () => {
  findMatchHorizontal()
  findMatchVertical()
  addScore()
  addCombo()
  updateValueScore()
  updateValueCombo()
};

const findMatchHorizontal = () => {
  let matchesHorizontales = []
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
       if (grid[i][j] === grid[i][j + 1] && grid[i][j + 1] === grid[i][j + 2]) {
        matchesHorizontales.push([i, j]);
        matchesHorizontales.push([i, j + 1]);
        matchesHorizontales.push([i, j + 2]);
      }        
    } 
  }
  generateNewAnimals(matchesHorizontales)
};

const findMatchVertical = () => {
  let matchesVerticales = []
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
       if (grid[i + 1] && grid[i + 2] && grid[i][j] === grid[i + 1][j] && grid[i + 1][j] === grid[i + 2][j]) {
        matchesVerticales.push([i, j]);
        matchesVerticales.push([i + 1, j]);
        matchesVerticales.push([i + 2, j]);
      }         
    } 
  }
  generateNewAnimals(matchesVerticales)
};

const generateNewAnimals = (arrayMatches) => {
  for (let i = 0; i < arrayMatches.length; i++) {
    let x = arrayMatches[i][0];
    let y = arrayMatches[i][1];
    addNewAnimalToJs(grid, x, y)
    let match = obteinSquare(x,y)
		match.classList.add('delete-animal');

    addToHtml(match,x,y)
  } 
};

const addNewAnimalToJs = (array, x, y) => {
  for (let i = 0; i < array.length; i++) {
  grid[x][y] = getRandomAnimals(animals)
  }
  return grid[x][y]
};
  

const obteinSquare = (x,y) => {
  return document.querySelector(
    `div[data-x='${[x]}'][data-y='${[y]}']`,
  );
};

const addToHtml = (match,x,y) => {
  setTimeout(() => {
    match.innerHTML = `<div style="font-size: ${size - 15}px;"> ${grid[x][y]} </div>`;
    match.classList.remove('delete-animal');
    if (thereAreMatch()) {
      findMatches();
    }
  }, 700);
};

/// SELECCIONAR ITEMS //////////////////////////////////////////////////////////

const selectAnimals = (e) => {
  let animal1 = document.querySelector(".selected")
  if (animal1 != null) {
    let click = e.target
    let animal2 = click.parentNode
    if (theyAreAdjacent(animal1, animal2)) {
      swapAnimals(animal1, animal2)
      if (thereAreMatch()) {
        findMatches()
      } 
      else {
        setTimeout(() => swapAnimals(animal1, animal2), 400)               
      }
    } 
    else {
      animal1.classList.remove("selected")
    }
  } 
  else {
    let click = e.target
    let animal1 = click.parentNode
    animal1.classList.add("selected")
  }
};

const thereAreMatch = () => {
  if (checkForHorizontalMatches()|| checkForVerticalMatches()) {
    return true
  }
  return false
};

/// SON ADYACENTES //////////////////////////////////////////////////////////

const theyAreAdjacent = (animal1, animal2) => {
  const datax1 = Number(animal1.dataset.x)
  const datax2 = Number(animal2.dataset.x)
  const datay1 = Number(animal1.dataset.y)
  const datay2 = Number(animal2.dataset.y) 

  if ((datax1 === datax2 && datay1 === datay2 + 1)
    || (datax1 === datax2 && datay1 === datay2 - 1)
    || (datay1 === datay2 && datax1 === datax2 + 1)
    || (datay1 === datay2 && datax1 === datax2 - 1)) {
    return true
  }
  else {
    return false
  }
};

/// INTERCAMBIAR ANIMALES //////////////////////////////////////////////////////////

const swapAnimals = (animal1, animal2) => {
 
  const datax1 = Number(animal1.dataset.x)
  const datay1 = Number(animal1.dataset.y)
  const datax2 = Number(animal2.dataset.x)
  const datay2 = Number(animal2.dataset.y)

  //MODIFICAR grid EN JS!
  let modifyJs = grid[datax1][datay1]
    grid[datax1][datay1] = grid[datax2][datay2]
    grid[datax2][datay2] = modifyJs

  //MODIFICAR grid EN HTML!
  if (datax1 === datax2 && (datay1 === datay2 + 1 || datay1 === datay2 - 1)) {
    animal1.style.left = `${datay2 * size}px`
    animal2.style.left = `${datay1 * size}px`
    animal1.dataset.y = datay2
    animal2.dataset.y = datay1
  }
  else if (datay1 === datay2 && (datax1 === datax2 + 1 || datax1 === datax2 - 1)) {
    animal1.dataset.x = datax2;
    animal2.dataset.x = datax1;
    animal1.style.top = `${datax2 * size}px`
    animal2.style.top = `${datax1 * size}px`
  }
};




