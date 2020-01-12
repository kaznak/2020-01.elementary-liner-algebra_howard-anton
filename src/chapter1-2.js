const math = require("mathjs");

function toArray(x) {
  if (x instanceof Array) return x;
  if (x instanceof math.Matrix) return x.toArray();
  throw new TypeError("argument must be a mathjs matrix");
}

// ガウス行列
function isGaussianMatrix(x) {
  let tmp;
  try {
    tmp = toArray(x);
  } catch (err) {
    return false;
  }
  const m = tmp;
  const [numRow, _, rest] = math.size(m);
  if (undefined != rest) return false;

  // 1. もし、ある行が 0 以外の数を含めば、最初の 0 でない数は 1 である。
  // 2. もし、すべての数が 0 であるような行が含まれていれば、それらの行は下の方に寄せ集められている。
  // 3. すべてが 0 でない 2 つの行について、上の行の先頭の 1 は下の行の先頭の 1 よりも前に存在する。
  let initialOneIndex = -1;
  let notAllZero = true;

  for (let ri = 0; ri < numRow; ri++) {
    const row = m[ri];
    const ci = row.findIndex(v => math.unequal(0, v));

    if (-1 == ci) {
      // cond2
      notAllZero = false;
      continue;
    }

    if (
      1 == row[ci] && // cond1
      notAllZero && // cond2
      ci > initialOneIndex // cond3
    )
      initialOneIndex = ci;
    else return false;
  }

  return true;
}

// 既約ガウス行列
function isIrreducableGaussianMatrix(x) {
  let tmp;
  try {
    tmp = toArray(x);
  } catch (err) {
    return false;
  }
  const m = tmp;
  const [numRow, _, rest] = math.size(m);
  if (undefined != rest) return false;

  // 1. もし、ある行が 0 以外の数を含めば、最初の 0 でない数は 1 である。
  // 2. もし、すべての数が 0 であるような行が含まれていれば、それらの行は下の方に寄せ集められている。
  // 3. すべてが 0 でない 2 つの行について、上の行の先頭の 1 は下の行の先頭の 1 よりも前に存在する。
  // 4. 先頭の1を含む列の他の数はすべて 0 である。
  let initialOneIndex = -1;
  let notAllZero = true;

  for (let ri = 0; ri < numRow; ri++) {
    const row = m[ri];
    const ci = row.findIndex(v => math.unequal(0, v));

    if (-1 == ci) {
      // cond2
      notAllZero = false;
      continue;
    }

    if (
      1 == row[ci] && // cond1
      notAllZero && // cond2
      ci > initialOneIndex && // cond3
      m.map(r => r[ci]).every((v, i) => math.equal(0, v) || i == ri) // cond4
    )
      initialOneIndex = ci;
    else return false;
  }

  return true;
}

function gaussJordanElimination(x) {
  let m = math.map(toArray(x), v => math.fraction(v));

  const [numRow, numCol, rest] = math.size(m);
  if (undefined != rest)
    throw new TypeError("argument must be a two dimensional mathjs matrix");

  for (let ri = 0, ci = 0; ri < numRow && ci < numCol; ri++) {
    // ステップ1. すべての数が 0 ではない列(縦に並んだ数)のうち最も左の列に注目する。
    // ステップ2. ステップ1で注目した列の最も上の数が 0 の時は、 0 でない数をふくむ行(横にならんだ数)と最も上の行とを入れかえる。
    for (; ; ci++) {
      if (ci >= numCol) return m;
      const col = m.slice(ri).map(r => r[ci]);
      const rid = col.findIndex(v => math.unequal(0, v));
      if (-1 < rid) {
        const rix = ri + rid;
        const tmp = m[ri];
        m[ri] = m[rix];
        m[rix] = tmp;
        break;
      }
    }

    // ステップ3. ステップ1で注目した列の最も上の数を a とするとき(ステップ2によって a != 0)「先頭の1」を作るために第1行を1/a倍する。
    // ステップ4. 第1行に適当な数をかけて、「先頭の1」より下にある0でない数をふくむ行に加え、「先頭の1」より下の数をすべて0にする。
    // ステップ6. 「先頭の1」より上がすべて0になるように、「先頭の1」をふくむ行に適当な数をかけて、それよりも上の行に加える。
    const a = m[ri][ci];
    const row = math.divide(m[ri], a);
    m = m.map((r, i) => {
      if (ri == i) return row;
      if (math.equal(0, r[ci])) return r;
      return math.subtract(r, math.multiply(row, r[ci]));
    });
    // ステップ5. 第1行を忘れて、残った行列について、ステップ1にもどる。これを全体がガウス行列になるまで続ける。
  }

  return m;
}

module.exports = {
  isGaussianMatrix,
  isIrreducableGaussianMatrix,
  gaussJordanElimination
};
