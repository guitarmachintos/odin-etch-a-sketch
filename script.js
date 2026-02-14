const gridSlider = document.querySelector('#gridSlider');
const sketchContainer = document.querySelector('.sketchContainer');
const sliderValue = document.querySelector('#sliderValue');

sliderValue.textContent = gridSlider.value;

// gridSlider.oninput = function() {
// }

let totalPixel = gridSlider.value;
let pixelSize = 100 / gridSlider.value;
createGrid(totalPixel, pixelSize);

gridSlider.addEventListener('input', () => {
    sliderValue.textContent = gridSlider.value;
    sketchContainer.textContent = '';
    // createGrid(sketchContainer.offsetWidth);
    // const sketchPixel = document.createElement('div');
    // sketchPixel.style.border = '1px solid black';
    // sketchPixel.style.width = '100' +'px';
    // sketchContainer.appendChild(sketchPixel);
    totalPixel = gridSlider.value;
    pixelSize = 100 / gridSlider.value;
    createGrid(totalPixel, pixelSize);
});

function createGrid(totalPixel, pixelSize) {
    for (let i = 0; i < totalPixel; i++) {
        for (let j = 0; j < totalPixel; j++) {
            const sketchPixel = document.createElement('div');
            sketchPixel.style.border = '1px solid black';
            sketchPixel.style.width = pixelSize + '%';
            sketchPixel.style.height = pixelSize + '%';
            sketchContainer.appendChild(sketchPixel);
        }        
    }
}

