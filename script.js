// target generate button
const generateBtn = document.getElementsByClassName("generate-btn")[0];

// target add colour button
const addColorBtn = document.getElementsByClassName("add-color-btn")[0];

// target remove colour button
const removeColorBtn = document.getElementsByClassName("remove-color-btn")[0];

// targets colour palette
const colorPalette = document.getElementsByClassName("color-palette")[0];

// targets tile grid div container
let tileGrid = document.getElementsByClassName("tile-grid")[0];

// targets types of generating grid
let randomBtn = document.getElementById("randomise");
let notAdjacentBtn = document.getElementById("not-adjacent");

// creating new tiles 
function addTiles() {
    let newTile = document.createElement("div");
    newTile.setAttribute("class", "tile");
    tileGrid.appendChild(newTile);
}

// adding additional colour picker
function addColor() {
    let newColor = document.createElement("div");
    newColor.setAttribute("class", "color-picker");
    newColor.setAttribute("oninput", "showHexColor(event)");

    let newLabel = document.createElement("label");
    newLabel.innerHTML = "Tile Colour:";

    let newColorPicker = document.createElement("input");
    newColorPicker.setAttribute("class", "color-input");
    newColorPicker.setAttribute("type", "color");
    newColorPicker.setAttribute("value", "#c0c0c0");

    newColor.appendChild(newLabel);
    newColor.appendChild(newColorPicker);

    colorPalette.appendChild(newColor);
}

// removing colour picker
function removeColor() {
    if (colorPalette.childElementCount > 1) {
        colorPalette.lastChild.remove();
    } else {
        // need to add text to be revealed eventually
        alert("you need atleast one color!")
    }
}

// color picker value to show above color picker
function showHexColor(event) {
    let currentTarget = event.currentTarget;
    let colorValue = currentTarget.children[1].value;
    currentTarget.children[0].innerText = colorValue;
}

// creating the grid and filling with tiles
function createGrid() {

    // create grid
    let rowNumber = document.getElementsByClassName("row-input")[0].value;
    let columnNumber = document.getElementsByClassName("column-input")[0].value;
    let totalTiles = rowNumber * columnNumber;

    // adding styling to grid - HTML
    let rowWidth = rowNumber * 22 + "px";
    tileGrid.style.width = rowWidth;

    // clearing any existing tiles
    while (tileGrid.firstChild) {
        tileGrid.firstChild.remove();
    }
    // adding new total of tiles
    for (let i = 0; i < totalTiles; i++) {
        addTiles();
    }

    assignColors();
}

function randomiseBtnPress() {
    if (randomBtn.checked === true) {
        notAdjacentBtn.checked = false;
    } else {
        notAdjacentBtn.checked = true;
    }
}
function notAdjacentBtnPress() {
    if (notAdjacentBtn.checked === true) {
        randomBtn.checked = false;
    } else {
        randomBtn.checked = true;
    }
}

function randomInteger(num) {
    return Math.floor(Math.random()*num);
}


// obtaining colour values
function assignColors() {
    // getting the colours from picker
    let colorRange = document.getElementsByClassName("color-input");
    let colorValues = [];

    // pushing colour values into array
    for (let i = 0; i < colorRange.length; i++) {
        colorValues.push(colorRange[i].value);
    }

    // defining array length
    let arrayLength = colorValues.length;

    // if randomise radio checked
    if (randomBtn.checked === true) {
        // assigning random colour to tiles
        for (let i = 0; i < tileGrid.childElementCount; i++) {
            // get random colour
            let randomColor = colorValues[randomInteger(arrayLength)];
            tileGrid.children[i].style.backgroundColor = randomColor;
        }
    }
    // // if not adjacent radio checked
    // removing array element by value
    let possibleColors = [...colorValue];
    let removeColor = "value";
    possibleColors.splice(removeColor,1)

    if (notAdjacentBtnPress === true) {
        for (let i = 0; i < tileGrid.childElementCount; i++) {
            // get random colour
            let randomColor = colorValues[randomInteger(arrayLength)];
            tileGrid.children[i].style.backgroundColor = randomColor;

            if (i > 0) {
                let x = tileGrid.children[i].style.backgroundColor;
                let y = tileGrid.children[i - 1].style.backgroundColor
                if (x === y) {
                    let randomColor = colorValues[randomInteger(arrayLength)]
                    tileGrid.children[i].style.backgroundColor = randomColor;
                }
            }

        }
    }
}
// initial tile grid
createGrid();


// event listeners
generateBtn.addEventListener("click", createGrid);
addColorBtn.addEventListener("click", addColor);
removeColorBtn.addEventListener("click", removeColor);

randomBtn.addEventListener("click", randomiseBtnPress);
notAdjacentBtn.addEventListener("click", notAdjacentBtnPress);