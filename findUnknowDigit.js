function solveExpression(exp) {
  const [number1, number2, result] = exp.split(/(?<=[\d?])[-+*\/=]/);
  const op = exp.match(/(?<=[\d?])[-+*\/=]/)[0];

  /*
    17?
    ? + 7 * 10 + 1 * 100
    
    [110, 7, 0] represents 110 + 7 * ? + 0 * ? * ?
  */
  function expression(str) {
    const result = [0, 0, 0];
    let sign = 1;
    if (str[0] === "-") {
      sign = -1;
      str = str.slice(1);
    }
    for (let i = str.length - 1, dec = 1; i >= 0; --i, dec *= 10) {
      if (str[i] === "?") result[1] += dec;
      else result[0] += Number(str[i]) * dec;
    }

    result[0] *= sign;
    result[1] *= sign;
    result[2] *= sign;
    return result;
  }

  const number1Exp = expression(number1);
  const number2Exp = expression(number2);
  const resultExp = expression(result);

  const expectExp = [0, 0, 0];

  switch (op) {
    case "-":
      (expectExp[0] = number1Exp[0] - number2Exp[0]),
        (expectExp[1] = number1Exp[1] - number2Exp[1]);
      break;
    case "+":
      (expectExp[0] = number1Exp[0] + number2Exp[0]),
        (expectExp[1] = number1Exp[1] + number2Exp[1]);
      break;
    case "*":
      (expectExp[0] = number1Exp[0] * number2Exp[0]),
        (expectExp[1] =
          number1Exp[1] * number2Exp[0] + number2Exp[1] * number1Exp[0]),
        (expectExp[2] = number1Exp[1] * number2Exp[1]);
      break;
  }

  /*
    resultExp [A ,B, C]
    expectExp [D ,E, F]
    enumerate from 9 to 0 to test whether equal
    if have multiply answers, choose the lowerest.
    
    if the lowerest answer is 0, we need to check whether it is ok.
    
    canBeZero
        ??001, -?01   return false, represents ? not be 0
        1?      return true, represents ? can be 0
    
    enumerate number can't be one of the given digits in the expression
    canEnumerate
        ?*11=??
        1 return false, represent 1 can't be a enumerated number, which appears in 11.
        2 return true, represent 2 can be a enumerated number, which don't appear in each expression.        
        
 */
  function canEnumerate(i) {
    return !number1.includes(i) && !number2.includes(i) && !result.includes(i);
  }
  function canBeZero(str) {
    return (
      str.length === 1 ||
      (str[0] === "-" && str[1] !== "?") ||
      (str[0] !== "-" && str[0] !== "?")
    );
  }
  for (
    let i =
      canBeZero(number1) && canBeZero(number2) && canBeZero(result) ? 0 : 1;
    i <= 9;
    ++i
  ) {
    if (!canEnumerate(i)) continue;
    const j = i * i;
    if (
      resultExp[0] + resultExp[1] * i + resultExp[2] * j ===
      expectExp[0] + expectExp[1] * i + expectExp[2] * j
    ) {
      return i;
    }
  }
  return -1;
}

export default solveExpression;
