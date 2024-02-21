function sumStrings(a, b) {
  // remove the leading 0, not participate to operate
  a = a.replace(/^0*/, "");
  b = b.replace(/^0*/, "");

  const result = [];
  let i = a.length - 1,
    j = b.length - 1,
    de = 0;
  // simulate the add operator from lower position to higher position
  while (i >= 0 || j >= 0) {
    let sum = 0;
    let curr = 0;
    if (i >= 0 && j >= 0) {
      sum = Number(a[i]) + Number(b[j]) + de;
      curr = sum % 10;
    } else if (i >= 0) {
      sum = Number(a[i]) + de;
      curr = sum % 10;
    } else {
      sum = Number(b[j]) + de;
      curr = sum % 10;
    }
    de = sum > 10 ? 1 : 0;
    result.push(curr);
    --i;
    --j;
  }
  if (de) result.push(1);
  return result.reverse().join("");
}

export default sumStrings;
