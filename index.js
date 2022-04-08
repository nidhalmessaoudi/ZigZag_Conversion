class ZigZagElement {
  xAxis;
  yAxis;
  value;

  constructor(numOfRows, lastEl, value) {
    this.value = value;
    if (!lastEl) {
      this.xAxis = 1;
      this.yAxis = 1;
      return;
    }

    if (
      (lastEl.xAxis === 1 ||
        lastEl.xAxis === numOfRows ||
        lastEl.xAxis % (numOfRows - 1) === 1 ||
        lastEl.yAxis === 1) &&
      lastEl.yAxis < numOfRows
    ) {
      this.yAxis = lastEl.yAxis + 1;
      this.xAxis = lastEl.xAxis;
      return;
    }

    this.yAxis = lastEl.yAxis - 1;
    this.xAxis = lastEl.xAxis + 1;
  }
}

/**
 * @param {string} str
 * @param {number} numOfRows
 * @return {string}
 */
const convert = function (str, numOfRows) {
  const zigZagElsArr = [];
  let lastZigZagEl = null;
  for (let i = 0; i < str.length; i++) {
    lastZigZagEl = new ZigZagElement(numOfRows, lastZigZagEl, str[i]);
    zigZagElsArr.push(lastZigZagEl);
  }

  const maxRowLength = lastZigZagEl.xAxis;

  let convertedStrArr = [];
  for (let i = 1; i <= numOfRows; i++) {
    let rowStr = " ".repeat(maxRowLength);
    let secondRowStr = "";

    zigZagElsArr.forEach((el) => {
      if (el.yAxis === i) {
        rowStr =
          rowStr.substring(0, el.xAxis - 1) +
          el.value +
          rowStr.substring(el.xAxis - 1 + el.value.length);
        secondRowStr = secondRowStr + el.value;
      }
    });
    convertedStrArr.push(secondRowStr);

    console.log(rowStr);
  }

  return convertedStrArr.join("");
};

convert("thedivisionbell", 5);
