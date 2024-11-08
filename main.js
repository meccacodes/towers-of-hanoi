// Grab HTML elements
const fromTower = document.querySelector(".fromTower");
const toTower = document.querySelector(".toTower");
const moveButton = document.querySelector("#moveButton");
const reset = document.querySelector("#reset");

const tower1 = document.querySelector(".tower1");
const tower2 = document.querySelector(".tower2");
const tower3 = document.querySelector(".tower3");

const disks = [
  document.querySelector(".disk-1"),
  document.querySelector(".disk-2"),
  document.querySelector(".disk-3"),
  document.querySelector(".disk-4"),
  document.querySelector(".disk-5"),
];

const tower1Container = document.querySelector("#tower-1");
const tower2Container = document.querySelector("#tower-2");
const tower3Container = document.querySelector("#tower-3");
const tower1Arrow = document.querySelector(".tower-1-arrow");

const validMoves = document.querySelector("#lastValidMove");
const invalidMoves = document.querySelector("#invalidMoves");

// A board representing 3 towers, and 5 discs on the first tower in ascending order.
// TODO: give ability to add/subtract disks/towers based on user input
const startingBoard = [[5, 4, 3, 2, 1], [5, 4, 3, 2], []];

// get this instance of the game
let gameInstance = [...startingBoard];

// Per instructions: use array helper .map() to display the board to the console
const viewBoard = (board) => {
  const boardView = board
    .map((row) => {
      return "--- " + row.join(" ");
    })
    .join("\n");

  console.log(boardView);
};

// variable to test reset game:
// let gameInstance = [[5, 4], [3, 2], [1]];

console.log(`The starting board is:`);
viewBoard(gameInstance);

// add array values onto disks
document.addEventListener("DOMContentLoaded", () => {
  const board = [...startingBoard];

  // Get tower1 array from gameInstance
  const tower1Array = board[0];

  // // Loop through the disks array in reverse (since tower1 displays bottom-up)
  disks.reverse().forEach((disk, index) => {
    if (disk && tower1Array[index]) {
      disk.textContent = tower1Array[index];
    } else {
      disk.textContent = "";
    }
  });
});

// check if move is valid:
const validateMove = function (fromTower, toTower) {
  console.log(`Validating move...`);

  // Get fromTower array
  const fromTowerIndex = fromTower - 1;
  const fromTowerArray = gameInstance[fromTowerIndex];
  console.log(fromTowerArray);

  // Get toTower Array
  const toTowerIndex = toTower - 1;
  const toTowerArray = gameInstance[toTowerIndex];
  console.log(toTowerArray);

  // check if fromTower or toTower is undefined
  if (fromTowerArray === undefined) {
    console.log(
      `There is no tower ${fromTower}, try again.  Choose tower 1, 2, or 3.`
    );
    invalidMoves.textContent = `There is no tower ${fromTower}, try again.  Choose tower 1, 2, or 3.`;
    validMoves.textContent = "";
    return false;
  } else if (toTowerArray === undefined) {
    console.log(
      `There is no tower ${toTower}, try again.  Choose tower 1, 2, or 3.`
    );
    invalidMoves.textContent = `There is no tower ${toTower}, try again.  Choose tower 1, 2, or 3.`;
    validMoves.textContent = "";
    return false;
  }

  const fromTowerLength = fromTowerArray.length;
  const toTowerLength = toTowerArray.length;

  // get disk to move
  const diskToMove = fromTowerArray[fromTowerLength - 1];

  // get top disc on target tower
  const topDiscOnTarget = toTowerArray[toTowerLength - 1];

  // check if fromTower is empty
  if (fromTowerArray.length === 0) {
    console.log(
      `There are no disks in tower ${fromTower}, try again.  Choose a tower with disks.`
    );
    invalidMoves.textContent = `There are no disks in tower ${fromTower}, try again.  Choose a tower with disks.`;
    validMoves.textContent = "";
    return false;
  } // check if disk to move is larger than top disc on target tower
  else if (diskToMove > topDiscOnTarget) {
    console.log(
      `The disk to move is larger than the top disc on the target tower. Try again.`
    );
    invalidMoves.textContent = `Disk ${diskToMove} is larger than disk ${topDiscOnTarget}. Larger disks cannot be placed on smaller disks, try again.`;
    validMoves.textContent = "";
    return false;
  } else {
    console.log(
      `Valid move! You can move disk ${diskToMove} from tower ${fromTower} to tower ${toTower}`
    );
    validMoves.textContent = `Valid move! You can move disk ${diskToMove} from tower ${fromTower} to tower ${toTower}`;
    invalidMoves.textContent = "";

    // Get the tower DOM elements using correct selectors
    const sourceTower = document.querySelector(`.tower${fromTower}`);
    const targetTower = document.querySelector(`#tower-${toTower}`);

    // Find the specific disk element to move based on the diskToMove value
    const diskElement = document.querySelector(`.disk-${diskToMove}`);

    // Add disk to the top of the target tower using prepend
    if (diskElement && targetTower) {
      targetTower.prepend(diskElement);
    }

    // Update game state arrays
    const popDisk = fromTowerArray.pop();
    const addDisk = toTowerArray.push(popDisk);
    console.log(`The board now looks like this:`);
    viewBoard(gameInstance);
    return true;
  }
};

// Listen for Reset/New Game
const resetGame = reset.addEventListener("click", function (event) {
  console.log(`Board before reset:`, gameInstance);
  gameInstance = [...startingBoard];
  console.log(`The game has been reset, the board is now:`, gameInstance);
  location.reload();
});

// check if the game is won
const checkWinner = function (tower2, tower3) {
  console.log(`Checking for a winner...`);
  const winningTower = JSON.stringify([5, 4, 3, 2, 1]);
  // console.log(`Winning tower JSON:`, winningTower);
  const tower2Check = JSON.stringify(tower2);
  // console.log(`Tower 2 JSON:`, tower2Check);
  const tower3Check = JSON.stringify(tower3);
  // console.log(`Tower 3 JSON:`, tower3Check);
  if (tower2Check == winningTower || tower3Check === winningTower) {
    console.log(`You won!`);
    gameInstance = [...startingBoard];
    validMoves.textContent = `You won! The game will reset in 6 seconds`;
    setTimeout(window.location.reload.bind(window.location), 6000);
    return true;
  } else {
    console.log(`Not yet!`);
    return false;
  }
};

// player submits a move

// listen for submit button
moveButton.addEventListener("click", function (event) {
  event.preventDefault();
  // get the tower numbers from player input
  let fromTower = document.querySelector(".fromTower").value;

  let toTower = document.querySelector(".toTower").value;

  const fromTowerNumber = Number(fromTower);
  const toTowerNumber = Number(toTower);

  // validate the move
  validateMove(fromTowerNumber, toTowerNumber);

  // get gameInstance arrays
  let tower2 = gameInstance[1];
  let tower3 = gameInstance[2];

  // check to see if game is won
  checkWinner(tower2, tower3);
});
