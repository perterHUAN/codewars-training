function fib(n) {
  let f0 = 0n, f1 = 1n, fn = 1n;
  /*
    f(0) = 0
    f(1) = 1
    f(n+2) = f(n+1) + f(n)
    
    f(3) = f(2) + f(1)
    f(4) = f(3) + f(2)
    
    f(-1) = f(1) - f(0)
    f(-2) = f(0) - f(-1)
    f(-3) = f(-1) - f(-2)
  */
  
  function positiveSolution(n) {
    for(let i = 2; i <= n; ++i) {
      fn = f1 + f0;
      f0 = f1;
      f1 = fn;
    }
    return fn;
  }
  function negativeSolution(n) {
    for(let i = -1; i >= n; --i) {
      fn = f1 - f0;
      f1 = f0;
      f0 = fn;
    }
    return fn;
  }
  
  if(n === 0) return 0n;
  return n < 0n ? negativeSolution(n) : positiveSolution(n);
}

export default fib;