let GRID_ROW = 5;
let GRID_COL = 5;
let SEED_LENGTH = 4;


let RNG = seed => {
    // LCG using GCC's constants
    this.m = 0x80000000; // 2**31;
    this.a = 1103515245;
    this.c = 12345;

    this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
}

RNG.prototype.nextInt = () => {
    this.state = (this.a * this.state + this.c) % this.m;
    return this.state;
}

RNG.prototype.stringToSeed = () => {

}


let container = document.getElementById("container");
let fields = new Array(GRID_ROW * GRID_COL);

let updateFields = () => {
    container.innerHTML = "";
};

let randomizeFields = seed => {

};

let getRandomSeed = function() {
    let getRandomLetter = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));

    let letters = new Array(SEED_LENGTH).fill().map(getRandomLetter);
    return letters.join("");
};
