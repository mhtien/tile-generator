// targets colour palette
const form = document.querySelector("form");

// target generate button
const generateBtn = document.querySelector(".generate-btn");

// target add colour button
const addColorBtn = document.querySelector(".color__btn__add");

// target remove colour button
const removeColorBtn = document.querySelector(".color__btn__remove");

// target tile shapes radio button
const rectangleTileOption = document.querySelector("input[id='tile-rectangle']");
const squareTileOption = document.querySelector("input[id='tile-square']");

// targets tile grid div container
let tileGrid = document.querySelector(".tile-generator__grid");

// targets types of generating grid
let randomBtn = document.querySelector("#randomise");
let notAdjacentBtn = document.querySelector("#not-adjacent");

// targetting template
let template = document.querySelector("template");
let templateContent = template.content;

function cloneFragment() {
  return (cloneDocumentFragment = templateContent.cloneNode(true));
}

// creating new tiles
function addTiles(event) {
  cloneFragment();
  let newTile = cloneDocumentFragment.querySelector(".tile");
  event.appendChild(newTile);
}

function addNewRow(event) {
  // targets row number
  let columnNumber = document.querySelector(".column-input").value;

  cloneFragment();
  let newRow = cloneDocumentFragment.querySelector(".row-container");
  let i = 0;
  do {
    addTiles(newRow);
    i++;
  } while (i < columnNumber);

  event.appendChild(newRow);
}

// adding additional colour picker
function addColor() {
  cloneFragment();
  let newColor = cloneDocumentFragment.querySelector(".color-picker");
  let colorPickerContainer = document.querySelector(".color-picker-container");
  colorPickerContainer.appendChild(newColor);
}

// removing last colour picker
function removeColor() {
  let colourPickers = form.querySelectorAll(".color-picker");
  let colorPickerContainer = document.querySelector(".color-picker-container");
  if (colourPickers.length > 1) {
    colorPickerContainer.lastChild.remove();
  } else {
    // need to add text to be revealed eventually
    alert("you need atleast one colour!");
  }
}

// color picker value to show above color picker
function showHexColor(event) {
  let currentTarget = event.currentTarget;
  let colorValue = currentTarget.querySelector("input").value;
  currentTarget.querySelector("label").textContent = colorValue;
}


// Tile Shape
function showWidthInput (event) {
  let tileWidthInput = document.querySelector("input[id='tile-width']");
  if (event.target.id === "tile-rectangle") {
    tileWidthInput.classList.remove("hidden");
  } else {
    tileWidthInput.classList.add("hidden");
  }
}

function tileType () {
  let tileHeight = document.querySelector("input[id='tile-height']").value;
  let tileWidth = document.querySelector("input[id='tile-width']").value;

  let rectangleChecked = document.querySelector("input[id='tile-rectangle']").checked;
  if (tileHeight === "" || "0") {
    tileHeight = 300
  }

  if (tileWidth === "" || "0") {
    tileWidth = 300
  }
    // inserting html in style
  let styleTile = document.getElementById("style__tiletype");

  const scales = document.querySelectorAll("input[name='tile-scale']");
  const scalesArray = [...scales];
  const filterScale = scalesArray.filter(scale => scale.checked);
  const fixedScale = Number(filterScale[0].value);
  tileHeight /= fixedScale;
  tileWidth /= fixedScale;

  if (rectangleChecked) {
      styleTile.innerHTML = 
    `.tile {
        height: ${tileHeight}mm;
        width: ${tileWidth}mm
      }`
  } else {
     styleTile.innerHTML = 
    `.tile {
        height: ${tileHeight}mm;
        width: ${tileHeight}mm
      }`
  }

}



