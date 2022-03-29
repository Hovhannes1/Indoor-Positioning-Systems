class Position {
    constructor( x,  y,  z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }
    
    getX() {
        return this.x;
    }
    
    getY() {
        return this.y;
    }
    
    getZ() {
        return this.z;
    }
}

class Emitter {
    constructor( p,  d) {
        this.pos = p;
        this.d = d;
    }
    
    getD() {
        return this.d;
    }
    
    getX() {
        return this.pos.getX();
    }
    
    getY() {
        return this.pos.getY();
    }
    
    getZ() {
        return this.pos.getZ();
    }
}

function createEmitters(coords, distances) {
    res = [];
    for (let i = 0; i < distances.length; ++i) {
        res[i] = new Emitter(new Position(coords[i * 3], coords[i * 3 + 1], coords[i * 3 + 2]), distances[i]);
    }
    return res;
}

function distance( p,  x,  y,  z) {
    return Math.sqrt(Math.pow(p.getX() - x, 2) + Math.pow(p.getY() - y, 2) + Math.pow(p.getZ() - z, 2));
}


xMin = Number.MAX_VALUE, xMax = 0, yMin = Number.MAX_VALUE, yMax = 0, zMin = Number.MAX_VALUE, zMax = 0;
p = new Position();
dMin = Number.MAX_VALUE;
emitters = createEmitters([
    0.5, 0.5, 0.5,
    4, 0, 0,
    4, 5, 5,
    3, 3, 3], [3, 2, 4.2, 2.5]);

function findMobileCords() {
    for (let e of emitters) {
         c_xMin = e.getX() - e.getD();
         c_xMax = e.getX() + e.getD();
    
         c_yMin = e.getY() - e.getD();
         c_yMax = e.getY() + e.getD();
    
         c_zMin = e.getZ() - e.getD();
         c_zMax = e.getZ() + e.getD();
    
        if (c_xMin < xMin) {
            xMin = c_xMin;
        }
        if (c_xMax > xMax) {
            xMax = c_xMax;
        }
    
        if (c_yMin < yMin) {
            yMin = c_yMin;
        }
    
        if (c_yMax > yMax) {
            yMax = c_yMax;
        }
    
        if (c_zMin < zMin) {
            zMin = c_zMin;
        }
    
        if (c_zMax > zMax) {
            zMax = c_zMax;
        }
    }
    
    
    let startTime = Date.now();
    
    let step = 0.1;
    let d;
    for (let i = xMin; i <= xMax; i += step) {
        for (let j = yMin; j <= yMax; j += step) {
            for (let k = zMin; k <= zMax; k += step) {
                d = 0;
                for (let e of emitters) {
                    d += Math.abs(distance(e.pos, i, j, k) - e.getD());
                }
                if (d < dMin) {
                    dMin = d;
                    p = new Position(i, j, k);
                }
    
            }
    
        }
    }
    let endTime = Date.now();
    
    let duration = (endTime - startTime);
    console.log("x: " + p.getX() + " y: " + p.getY() + " z: " + p.getZ() + "  \n Duration: " + duration / 1000);

}

findMobileCords();