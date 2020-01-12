const math = require("mathjs");
const chap1 = require("../../src/chapter1-2");

test("example 6", () => {
  let val = [
    [1, 3, -2, 0, 2, 0, 0],
    [2, 6, -5, -2, 4, -3, -1],
    [0, 0, 5, 10, 0, 15, 5],
    [2, 6, 0, 8, 4, 18, 6]
  ];
  let ret = [
      [1, 3, 0, 4, 2, 0, 0],
      [0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, "1/3"],
      [0, 0, 0, 0, 0, 0, 0]
    ];

  let out = chap1.gaussJordanElimination(val);
  expect(chap1.isIrreducableGaussianMatrix(out)).toBe(true);
  expect(math.deepEqual(out, ret)).toBe(true);
});
