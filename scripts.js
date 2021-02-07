let GRID_ROW = 5;
let GRID_COL = 5;
let SEED_LENGTH = 4;


RNG = function(seed) {
    // LCG using GCC's constants
    this.m = 0x80000000; // 2**31;
    this.a = 1103515245;
    this.c = 12345;

    this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
}
RNG.prototype.f = (x, a, c, m) => (x * a + c) % m;
RNG.prototype.nextInt = function() {
    this.state = this.f(this.state, this.a, this.c, this.m);
    return this.state;
}
RNG.prototype.stringToSeed = function(seed) {
    let x = 1;
    for (let i = 0; i < seed.length; i++) {
        x = this.f(x * seed.charCodeAt(i), this.a, this.c, this.m);
    }
    return x;
}
RNG.prototype.nextFloat = function() {
    // returns in range [0,1]
    return this.nextInt() / (this.m - 1);
  }
  RNG.prototype.nextRange = function(start, end) {
    // returns in range [start, end): including start, excluding end
    // can't modulu nextInt because of weak randomness in lower bits
    var rangeSize = end - start;
    var randomUnder1 = this.nextInt() / this.m;
    return start + Math.floor(randomUnder1 * rangeSize);
  }


let container = document.getElementById("container");
let fields = new Array(GRID_ROW * GRID_COL);

let updateFields = function() {
    container.innerHTML = "";
};

let randomizeFields = function(seed) {

};

let getRandomSeed = function() {
    let getRandomLetter = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));

    let letters = new Array(SEED_LENGTH).fill().map(getRandomLetter);
    return letters.join("");
};
