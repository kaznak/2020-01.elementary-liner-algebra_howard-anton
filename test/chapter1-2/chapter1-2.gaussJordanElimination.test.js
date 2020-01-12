const math = require("mathjs");
const chap1 = require("../../src/chapter1-2");

test("Gauss-Jordan Elimination", () => {
  let val = [
    [0, 0, -2, 0, 7, 12],
    [2, 4, -10, 6, 12, 28],
    [2, 4, -5, 6, -5, -1]
  ];
  let ret = [
    [1, 2, 0, 3, 0, 7],
    [0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 1, 2]
  ];

  let out = chap1.gaussJordanElimination(val);
  expect(chap1.isIrreducableGaussianMatrix(out)).toBe(true);
  expect(math.deepEqual(out, ret)).toBe(true);
});
