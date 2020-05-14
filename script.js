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
    let rowWidth = rowNumber * 20 + "px";
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


// obtaining colour values
function assignColors() {
    // getting the colours from picker
    let colorRange = document.getElementsByClassName("color-input");
    let colorValues = [];

    for (let i = 0; i < colorRange.length; i++) {
        colorValues.push(colorRange[i].value);
    }

    // assigning random colour to tiles
    for (let i = 0; i < tileGrid.childElementCount; i++) {
        // get random colour
        let randomColor = colorValues[Math.floor(Math.random() * Math.floor(colorValues.length))]
        tileGrid.children[i].style.backgroundColor = randomColor
    }
}
// initial tile grid
createGrid();

// event listeners
generateBtn.addEventListener("click", createGrid);
addColorBtn.addEventListener("click", addColor);
removeColorBtn.addEventListener("click", removeColor);