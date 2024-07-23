document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".box");
  const resetBtn = document.querySelector("#reset-btn");
  const newGameBtn = document.querySelector("#new-btn");
  const msgContainer = document.querySelector(".msg-container");
  const msg = document.querySelector("#msg");

  let turnO = true; // playerX, playerO
  let count = 0; // To Track Draw

  const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
  };

  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (box.innerText !== "") return;

      box.innerText = turnO ? "O" : "X";
      box.classList.add(turnO ? "player-o" : "player-x");
      turnO = !turnO;
      count++;

      if (checkWinner()) {
        disableBoxes();
      } else if (count === 9) {
        gameDraw();
      }
    });
  });

  const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  };

  const disableBoxes = () => {
    boxes.forEach((box) => {
      box.disabled = true;
    });
  };

  const enableBoxes = () => {
    boxes.forEach((box) => {
      box.disabled = false;
      box.innerText = "";
      box.classList.remove("player-o", "player-x");
    });
  };

  const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
  };

  const checkWinner = () => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      const boxA = boxes[a].innerText;
      const boxB = boxes[b].innerText;
      const boxC = boxes[c].innerText;

      if (boxA && boxA === boxB && boxA === boxC) {
        showWinner(boxA);
        return true;
      }
    }
    return false;
  };

  newGameBtn.addEventListener("click", resetGame);
  resetBtn.addEventListener("click", resetGame);
});
