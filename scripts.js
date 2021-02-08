////////////
// Constants
////////////
const GRID_ROW = 5;
const GRID_COL = 5;
const GRID_SIZE = GRID_ROW * GRID_COL;

const P1_G = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const P2_G = [6, 7, 8, 9, 10, 11, 12, 13, 14];
const P1_B = [14, 15, 16];
const P2_B = [0, 16, 24];

const COLORS = ["beige", "green", "black"];
const SEED_LENGTH = 6;

// LCG using GCC's constants
const M = 0x80000000; // 2**31;
const A = 1103515245;
const C = 12345;


////////
// Utils
////////
let f = (x, a, c, m) => (x * A + C) % M;
let stringToSeed = function(seed) {
    let x = 1;
    for (let i = 0; i < seed.length; i++) {
        x = f(x * seed.charCodeAt(i));
    }
    return x;
};
let getRandomSeed = function() {
    let getRandomLetter = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));

    let letters = new Array(SEED_LENGTH).fill().map(getRandomLetter);
    return letters.join("");
};



///////////////////////
// Pseudo RNG functions
///////////////////////
RNG = function(seed) {
    this.state = seed ? seed : Math.floor(Math.random() * (M - 1));
};
RNG.prototype.nextInt = function() {
    this.state = f(this.state);
    return this.state;
};
RNG.prototype.nextFloat = function() {
    // returns in range [0,1]
    return this.nextInt() / (M - 1);
};
RNG.prototype.nextRange = function(start, end) {
    // returns in range [start, end): including start, excluding end
    // can't modulu nextInt because of weak randomness in lower bits
    let rangeSize = end - start;
    let randomUnder1 = this.nextInt() / M;
    return start + Math.floor(randomUnder1 * rangeSize);
};
/* Randomize array in-place using Durstenfeld shuffle algorithm */
RNG.prototype.shuffleArray = function(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = this.nextRange(0, i + 1);
        [arr[i], arr[j]] = [arr[i], arr[j]] = [arr[j], arr[i]];
    }
};


////////////////////////////////////////////
// Main functions connected to the HTML view
////////////////////////////////////////////
let board = document.getElementById("board");
let seedInput = document.getElementById("seed-input");
let seedButton = document.getElementById("seed-button");

let updateFields = function() {
    board.innerHTML = "";

    for (let i = 0; i < GRID_SIZE; i++) {
        board.innerHTML += '<div class="field" style="background-color:' + COLORS[fields1[i]] + ';"></div>';
    }
};

let randomizeFields = function(seed) {
    let rng = new RNG(stringToSeed(seed));

    fields1 = new Array(GRID_SIZE).fill(0);
    fields2 = new Array(GRID_SIZE).fill(0);

    let ids = new Array(GRID_SIZE).fill().map((_, i) => i);
    rng.shuffleArray(ids);

    // Setup the board
    // Field values: N = 0 = neutral, G = 1 = good, B = 2 = bad
    // We assign the values according to the shuffled ids, as below:
    // P1 - 9xG, 5xN, 3xB, 8xN
    // P2 - 1xB, 5xN, 9xG, 1xN, 1xB, 7xN, 1xB
    // 0s are already assigned, we only need to do the 1s and 2s
    for (let i = 0; i < 9; i++) {
        fields1[ids[P1_G[i]]] = 1;
        fields2[ids[P2_G[i]]] = 1;
    }
    for (let i = 0; i < 3; i++) {
        fields1[ids[P1_B[i]]] = 2;
        fields2[ids[P2_B[i]]] = 2;
    }

    updateFields();
};

let updateSeed = e => randomizeFields(e.target.value);
let randomizeSeed = function() {
    seed = getRandomSeed();
    seedInput.value = seed;
    randomizeFields(seed);
};


//////////////////////////////////
// Code executed at initialization
//////////////////////////////////
randomizeSeed();

seedInput.addEventListener('input', updateSeed);
seedButton.addEventListener('click', randomizeSeed);
