const math = require("mathjs");
const chap1 = require("../src/chapter1-2");

test("example 4, Irreducable Gaussian Matrix 1", () => {
  let val = [
    [1, 0, 0, 4],
    [0, 1, 0, 7],
    [0, 0, 1, -1]
  ];
  expect(chap1.isIrreducableGaussianMatrix(val)).toBe(true);
  expect(chap1.isGaussianMatrix(val)).toBe(true);
  val = math.matrix(val);
  expect(chap1.isIrreducableGaussianMatrix(val)).toBe(true);
  expect(chap1.isGaussianMatrix(val)).toBe(true);
});

test("example 4, Irreducable Gaussian Matrix 2", () => {
  let val = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ];
  expect(chap1.isIrreducableGaussianMatrix(val)).toBe(true);
  expect(chap1.isGaussianMatrix(val)).toBe(true);
  val = math.matrix(val);
  expect(chap1.isIrreducableGaussianMatrix(val)).toBe(true);
  expect(chap1.isGaussianMatrix(val)).toBe(true);
});

test("example 4, Irreducable Gaussian Matrix 3", () => {
  let val = [
    [0, 1, -2, 0, 1],
    [0, 0, 0, 1, 3],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ];
  expect(chap1.isIrreducableGaussianMatrix(val)).toBe(true);
  expect(chap1.isGaussianMatrix(val)).toBe(true);
  val = math.matrix(val);
  expect(chap1.isIrreducableGaussianMatrix(val)).toBe(true);
  expect(chap1.isGaussianMatrix(val)).toBe(true);
});

test("example 4, Irreducable Gaussian Matrix 4", () => {
  let val = [
    [0, 0],
    [0, 0]
  ];
  expect(chap1.isIrreducableGaussianMatrix(val)).toBe(true);
  expect(chap1.isGaussianMatrix(val)).toBe(true);
  val = math.matrix(val);
  expect(chap1.isIrreducableGaussianMatrix(val)).toBe(true);
  expect(chap1.isGaussianMatrix(val)).toBe(true);
});

test("example 4, Gaussian Matrix 1", () => {
  let val = [
    [1, 4, 3, 7],
    [0, 1, 6, 2],
    [0, 0, 1, 5]
  ];
  expect(chap1.isIrreducableGaussianMatrix(val)).toBe(false);
  expect(chap1.isGaussianMatrix(val)).toBe(true);
  val = math.matrix(val);
  expect(chap1.isIrreducableGaussianMatrix(val)).toBe(false);
  expect(chap1.isGaussianMatrix(val)).toBe(true);
});

test("example 4, Gaussian Matrix 2", () => {
  let val = [
    [1, 1, 0],
    [0, 1, 0],
    [0, 0, 0]
  ];
  expect(chap1.isIrreducableGaussianMatrix(val)).toBe(false);
  expect(chap1.isGaussianMatrix(val)).toBe(true);
  val = math.matrix(val);
  expect(chap1.isIrreducableGaussianMatrix(val)).toBe(false);
  expect(chap1.isGaussianMatrix(val)).toBe(true);
});

test("example 4, Gaussian Matrix 3", () => {
  let val = [
    [0, 1, 2, 6, 0],
    [0, 0, 1, -1, 0],
    [0, 0, 0, 0, 1]
  ];
  expect(chap1.isIrreducableGaussianMatrix(val)).toBe(false);
  expect(chap1.isGaussianMatrix(val)).toBe(true);
  val = math.matrix(val);
  expect(chap1.isIrreducableGaussianMatrix(val)).toBe(false);
  expect(chap1.isGaussianMatrix(val)).toBe(true);
});
