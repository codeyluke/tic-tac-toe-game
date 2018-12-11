const squares = document.querySelectorAll(".square");
const result = document.querySelector("#result");
const toggleBtn = document.querySelector(".btn-secondary");
const player1 = `<i class="fas fa-times"></i>`;
const player2 = `<i class="far fa-circle"></i>`;
const comp = `<i class="fas fa-desktop"></i>`;

//Initialiser
let currentTurn = true;
let movesMade = 0;
let player1Data = [];
let player2Data = [];
let compAI = false;
let comData = [];
let winner = false;
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

/*Restart the game*/
function restart() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].classList.remove("disabled", "taken");
    squares[i].innerHTML = "";
    result.innerHTML = `<h5>Who will win?</h5>`;
  }
  movesMade = 0;
  currentTurn = true;
  winner = false;
  player1Data = [];
  player2Data = [];
  comData = [];
}

/*Choosing the player or AI*/
function chooseOppo() {
  if (!compAI) {
    compAI = true;
    toggleBtn.innerHTML = `Play with People`;
    console.log(compAI);
  } else {
    compAI = false;
    toggleBtn.innerHTML = `Play with AI`;
    console.log(compAI);
  }
  restart();
}

/*Players or AI Functions*/
function firstPlayer(e, square) {
  e.target.innerHTML = player1;
  currentTurn = false;
  movesMade++;
  //this is to prevent player from reselecting the same square
  square.classList.add("taken", "disabled");
  player1Data.push(square.id);
}

function secPlayer(e, square) {
  e.target.innerHTML = player2;
  currentTurn = true;
  movesMade++;
  //this is to prevent player from reselecting the same square
  square.classList.add("taken", "disabled");
  player2Data.push(square.id);
}

function comPlayer() {
  //put the squares that has not been chosen yet inside notChosen
  //randomly choose inside the array
  let notChosen = [];

  for (let i = 0; i < squares.length; i++) {
    if (!squares[i].className.includes("taken")) {
      notChosen.push(squares[i]);
    }
  }

  let random = Math.floor(Math.random() * notChosen.length);
  let compChosen = notChosen[random];
  //this is to prevent player from reselecting the same square
  if (notChosen.length > 0) {
    compChosen.classList.add("taken", "disabled");
    compChosen.innerHTML = comp;
    comData.push(compChosen.id);
    movesMade++;
  }
}

/*
Letting the user play & storing 
the data into their respective array
STORING the ID instead then we can 
compare to the winning arrays
*/
for (let i = 0; i < squares.length; i++) {
  squares[i].onclick = function(e) {
    if (currentTurn && compAI) {
      firstPlayer(e, squares[i]);
      comPlayer();

      currentTurn = true;
    } else if (currentTurn) {
      firstPlayer(e, squares[i]);
    } else {
      secPlayer(e, squares[i]);
    }

    console.log(movesMade);
    //checking for winner or tie

    checkWinner(movesMade, player1Data, player2Data, comData);
  };
}

/* Check the winner after 4 movesMade, tie or win on the 9 movesMade */
function checkWinner(movesMade, player1Data, player2Data, comData) {
  if (movesMade < 9 && winner == false) {
    //make the strings into num to be compared with the winningCombos
    let firstDataNum = player1Data.map(num => parseInt(num));
    let secDataNum = player2Data.map(num => parseInt(num));
    let comDataNum = comData.map(num => parseInt(num));

    for (let i = 0; i < winningCombos.length; i++) {
      if (
        firstDataNum.includes(winningCombos[i][0]) &&
        firstDataNum.includes(winningCombos[i][1]) &&
        firstDataNum.includes(winningCombos[i][2])
      ) {
        winner = true;
        stopGame();
        result.innerHTML = `<h5>The winner is Player 1</h5>`;
        break;
      } else if (
        secDataNum.includes(winningCombos[i][0]) &&
        secDataNum.includes(winningCombos[i][1]) &&
        secDataNum.includes(winningCombos[i][2])
      ) {
        winner = true;
        result.innerHTML = `<h5>The winner is Player 2</h5>`;
      } else if (
        comDataNum.includes(winningCombos[i][0]) &&
        comDataNum.includes(winningCombos[i][1]) &&
        comDataNum.includes(winningCombos[i][2])
      ) {
        winner = true;
        stopGame();
        result.innerHTML = `<h5>The winner is the Computer</h5>`;
      }
    }
  } else {
    if (movesMade == 9 && winner) {
      stopGame();
      result.innerHTML = `<h5>The winner is Player 1</h5>`;
    }
    stopGame();
    result.innerHTML = `<h5>It's a tie</h5>`;
  }
}

/* STOP THE GAME */
function stopGame() {
  let notDisabled = [];

  for (let i = 0; i < squares.length; i++) {
    if (!squares[i].className.includes("disabled")) {
      notDisabled.push(squares[i]);
    }
  }

  for (let i = 0; i < notDisabled.length; i++) {
    notDisabled[i].classList.add("disabled");
  }
}

//CANT SOLVE THE TIE!!
//line 125 if movesMade < 10 solve the issue to get the winner on the last try
//if movesMade < 9 solves the issue for the tie. So issue with either.
//one of the way i was going to solve it, is my going through the classes since
//after I click it there would be classes of disabled and taken.
//maybe I could loop them and make another conditional statement again?
