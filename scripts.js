let GRID_ROW = 5;
let GRID_COL = 5;
let SEED_LENGTH = 4;

// LCG using GCC's constants
let M = 0x80000000; // 2**31;
let A = 1103515245;
let C = 12345;

f = (x, a, c, m) => (x * A + C) % M;
stringToSeed = function(seed) {
    let x = 1;
    for (let i = 0; i < seed.length; i++) {
        x = f(x * seed.charCodeAt(i));
    }
    return x;
}

RNG = function(seed) {
    this.state = seed ? seed : Math.floor(Math.random() * (M - 1));
}
RNG.prototype.nextInt = function() {
    this.state = f(this.state);
    return this.state;
}
RNG.prototype.nextFloat = function() {
    // returns in range [0,1]
    return this.nextInt() / (M - 1);
  }
RNG.prototype.nextRange = function(start, end) {
    // returns in range [start, end): including start, excluding end
    // can't modulu nextInt because of weak randomness in lower bits
    var rangeSize = end - start;
    var randomUnder1 = this.nextInt() / M;
    return start + Math.floor(randomUnder1 * rangeSize);
}
/* Randomize array in-place using Durstenfeld shuffle algorithm */
RNG.prototype.shuffleArray = function(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = this.nextRange(0, i + 1);
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


let container = document.getElementById("container");
let seedInput = document.getElementById("seed-input");
let seedButton = document.getElementById("seed-button");

let getRandomSeed = function() {
    let getRandomLetter = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));

    let letters = new Array(SEED_LENGTH).fill().map(getRandomLetter);
    return letters.join("");
};

let updateFields = function() {
    container.innerHTML = "";
};

let randomizeFields = function(seed) {
    let rng = new RNG(stringToSeed(seed));

    fields1 = new Array(GRID_ROW * GRID_COL).fill(0);
    fields2 = new Array(GRID_ROW * GRID_COL).fill(0);

    let ids = new Array(GRID_ROW * GRID_COL).fill().map((_, i) => i);
    rng.shuffleArray(ids);

    
};

let updateSeed = e => randomizeFields(e.target.value);
let randomizeSeed = function() {
    seed = getRandomSeed();
    seedInput.value = seed;
    randomizeFields(seed);
};

randomizeSeed();

seedInput.addEventListener('input', updateSeed);
seedButton.addEventListener('click', randomizeSeed);
