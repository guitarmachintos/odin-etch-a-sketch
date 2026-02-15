const gridSlider = document.querySelector('#gridSlider');
const sketchContainer = document.querySelector('.sketchContainer');
const sliderValue = document.querySelector('#sliderValue');
const pencilColorPicker = document.querySelector('#pencilColorPicker');
const backgroundColorPicker = document.querySelector('#backgroundColorPicker');

sliderValue.textContent = gridSlider.value;

// gridSlider.oninput = function() {
// }

let totalPixel = gridSlider.value;
let pixelSize = 100 / gridSlider.value;
createGrid(totalPixel, pixelSize);

gridSlider.addEventListener('input', () => {
    sliderValue.textContent = gridSlider.value;
});

gridSlider.addEventListener('mouseup', () => {
    sketchContainer.textContent = '';
    totalPixel = gridSlider.value;
    pixelSize = 100 / gridSlider.value;
    createGrid(totalPixel, pixelSize);
});

function createGrid(totalPixel, pixelSize) {
    for (let i = 0; i < totalPixel * totalPixel; i++) {
        const sketchPixel = document.createElement('div');
        sketchPixel.style.border = '1px solid black';
        sketchPixel.style.width = pixelSize + '%';
        sketchPixel.style.height = pixelSize + '%';
        // sketchPixel.id = 'pixel' + i;
        sketchContainer.appendChild(sketchPixel);
    }
}

let primaryMouseButtonDown = false;

function setPrimaryButtonState(e) {
    if ('buttons' in e) {
        primaryMouseButtonDown = (e.buttons & 1) === 1;
    } else if ('which' in e) {
        primaryMouseButtonDown = e.which === 1;
    } else {
        // last fallback: button is 0=left,1=middle,2=right
        primaryMouseButtonDown = e.button === 0;
    }
}

document.addEventListener("mousedown", setPrimaryButtonState);
document.addEventListener("mouseup", setPrimaryButtonState);

sketchContainer.addEventListener('mouseover', (e) => {
    if(!primaryMouseButtonDown){
        return;
    }
    if(e.target.classList.contains('sketchContainer')){
        return;
    }
    e.target.style.backgroundColor = 'black';
});

sketchContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('sketchContainer')){
        return;
    }
    e.target.style.backgroundColor = 'black';
});

