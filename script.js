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
function addTiles(event) {
    let newTile = document.createElement("div");
    newTile.setAttribute("class", "tile");
    event.appendChild(newTile);
}

function addNewRow(event) {
    // targets row number
    let rowNumber = document.getElementsByClassName("row-input")[0].value;

    let newRow = document.createElement("div");
    newRow.setAttribute("class", "row-container");
    let i = 0;
    do {
        addTiles(newRow);
        i++;
    }
    while (i < rowNumber);

    event.appendChild(newRow);

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

    // targets column number
    let columnNumber = document.getElementsByClassName("column-input")[0].value;

    // clearing any existing tiles
    while (tileGrid.firstChild) {
        tileGrid.firstChild.remove();
    }

    // adding rows to create grid
    let i = 0;
    do {
        addNewRow(tileGrid);
        i++;
    }

    while (i < columnNumber);

    addColoursAsCSSClass();

    if (randomBtn.checked === true) {
        assignRandomColors();
    }

    if (notAdjacentBtn.checked === true) {
        assignNotAdjacentColors();
    }

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
    return Math.floor(Math.random() * num);
}

function addColoursAsCSSClass() {
    // getting the colours from picker
    let colorRange = document.getElementsByClassName("color-input");
    let colorValues = [];

    // pushing colour values into array
    for (let i = 0; i < colorRange.length; i++) {
        colorValues.push(colorRange[i].value);
    }

    // clearing any html in style
    let style = document.getElementById("style");
    style.innerHTML = "";

    // assigning new styles to classes
    for (let i=0; i<colorValues.length; i++) {
        style.insertAdjacentHTML('beforeend', `.tile-color${i} {background-color:${colorValues[i]}}`)  
    }

}
// obtaining colour values
function assignRandomColors() {
    // getting the colours from picker
    let colorRange = document.getElementsByClassName("color-input");
    let colorRangeClass = [];
    // pushing class value names into array
    for (let i= 0; i<colorRange.length; i++) {
        colorRangeClass.push(`tile-color${i}`);
    }

    // looping through the row containers and assign colours by class
    for (let i = 0; i < tileGrid.childElementCount; i++) {
        for (let j = 0; j < tileGrid.children[0].childElementCount; j++) {
            let randomColor = colorRangeClass[randomInteger(colorRangeClass.length)];
            tileGrid.children[i].children[j].classList.add("class",randomColor);
        }
    }
}

function assignNotAdjacentColors() {
    // getting the colours from picker
    let colorRange = document.getElementsByClassName("color-input");
    let colorValues = [];

    // pushing colour values into array
    for (let i = 0; i < colorRange.length; i++) {
        colorValues.push(colorRange[i].value);
    }
    // removing array element by value
    for (let i = 0; i < tileGrid.childElementCount; i++) {
        for (let j = 0; j < tileGrid.children[0].childElementCount; j++) {
            if (i === 0) {
                if (j === 0) {
                    let randomColor = colorValues[randomInteger(colorValues.length)];
                    tileGrid.children[i].children[j].style.backgroundColor = randomColor;
                } else {
                    let possibleColors = [...colorValues];
                    // targets the color of previous tile
                    let previousColor = tileGrid.children[i].children[j - 1].style.backgroundColor;
                    // targets index of said color in array
                    let previousColorIndex = possibleColors.indexOf(previousColor);
                    // removes color from array
                    possibleColors.splice(previousColorIndex, 1);
                    // random color that does nto include previous tile color
                    let randomColor = colorValues[randomInteger(possibleColors.length)];
                    tileGrid.children[i].children[j].style.backgroundColor = randomColor;
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