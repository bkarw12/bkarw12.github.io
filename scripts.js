let GRID_ROW = 5;
let GRID_COL = 5;
let SEED_LENGTH = 4;

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
