const { createXYArrays } = require('./createXYArrays.js');

describe('createXYArrays()', () => {
  test('takes an array of objects, returns object of treesPerDay and date arrays', () => {
    expect(typeof createXYArrays([])).toBe('object');
  })
})