// creating the grid and filling with tiles
function createGrid() {
  // targets column number
  let rowNumber = document.querySelector(".row-input").value;

  // clearing any existing tiles
  while (tileGrid.firstChild) {
    tileGrid.firstChild.remove();
  }

  // adding rows to create grid
  let i = 0;
  do {
    addNewRow(tileGrid);
    i++;
  } while (i < rowNumber);

  addColoursAsCSSClass();

  if (randomBtn.checked === true) {
    assignRandomColors();
  }

  if (notAdjacentBtn.checked === true) {
    assignNotAdjacentColors();
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
  let styleColor = document.getElementById("style__colors");
  styleColor.innerHTML = "";

  // assigning new styles to classes
  for (let i = 0; i < colorValues.length; i++) {
    styleColor.insertAdjacentHTML(
      "beforeend",
      `.tile-color${i} {background-color:${colorValues[i]}}`
    );
  }
}
// obtaining colour values
function assignRandomColors() {
  // getting the colours from picker
  let colorRange = document.getElementsByClassName("color-input");
  let colorRangeClass = [];
  // pushing class value names into array
  for (let i = 0; i < colorRange.length; i++) {
    colorRangeClass.push(`tile-color${i}`);
  }

  // looping through the row containers and assign colours by class
  for (let i = 0; i < tileGrid.childElementCount; i++) {
    for (let j = 0; j < tileGrid.children[0].childElementCount; j++) {
      let randomColor = colorRangeClass[randomInteger(colorRangeClass.length)];
      tileGrid.children[i].children[j].classList.add("class", randomColor);
    }
  }
}

// This currently needs updating
function assignNotAdjacentColors() {
  // getting the colours from picker
  let colorRange = document.getElementsByClassName("color-input");
  let colorRangeClass = [];
  // pushing class value names into array
  for (let i = 0; i < colorRange.length; i++) {
    colorRangeClass.push(`tile-color${i}`);
  }
  // removing array element by value
  for (let i = 0; i < tileGrid.childElementCount; i++) {
    for (let j = 0; j < tileGrid.children[0].childElementCount; j++) {
      if (i === 0 && j === 0) {
        let randomColor =
          colorRangeClass[randomInteger(colorRangeClass.length)];
        tileGrid.children[i].children[j].classList.add("class", randomColor);
      }
      if (i === 0 && j > 0) {
        let possibleColors = [...colorRangeClass];
        // targets the color of previous tile
        for (let k = 0; k < possibleColors.length; k++) {
          if (
            tileGrid.children[i].children[j - 1].classList.contains(
              possibleColors[k]
            )
          ) {
            possibleColors.splice(k, 1);
          }
        }
        // random color that does not include previous tile color
        let randomColor = possibleColors[randomInteger(possibleColors.length)];
        tileGrid.children[i].children[j].classList.add("class", randomColor);
      }
      if (i > 0 && j === 0) {
        let possibleColors = [...colorRangeClass];

        for (let k = 0; k < possibleColors.length; k++) {
          // target color of tile above
          if (
            tileGrid.children[i - 1].children[j].classList.contains(
              possibleColors[k]
            )
          ) {
            possibleColors.splice(k, 1);
          }
        }
        // random color that does not include previous tile color
        let randomColor = possibleColors[randomInteger(possibleColors.length)];
        tileGrid.children[i].children[j].classList.add("class", randomColor);
      }

      // to check left and above tiles
      if (i > 0 && j > 0) {
        let possibleColors = [...colorRangeClass];

        for (let k = 0; k < possibleColors.length; k++) {
          // targets the color of previous tile
          if (
            tileGrid.children[i].children[j - 1].classList.contains(
              possibleColors[k]
            )
          ) {
            possibleColors.splice(k, 1);
          }
        }

        // target color of tile above
        for (let m = 0; m < possibleColors.length; m++) {
          if (
            tileGrid.children[i - 1].children[j].classList.contains(
              possibleColors[m]
            )
          ) {
            possibleColors.splice(m, 1);
          }
        }

        // random color that does not include previous tile color
        let randomColor = possibleColors[randomInteger(possibleColors.length)];
        tileGrid.children[i].children[j].classList.add("class", randomColor);
      }
    }
  }
}

// initial tile grid
createGrid();

// event listeners
generateBtn.addEventListener("click", (event) => {
  event.preventDefault();
  createGrid();
  tileType();
});
addColorBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addColor();
});
removeColorBtn.addEventListener("click", (event) => {
  event.preventDefault();
  removeColor();
});
rectangleTileOption.addEventListener("click", showWidthInput);
squareTileOption.addEventListener("click", showWidthInput)