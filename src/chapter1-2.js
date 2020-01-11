const math = require("mathjs");

// ガウス行列
function isGaussianMatrix(x) {
  let val;

  if (x instanceof Array) val = x;
  else if (x instanceof math.Matrix) val = x._data;
  else return false;
  if (2 != math.size(val).length) return false;

  // 1. もし、ある行が 0 以外の数を含めば、最初の 0 でない数は 1 である。
  // 2. もし、すべての数が 0 であるような行が含まれていれば、それらの行は下の方に寄せ集められている。
  // 3. すべてが 0 でない 2 つの行について、上の行の先頭の 1 は下の行の先頭の 1 よりも前に存在する。
  let initialOneIndex = -1;
  let notAllZero = true;

  for (ri in val) {
    const row = val[ri];
    const vi = row.findIndex(v => v != 0);

    if (-1 == vi) {
      // cond2
      notAllZero = false;
      continue;
    }

    const v = row[vi];

    if (
      1 == v && // cond1
      notAllZero && // cond2
      vi > initialOneIndex // cond3
    )
      initialOneIndex = vi;
    else return false;
  }

  return true;
}

// ガウス行列
function isIrreducableGaussianMatrix(x) {
  let val;

  if (x instanceof Array) val = x;
  else if (x instanceof math.Matrix) val = x._data;
  else return false;
  if (2 != math.size(val).length) return false;

  // 1. もし、ある行が 0 以外の数を含めば、最初の 0 でない数は 1 である。
  // 2. もし、すべての数が 0 であるような行が含まれていれば、それらの行は下の方に寄せ集められている。
  // 3. すべてが 0 でない 2 つの行について、上の行の先頭の 1 は下の行の先頭の 1 よりも前に存在する。
  // 4. 先頭の1を含む列の他の数はすべて 0 である。
  let initialOneIndex = -1;
  let notAllZero = true;
  let numRow = val.length;

  for (ri in val) {
    const row = val[ri];
    const vi = row.findIndex(v => v != 0);

    if (-1 == vi) {
      // cond2
      notAllZero = false;
      continue;
    }

    const v = row[vi];
    const col = math.subset(val, math.index(math.range(0, numRow), vi)).flat();

    if (
      1 == v && // cond1
      notAllZero && // cond2
      vi > initialOneIndex && // cond3
      col.every((v, i) => 0 == v || i == ri) // cond4
    )
      initialOneIndex = vi;
    else return false;
  }

  return true;
}

module.exports = {
  isGaussianMatrix,
  isIrreducableGaussianMatrix
};
