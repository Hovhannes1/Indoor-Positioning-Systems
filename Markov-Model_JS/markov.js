class Cell {
  constructor(_nb = 0, _stat = 0) {
    this.nb = _nb;
    this.stat = _stat;
  }

  toString() {
    return "| [ " + this.nb + " , " + Math.round(this.stat * 100) + "%, ";
  }
}

let NBLINES = 5;
let NBCOLUMNS = 6;
let HMM = [...Array(NBLINES)].map(() => new Array(NBCOLUMNS));
let MM = [...Array(NBLINES)].map(() => new Array(NBCOLUMNS));
let separator = "|-------------------------";
let result = "";

function main() {
  let prev = 0,
    curr = 0,
    nextPage = -1;
  let w = [1, 2, 3, 1, 2, 1, 4, 2, 1, 4, 1, 2, 0, 1, 2, 1, 3, 2];

  for (let i = 0; i < NBLINES; ++i) {
    for (let j = 0; j < NBCOLUMNS; ++j) {
      HMM[i][j] = new Cell(0, 0);
      MM[i][j] = new Cell(0, 0);
    }
  }
  let it = 0;
  while (it != w.length - 1) {
    result += "Currently on: " + (prev == -1 ? "BEGINNING" : curr) + "\n";
    nextPage = w[it];
    result +=
      "We are moving to (to exit the program press " +
      NBLINES +
      ") :" +
      nextPage +
      "\n";

    let startTime = Date.now();

    while (nextPage < 0 || nextPage >= NBLINES) {
      if (nextPage == NBLINES) {
        result += "Exit of program" + "\n";
        break;
      }
      result +=
        "We are moving to (to exit the program press " + NBLINES + ") :" + "\n";
    }
    prev = curr;
    curr = nextPage;

    let max_ind_from = 0,
      stat = 0;
    for (let i = 0; i < NBLINES; ++i) {
      if (MM[i][curr].stat > stat) {
        max_ind_from = i;
        stat = MM[i][curr].stat;
      }
    }
    result += "Most likely from: " + max_ind_from + "\n";

    HMM[prev][curr].nb += 1;
    HMM[prev][NBCOLUMNS - 1].nb += 1;
    for (let i = 0; i < NBCOLUMNS; ++i) {
      HMM[prev][i].stat = HMM[prev][i].nb / HMM[prev][NBCOLUMNS - 1].nb;
    }
    MM[prev][curr].nb += 1;
    MM[curr][NBCOLUMNS - 1].nb += 1;
    for (let i = 0; i < NBLINES; ++i) {
      MM[i][curr].stat = MM[i][curr].nb / MM[curr][NBCOLUMNS - 1].nb;
    }

    prletResults();

    result += "Where is likely to go? ";
    let max_ind = 0;
    stat = 0;
    for (let i = 0; i < NBCOLUMNS - 1; ++i) {
      if (HMM[curr][i].stat > stat) {
        max_ind = i;
        stat = HMM[curr][i].stat;
      }
    }

    result += max_ind + "\n";

    let endTime = Date.now();
    let duration = endTime - startTime;
    result += "Duration: " + duration + "ms\n" + "\n";
    ++it;
  }
}

function prletLine(n, length) {
  let i;
  for (i = 0; i < length; ++i) {
    result += " ";
  }
  for (i = 0; i < n; ++i) {
    result += separator;
  }
  result += "|";
}

function prletResults() {
  let i, j;
  let prev = "Previous page: 0";
  for (let k = 0; k < prev.length; ++k) {
    result += " ";
  }
  for (i = 0; i < NBCOLUMNS - 1; ++i) {
    title = new String("  Current page: " + i);
    let len = Math.abs(separator.length - title.length);

    for (let k = 0; k < len; k++) {
      title += " ";
    }

    result += title;
  }
  result += "Total :\n";

  for (i = 0; i < NBLINES; ++i) {
    prev = "Previous page: " + i;
    prletLine(NBCOLUMNS, prev.length);
    result += "\n";

    for (j = 0; j < NBCOLUMNS; ++j) {
      if (j == 0) {
        result += prev;
      }
      let content = new String(HMM[i][j].toString());
      content += String(Math.round(MM[i][j].stat * 100)) + "%]";
      if (j == NBCOLUMNS - 1) {
        content = new String(" " + HMM[i][j].nb);
      }
      let l = content.length;
      for (let k = 0; k < Math.abs(l - separator.length); ++k) {
        content += " ";
      }
      result += content;
    }
    result += "|" + "\n";
  }
  prletLine(NBCOLUMNS, prev.length);
  result += "\n";
  
}

function runByClick() {
  main();
  let bodyHtml = document.getElementById('body');
  bodyHtml.innerHTML = result;
}

main();
console.log(result);
