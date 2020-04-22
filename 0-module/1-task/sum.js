function sum(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  }

  throw new TypeError('Arguments must be a numbers');
}

module.exports = sum;
