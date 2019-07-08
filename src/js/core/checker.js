// 检查数据是否重复

function checkArray(array) {
  const length = array.length;
  const marks = new Array(length);
  marks.fill(true);
  for (let i = 0; i < length - 1; i++) {
    if (!marks[i]) {
      continue;
    }

    const val = array[i];
    // 是否有效： 0：无效， 1-9：有效
    if (!val) {
      marks[i] = false;
      continue;
    }

    // 是否有重复 i + 1 ~ 9. 是否和 i 位置数据重复
    for (let j = i + 1; j < length; j++) {
      if (val === array[j]) {
        marks[i] = marks[j] = false;
      }
    }
  }
  return marks;
}

// console.log('checkArray', checkArray([1, 2, 3, 4, 5, 6, 7, 8, 9]));
// console.log('checkArray', checkArray([3, 2, 2, 1, 5, 6, 7, 8, 9]));
// console.log('checkArray', checkArray([1, 2, 2, 4, 5, 6, 9, 8, 9]));

module.exports = checkArray;
