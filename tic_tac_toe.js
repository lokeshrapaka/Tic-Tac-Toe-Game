const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector(".reset_btn");
const newGameBtn = document.querySelector("#newgame");
const msgContainer = document.querySelector(".msg-container");
const msgText = document.getElementById("msg");
const winnerModal = document.getElementById("winnerModal");
const winnerMessage = document.getElementById("winnerMessage");
const modalCloseBtn = document.getElementById("modalCloseBtn");

let turnO = true; // true = O's turn, false = X's turn
const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // columns
  [0,4,8],[2,4,6]          // diagonals
];

// Add click listeners on boxes
boxes.forEach(box => {
  box.addEventListener("click", () => {
    if(box.innerText === "") {
      box.innerText = turnO ? "O" : "X";
      box.disabled = true;
      if(checkWinner()) {
        showWinner(turnO ? "O" : "X");
      } else if(checkDraw()) {
        showDraw();
      } else {
        turnO = !turnO;
        msgText.innerText = `${turnO ? "O" : "X"}'s Turn`;
      }
    }
  });
});

function checkWinner() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return (
      boxes[a].innerText !== "" &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[b].innerText === boxes[c].innerText
    );
  });
}

function checkDraw() {
  return [...boxes].every(box => box.innerText !== "");
}

function showWinner(winner) {
  msgText.innerText = `🎉 Congrats! ${winner} Wins!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  highlightWinningBoxes(winner);

  // Show modal
  winnerMessage.innerText = `🎉 Congrats! ${winner} Wins!`;
  winnerModal.classList.remove("hide");
}

function showDraw() {
  msgText.innerText = "It's a Draw!";
  msgContainer.classList.remove("hide");
  disableBoxes();

  winnerMessage.innerText = "It's a Draw!";
  winnerModal.classList.remove("hide");
}

function highlightWinningBoxes(winner) {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      boxes[a].innerText === winner &&
      boxes[b].innerText === winner &&
      boxes[c].innerText === winner
    ) {
      boxes[a].classList.add("winner");
      boxes[b].classList.add("winner");
      boxes[c].classList.add("winner");
      break;
    }
  }
}

function disableBoxes() {
  boxes.forEach(box => box.disabled = true);
}

function enableBoxes() {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("winner");
  });
}

function resetGame() {
  turnO = true;
  enableBoxes();
  msgText.innerText = "O's Turn";
  msgContainer.classList.add("hide");
  winnerModal.classList.add("hide");
}

// Event listeners for reset and new game buttons
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

modalCloseBtn.addEventListener("click", () => {
  winnerModal.classList.add("hide");
  resetGame();
});

// Initialize message
msgText.innerText = "O's Turn";
msgContainer.classList.add("hide");
