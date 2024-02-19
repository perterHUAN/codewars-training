function validateBattlefield(field) {
  // write your magic here
  let rc = Array.from({ length: 10 }, () => Array(10).fill(0));
  let config = [
    ["battleship", 4, 1],
    ["cruiser", 3, 2],
    ["destroyer", 2, 3],
    ["submarine", 1, 4],
  ];

  let sizeToShip = config.reduce((pre, cur) => {
    pre[cur[1]] = { name: cur[0], cnt: cur[2] };
    return pre;
  }, {});
  let shipCnt = config.reduce((pre, cur) => {
    pre[cur[0]] = 0;
    return pre;
  }, {});
  let cntToShip = config.reduce((pre, cur) => {
    pre[cur[2]] = cur[0];
    return pre;
  }, {});

  /*
    return number
      0 represents not valid
      > 0 represents valid and indicates the type of ship.
        4 battleship
        3 cruiser
        2 desctroyer
        1 submarine
  */
  function validShip(x, y) {
    let directions = [
      [-1, 0],
      [1, 0],
      [0, 1],
      [0, -1],
      [-1, 1],
      [-1, -1],
      [1, 1],
      [1, -1],
    ];
    let directionsCnt = [0, 0, 0, 0];
    let res = 1;
    let queue = [[x, y]];
    rc[x][y] = 1;
    while (queue.length > 0) {
      let [xx, yy] = queue.shift();
      let cnt = 0;
      for (const [dx, dy] of directions) {
        const nx = xx + dx;
        const ny = yy + dy;

        if (
          nx < 10 &&
          nx >= 0 &&
          ny >= 0 &&
          ny < 10 &&
          rc[nx][ny] === 0 &&
          field[nx][ny]
        ) {
          rc[nx][ny] = 1;
          queue.push([nx, ny]);
          directionsCnt[cnt] = 1;
          if (directionsCnt.reduce((pre, cur) => pre + cur) > 1) return 0;
          if (++res > 4) return 0;
        }
        ++cnt;
      }
    }
    return res;
  }
  for (let i = 0; i < 10; ++i) {
    for (let j = 0; j < 10; ++j) {
      if (rc[i][j] || !field[i][j]) continue;
      console.log("check ", i, j);
      const rs = validShip(i, j);
      console.log("rs: ", rs);
      if (!rs) return false;
      const { name, cnt } = sizeToShip[rs];
      if (++shipCnt[name] > cnt) return false;
    }
  }
  console.log("check all:");
  for (const cnt in cntToShip) {
    if (!cntToShip.hasOwnProperty(cnt)) continue;
    if (shipCnt[cntToShip[cnt]] != cnt) return false;
  }
  return true;
}

export default validateBattlefield;
