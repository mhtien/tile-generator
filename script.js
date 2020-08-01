// target generate button
const generateBtn = document.getElementsByClassName("generate-btn")[0];

// target add colour button
const addColorBtn = document.getElementsByClassName("add-color-btn")[0];

// target remove colour button
const removeColorBtn = document.getElementsByClassName("remove-color-btn")[0];

// targets colour palette
const colorPalette = document.querySelector("form");

// targets tile grid div container
let tileGrid = document.getElementsByClassName("tile-grid")[0];

// targets types of generating grid
let randomBtn = document.getElementById("randomise");
let notAdjacentBtn = document.getElementById("not-adjacent");

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
  let colourPickers = colorPalette.querySelectorAll(".color-picker");
  let currentNumOfPickers = colourPickers.length;
  colourPickers[currentNumOfPickers - 1].insertAdjacentElement(
    "afterend",
    newColor
  );
}

// removing colour picker
function removeColor() {
  if (colorPalette.childElementCount > 1) {
    colorPalette.lastChild.remove();
  } else {
    // need to add text to be revealed eventually
    alert("you need atleast one color!");
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
// function checkLeftTileColor() {

//     for (let k = 0; k < possibleColors.length; k++) {
//         if (tileGrid.children[i].children[j - 1].classList.contains(possibleColors[k])) {
//             possibleColors.splice(k, 1);
//         }
//     }
// }

// function checkAboveTileColor() {
//     for (let k = 0; k < colorRangeClass.length; k++) {
//         // target color of tile above
//         if (tileGrid.children[i - 1].children[j].classList.contains(possibleColors[k])) {
//             possibleColors.splice(k, 1);
//         }
//     }
// }

// initial tile grid
createGrid();

// event listeners
generateBtn.addEventListener("click", (event) => {
  event.preventDefault();
  createGrid();
});
addColorBtn.addEventListener("click", addColor);
removeColorBtn.addEventListener("click", removeColor);
