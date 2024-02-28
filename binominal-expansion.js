function expand(expr) {
  /*
    (2x+1)^2
    [2, 1]  2
    
    (ax+b)^c
    a, b can be positive or negative
    x is a signgle character
    c is a natural number
  */
  /*
    todo: get the coefs which is stored in array , the power, and the variable name of a expr which format is "(ax+b)^c"
    
    parameter: string, the format is "(ax+b)^c"
    return array, [coefs, pow, x], coefs is [a, b], pow is c, x is x 
    
    
    easy to split the format below
    (4x+5)^4
    
    not easy to split the format below
    (4x-5)^4
    
    first transform this format
    (4x+-5)^4
    then use the solution to the first condition
  */
  function getCoefsAndPowAndX(expr) {
    let [coefs, pow] = expr.split("^");
    pow = Number(pow);

    coefs = coefs
      .replace(/[()]/g, "")
      .replace(/(?<=\w)-/, "+-")
      .split(/\+/);

    let x = coefs[0][coefs[0].length - 1];
    coefs[0] = coefs[0].slice(0, -1);

    if (coefs[0] === "") coefs[0] = 1;
    else if (coefs[0] === "-") coefs[0] = -1;
    else coefs[0] = parseInt(coefs[0]);

    coefs[1] = parseInt(coefs[1]);

    // [4, 5] => [5, 4]
    coefs.reverse();

    return [coefs, pow, x];
  }

  let [coefs, pow, x] = getCoefsAndPowAndX(expr);
  //   console.log(coefs, pow, x);

  if (pow === 0) return "1";
  if (pow === 1) return expr.replace(/[()]|(\^.+)/g, "");

  let lastCoefs = [...coefs];
  for (let i = 2; i <= pow; ++i) {
    let res = new Array((lastCoefs.length - 1) * (coefs.length - 1) + 2).fill(
      0
    );

    for (let j = 0; j < lastCoefs.length; ++j) {
      for (let z = 0; z < coefs.length; ++z) {
        res[j + z] += lastCoefs[j] * coefs[z];
      }
    }
    lastCoefs = res;
  }
  //   console.log(lastCoefs);
  /*
    [3, 0, 1, 2] 
   =>
    3x^2+x+2
    
    if the coef is zero, not include
    if the coef is 1, not inlcude coef
    if the coef is -1, - before the x
    if the pow is 0, not inlucde x
    if the pow is 1, not include pow
  */
  function getXPow(x, pow) {
    if (pow === 0) return "";
    if (pow === 1) return x;
    return x + "^" + pow;
  }
  return lastCoefs
    .map((coef, i) => {
      if (coef === 0) return "";
      if (coef === 1) return i === 0 ? "1" : getXPow(x, i);
      if (coef === -1) return "-" + (i === 0 ? "1" : getXPow(x, i));
      return coef + getXPow(x, i);
    })
    .filter((item) => item !== "")
    .reverse()
    .join("+")
    .replace(/\+(?=-)/g, "");
}

export default expand;
