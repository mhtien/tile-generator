// targets colour palette
const form = document.querySelector("form");

// target generate button
const generateBtn = document.querySelector(".generate-btn");

// target add colour button
const addColorBtn = document.querySelector(".add-color-btn");

// target remove colour button
const removeColorBtn = document.querySelector(".remove-color-btn");

// targets tile grid div container
let tileGrid = document.querySelector(".tile-grid");

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
  let rowNumber = document.querySelector(".row-input").value;

  cloneFragment();
  let newRow = cloneDocumentFragment.querySelector(".row-container");
  let i = 0;
  do {
    addTiles(newRow);
    i++;
  } while (i < rowNumber);

  event.appendChild(newRow);
}

// adding additional colour picker
function addColor() {
  cloneFragment();
  let newColor = cloneDocumentFragment.querySelector(".color-picker");
  let colourPickers = form.querySelectorAll(".color-picker");
  let currentNumOfPickers = colourPickers.length - 1;
  let lastColorPicker = colourPickers[currentNumOfPickers];
  lastColorPicker.insertAdjacentElement("afterend", newColor);
}

// removing last colour picker
function removeColor() {
  let colourPickers = form.querySelectorAll(".color-picker");
  let currentNumOfPickers = colourPickers.length - 1;
  let lastColorPicker = colourPickers[currentNumOfPickers];
  if (colourPickers.length > 1) {
    lastColorPicker.remove();
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

// creating the grid and filling with tiles
function createGrid() {
  // targets column number
  let columnNumber = document.querySelector(".column-input").value;

  // clearing any existing tiles
  while (tileGrid.firstChild) {
    tileGrid.firstChild.remove();
  }

  // adding rows to create grid
  let i = 0;
  do {
    addNewRow(tileGrid);
    i++;
  } while (i < columnNumber);

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
  let style = document.getElementById("style");
  style.innerHTML = "";

  // assigning new styles to classes
  for (let i = 0; i < colorValues.length; i++) {
    style.insertAdjacentHTML(
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
});
addColorBtn.addEventListener("click", addColor);
removeColorBtn.addEventListener("click", removeColor);
