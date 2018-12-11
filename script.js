const squares = document.querySelectorAll(".square");
const result = document.querySelector("#result");
const player1 = `<i class="fas fa-times"></i>`;
const player2 = `<i class="far fa-circle"></i>`;

//Initialiser
let currentTurn = true;
let movesMade = 0;
let player1Data = [];
let player2Data = [];
let compData = [];
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
    squares[i].classList.remove("disabled");
    squares[i].classList.remove("o");
    squares[i].classList.remove("x");
    squares[i].innerHTML = "";
    result.innerHTML = `<h5>Who will win?</h5>`;
  }
  movesMade = 0;
  currentTurn = true;
  player1Data = [];
  player2Data = [];
}

/*
Letting the user play & storing 
the data into their respective array
STORING the ID instead then we can 
compare to the winning arrays
*/
for (let i = 0; i < squares.length; i++) {
  squares[i].onclick = function(e) {
    if (currentTurn) {
      e.target.innerHTML = player1;
      currentTurn = false;
      player1Data.push(squares[i].id);
      console.log(player1Data);
    } else {
      e.target.innerHTML = player2;
      currentTurn = true;
      player2Data.push(squares[i].id);
      console.log(player2Data);
    }
    //this is to prevent player from reselecting the same square
    e.target.classList.add("disabled");
    movesMade++;
    console.log(movesMade);
    //checking for winner or tie
    if (movesMade > 4) {
      checkWinner(movesMade, player1Data, player2Data);
    }
  };
}

//check winner after 4 moves then
//tie at the 9 moves if no winner
function checkWinner(movesMade, player1Data, player2Data) {
  //make the strings into num to be compared with the winningCombos

  if (movesMade < 9) {
    let firstDataNum = player1Data.map(num => parseInt(num));
    let secDataNum = player2Data.map(num => parseInt(num));

    for (let i = 0; i < winningCombos.length; i++) {
      if (
        firstDataNum.includes(winningCombos[i][0]) &&
        firstDataNum.includes(winningCombos[i][1]) &&
        firstDataNum.includes(winningCombos[i][2])
      ) {
        //debugger;
        result.innerHTML = `<h5>The winner is Player 1</h5>`;
        //console.log("PLAYER 1 WON");
      } else if (
        secDataNum.includes(winningCombos[i][0]) &&
        secDataNum.includes(winningCombos[i][1]) &&
        secDataNum.includes(winningCombos[i][2])
      ) {
        result.innerHTML = `<h5>The winner is Player 2</h5>`;
        //console.log("PLAYER 2 WON");
      }
    }

    console.log(firstDataNum);
    console.log(secDataNum);
  } else {
    result.innerHTML = `<h5>It's a tie</h5>`;
    console.log("Its a tie");
  }
}
