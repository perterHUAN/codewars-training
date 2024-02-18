/*
    parent element
    board two-dimsion array to describe the state of game board
    state
        0
        1 (with fill class to distingiush other state)
    div
        div
        div
        ...
*/
function draw(parent, board) {
  const rows = board.length;
  const cols = board[0].length;

  const container = document.createElement("div");
  container.classList.add("game-board");
  for (let i = 0; i < rows; ++i) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < cols; ++j) {
      const child = document.createElement("div");
      child.classList.add("cell");
      if (board[i][j]) child.classList.add("fill");

      row.appendChild(child);
    }
    container.appendChild(row);
  }
  parent.appendChild(container);
}

export default draw;
