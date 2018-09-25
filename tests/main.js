function pow (x, n) {
  return n === 1 
  ? x 
  : x * pow(x, n - 1)
  // 1ª) 2 * (2 * 2 = 4, )
}

console.log( pow(2, 3) ) // 8
