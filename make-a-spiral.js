function spiralize(n) {
  /* direction order:
      righ, bottom, left, top 
   */
  let directionOrder = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  /*
    generate initial board
  */
  const res = Array.from({ length: n }, () => Array(n).fill(0));

  /*  
    circle to move
    
    nextX => column idx
    nextY => row idx
    
    canMove(directionIdx, curX, curY): check next place on direcitonIdx if can move
    if 
      out of board 
      or 
      touch the cell that is already accessed, 
    don't move to next place, return false
    or can move to next place, return true
    
    changeDirection(directionIdx): if next place on directionIdx is unvalid, change direction to check next place on next direction.
    
  */
  /*
    util functions
        oppositeDirection(direcitonIdx) directionOrder
        isTagged(x, y)  res
        changeDirection(directionIdx) directionOrder
  
    core functions
        canMoveToNext(directionIdx, x, y)
            call
                oppositeDirection
                isTagged
                
        canMove(directionIdx, x, y)
            call 
                canMoveToNext
                changeDirection
    */

  function changeDirection(directionIdx) {
    return (directionIdx = directionIdx + 1) === directionOrder.length
      ? 0
      : directionIdx;
  }
  function oppositeDirection(directionIdx) {
    return (directionIdx = directionIdx + 2) >= directionOrder.length
      ? directionIdx - directionOrder.length
      : directionIdx;
  }
  function isTagged(x, y) {
    if (x >= 0 && x < n && y >= 0 && y < n && res[y][x]) return true;
    return false;
  }

  function canMoveToNext(directionIdx, curX, curY) {
    let nextX = curX + directionOrder[directionIdx][0];
    let nextY = curY + directionOrder[directionIdx][1];

    // if next place if out of range or is already tagged, return false;
    if (nextX < 0 || nextX >= n || nextY < 0 || nextY >= n || res[nextY][nextX])
      return false;

    // check next place's neighborhoods except opposite direction
    // neighbor which is current position.
    const idx = oppositeDirection(directionIdx);
    return !directionOrder
      .filter((_, _idx) => _idx != idx)
      .some(([x, y]) => isTagged(nextX + x, nextY + y));
  }

  /*
    judge if the action can end 
  */
  function canMove(directionIdx, curX, curY) {
    let i;
    for (
      i = 0;
      i < directionOrder.length && !canMoveToNext(directionIdx, curX, curY);
      ++i
    ) {
      directionIdx = changeDirection(directionIdx);
    }
    if (i === directionOrder.length) return -1;
    return directionIdx;
  }

  let curX = 0,
    curY = 0;
  let directionIdx = 0;
  res[curY][curX] = 1;
  while ((directionIdx = canMove(directionIdx, curX, curY)) !== -1) {
    curX += directionOrder[directionIdx][0];
    curY += directionOrder[directionIdx][1];
    res[curY][curX] = 1;
  }
  return res;
}

export default spiralize;
