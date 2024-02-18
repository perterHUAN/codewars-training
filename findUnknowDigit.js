function solveExpression(exp) {
  const [number1, number2, result] = exp.split(/(?<=[\d?])[-+*\/=]/);
  const op = exp.match(/(?<=[\d?])[-+*\/=]/)[0];
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
    calculate(str, num)
        str = '12?'
        num = 9
        return 129

        str = '-12?'
        num = 9
        return -129
        
 */
  function calculate(str, num) {
    let sign = str[0] === "-" ? -1 : 1;
    let res = 0;
    for (let i = str.length - 1, dec = 1; i >= 0; --i, dec *= 10) {
      if (str[i] === "?") res += num * dec;
      else if ("123456789".includes(str[i])) res += str[i] * dec;
    }
    return res * sign;
  }
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
    let isOk = true;
    switch (op) {
      case "+":
        isOk =
          calculate(number1, i) + calculate(number2, i) == calculate(result, i);
        break;
      case "-":
        isOk =
          calculate(number1, i) - calculate(number2, i) == calculate(result, i);
        break;
      case "*":
        isOk =
          calculate(number1, i) * calculate(number2, i) == calculate(result, i);
        break;
    }
    if (isOk) return i;
  }
  return -1;
}

export default solveExpression;
