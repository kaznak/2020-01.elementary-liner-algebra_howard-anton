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

function gaussJordanElimination(x) {
  let m;

  if (x instanceof Array) m = x;
  else if (x instanceof math.Matrix) m = x.toArray();
  else return false;
  const size = math.size(m);
  if (2 != size.length) return undefined;

  const numRow = size[0];
  const numCol = size[1];
  m = m.map(r => r.map(v => math.fraction(v)));

  for (let ri = 0, ci = 0; !isGaussianMatrix(m); ri++) {
    // ステップ1. すべての数が 0 ではない列(縦に並んだ数)のうち最も左の列に注目する。
    let col;
    while (true) {
      col = m.slice(ri).map(r => r[ci]);
      if (-1 < col.findIndex(v => 0 != v)) break;
      ci += 1;
    }

    // ステップ2. ステップ1で注目した列の最も上の数が 0 の時は、 0 でない数をふくむ行(横にならんだ数)と最も上の行とを入れかえる。
    const rix = ri + col.findIndex(v => 0 != v);
    if (ri != rix) {
      const tmp = m[ri];
      m[ri] = m[rix];
      m[rix] = tmp;
    }

    // ステップ3. ステップ1で注目した列の最も上の数を a とするとき(ステップ2によって a != 0)「先頭の1」を作るために第1行を1/a倍する。
    const a = m[ri][ci];
    m = m.map((row, i) => (ri != i ? row : row.map(v => v.div(a))));

    // ステップ4. 第1行に適当な数をかけて、「先頭の1」より下にある0でない数をふくむ行に加え、「先頭の1」より下の数をすべて0にする。
    row = m[ri];
    m = m.map((r, i) =>
      ri >= i || 0 == r[ci]
        ? r
        : math.subtract(
            r,
            row.map(v => v.mul(r[ci]))
          )
    );
    // ステップ5. 第1行を忘れて、残った行列について、ステップ1にもどる。これを全体がガウス行列になるまで続ける。
  }

  for (let ri = numRow - 1, ci; !isIrreducableGaussianMatrix(m); ri--) {
    // ステップ6. 「先頭の1」より上がすべて0になるように、「先頭の1」をふくむ行に適当な数をかけて、それよりも上の行に加える。
    const row = m[ri];
    const ci = row.findIndex(v => 1 == v);
    if (-1 == ci) continue;

    m = m.map((r, i) =>
      ri <= i
        ? r
        : math.subtract(
            r,
            row.map(v => v.mul(r[ci]))
          )
    );
  }

  return m;
}

module.exports = {
  isGaussianMatrix,
  isIrreducableGaussianMatrix,
  gaussJordanElimination
};
