class Cell {
    constructor(tpr) {
        this.tpr = tpr;
    }

    sum() {
        return this.tpr.reduce((a, b) => a + b, 0);
    }
}

class Coordinate {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function dist(TM, fingerprints) {
    let d = 0;
    for (let i = 0; i < fingerprints.length; ++i) {
        d += Math.abs(TM.tpr[i] - fingerprints[i]);
    }
    return d;
}

function fingerprint() {
    const K = 4;

    let startTime = Date.now();

    let tf = [[],[],[]];

    tf[0][0] = new Cell([-38,-27,-54,-13]);
    tf[0][1] = new Cell([-74,-62,-48,-33]);
    tf[0][2] = new Cell([-13,-28,-12,-40]);
    tf[1][0] = new Cell([-34,-27,-38,-41]);
    tf[1][1] = new Cell([-64,-48,-72,-35]);
    tf[1][2] = new Cell([-45,-37,-20,-15]);
    tf[2][0] = new Cell([-17,-50,-44,-33]);
    tf[2][1] = new Cell([-27,-28,-32,-45]);
    tf[2][2] = new Cell([-30,-20,-60,-40]);

    tm = new Cell([-26,-42,-13,-46]);

    kCases = [[],[],[],[]];
  
    listOfEntries = [];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            listOfEntries.push({dist: dist(tm, tf[i][j].tpr), cord: new Coordinate(i,j)});
        }
    }

    listOfEntries.sort((a, b) => a.dist - b.dist)

    for (let a = 0; a < K; a++) {
        kCases[a][0] = 4 * listOfEntries[a].cord.x + 2;
        kCases[a][1] = 4 * listOfEntries[a].cord.y + 2;
    }

    let weights = [];
    let wholeDist = 0;
    for (let i = 0; i < K; i++) {
        wholeDist += 1 / listOfEntries[i].dist;
        weights[i] = 1 / listOfEntries[i].dist;
        console.log(i + "th weight: " + weights[i]);
    }

    let x = 0;
    let y = 0;
    console.log("K neighbors :");
    for (let j = 0; j < K; ++j) {
        x += kCases[j][1] * weights[j] / wholeDist;
        y += kCases[j][0] * weights[j] / wholeDist;
        console.log("(" + kCases[j][1] + ", " + kCases[j][0] + "), Destination: " + listOfEntries[j].dist);
    }
    console.log("Localization: (X :" + x + ", Y " + y + ")");
   
    let endTime = Date.now();
    duration = (endTime - startTime);
    console.log("Duration: " + duration + "ms");
}

fingerprint();