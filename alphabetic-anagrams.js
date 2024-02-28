function listPosition(word) {
  //Return the anagram list position of the word
  let wd = word.split('').sort();
  
  /*
    wd: Array, represent the current permuation.
    return: Array, represent the next permutation.
     
    https://en.wikipedia.org/wiki/Permutation#Generation_in_lexicographic_order
  */
  function nextPermutation(a) {
    let n = a.length;
    // 1. find max k, a[k] < a[k+1]
    let k = -1;
    for(let i = 0; i < n - 1; ++i) {
      if(a[i] < a[i+1]) k = i;
    }
    /*
      if k is not exist, state the current permutaion is the max one, don't have next permuation.
    */
    if(k === -1) return -1;
    // 2. find max l, l > k, a[k] < a[l]
    let l = -1;
    for(let i = k + 1; i < n; ++i) {
         if(a[i] > a[k]) l = i;
    }
    // 3. swap a[k] a[l]
    let t = a[k];
    a[k] = a[l];
    a[l] = t;
    // 4. reverse a[k+1...]
    for(let i = k + 1, j = n-1; i < j; ++i, --j) {
      let t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }
  let i;
  for(i = 1; wd !== -1 && wd.join('') !== word; ++i) {
    wd = nextPermutation(wd);
  }
  return i;
}

export default listPosition;