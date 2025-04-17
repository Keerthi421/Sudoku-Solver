document.addEventListener("DOMContentLoaded", function() {
  const sudokuBoard = document.getElementById("sudoku-board");
  const solveButton = document.getElementById("solve-button");
  const clearButton = document.getElementById("clear-button");

  sudokuBoard.addEventListener("keyup", function(event) {
    if (event.target && event.target.nodeName === "TD") {
      const validNum = /[1-9]/;
      const tdEl = event.target;
      if (tdEl.innerText.length > 0 && validNum.test(tdEl.innerText[0])) {
        tdEl.innerText = tdEl.innerText[0];
      } else {
        tdEl.innerText = "";
      }
    }
  });

  solveButton.addEventListener("click", function(event) {
    const boardString = boardToString();
    const solution = SudokuSolver.solve(boardString);
    if (solution) {
      stringToBoard(solution);
    } else {
      alert("Invalid board!");
    }
  });

  clearButton.addEventListener("click", clearBoard);

  function clearBoard() {
    const tds = document.getElementsByTagName("td");
    for (let i = 0; i < tds.length; i++) {
      tds[i].innerText = "";
    }
  }

  function boardToString() {
    let string = "";
    const validNum = /[1-9]/;
    const tds = document.getElementsByTagName("td");
    for (let i = 0; i < tds.length; i++) {
      if (validNum.test(tds[i].innerText[0])) {
        string += tds[i].innerText;
      } else {
        string += "-";
      }
    }
    return string;
  }

  function stringToBoard(string) {
    let currentCell;
    const validNum = /[1-9]/;
    const cells = string.split("");
    const tds = document.getElementsByTagName("td");
    for (let i = 0; i < tds.length; i++) {
      currentCell = cells.shift();
      if (validNum.test(currentCell)) {
        tds[i].innerText = currentCell;
      }
    }
  }
});