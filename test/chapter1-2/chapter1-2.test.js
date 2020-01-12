const math = require("mathjs");
const chap1 = require("../../src/chapter1-2");

test("scalar values", () => {
  let val;

  val = null;
  expect(chap1.isIrreducableGaussianMatrix(val)).toBe(false);
  expect(chap1.isGaussianMatrix(val)).toBe(false);

  val = undefined;
  expect(chap1.isIrreducableGaussianMatrix(val)).toBe(false);
  expect(chap1.isGaussianMatrix(val)).toBe(false);

  val = true;
  expect(chap1.isIrreducableGaussianMatrix(val)).toBe(false);
  expect(chap1.isGaussianMatrix(val)).toBe(false);

  val = 1;
  expect(chap1.isIrreducableGaussianMatrix(val)).toBe(false);
  expect(chap1.isGaussianMatrix(val)).toBe(false);

  val = "str";
  expect(chap1.isIrreducableGaussianMatrix(val)).toBe(false);
  expect(chap1.isGaussianMatrix(val)).toBe(false);

  val = () => true;
  expect(chap1.isIrreducableGaussianMatrix(val)).toBe(false);
  expect(chap1.isGaussianMatrix(val)).toBe(false);
});

test("matrix values", () => {
  let val;
  val = [
    [0, 0],
    [0, 0]
  ];
  expect(chap1.isIrreducableGaussianMatrix(val)).toBe(true);
  expect(chap1.isGaussianMatrix(val)).toBe(true);
});

test("gauss-jordan elimination", () => {
  let val = [
    [0, 0],
    [0, 0]
  ];
  let ret = [
    [0, 0],
    [0, 0]
  ];

  let out = chap1.gaussJordanElimination(val);
  expect(chap1.isIrreducableGaussianMatrix(out)).toBe(true);
  expect(math.deepEqual(out, ret)).toBe(true);
});
