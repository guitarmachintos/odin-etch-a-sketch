const gridSlider = document.querySelector('#gridSlider');
const sketchContainer = document.querySelector('.sketchContainer');
const sliderValue = document.querySelector('#sliderValue');
const pencilColorPicker = document.querySelector('#pencilColorPicker');
const backgroundColorPicker = document.querySelector('#backgroundColorPicker');
const circlePencilColor = document.querySelector('#circlePencilColor');
const circleBackColor = document.querySelector('#circleBackColor');
const fillButton = document.querySelector('#fillButton')

sliderValue.textContent = gridSlider.value;

const bottomButtons = document.querySelectorAll('.bottomMenu button');

let activeMode = 'pencil';

let totalPixel = gridSlider.value;
let pixelSize = 100 / gridSlider.value;
createGrid(totalPixel, pixelSize);

gridSlider.addEventListener('input', () => {
    sliderValue.textContent = gridSlider.value;
});

gridSlider.addEventListener('mouseup', () => {
    const sliderTemp = document.querySelector('.sliderWrapper');
    sketchContainer.textContent = '';
    sketchContainer.appendChild(sliderTemp);
    totalPixel = gridSlider.value;
    pixelSize = 100 / gridSlider.value;
    createGrid(totalPixel, pixelSize);
});

function createGrid(totalPixel, pixelSize) {
    for (let i = 0; i < totalPixel * totalPixel; i++) {
        const sketchPixel = document.createElement('div');
        sketchPixel.classList.add('sketchPixels');
        sketchPixel.style.border = '1px solid black';
        sketchPixel.style.width = pixelSize + '%';
        sketchPixel.style.height = pixelSize + '%';
        sketchPixel.style.backgroundColor = backgroundColorPicker.value;
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
    if(!e.target.classList.contains('sketchPixels')){
        return;
    }
    colorPixel(activeMode, e.target);
});

sketchContainer.addEventListener('click', (e) => {
    if(!e.target.classList.contains('sketchPixels')){
        return;
    }
    colorPixel(activeMode, e.target);
});

function colorPixel(curMode, targetPixel) {
    switch (curMode) {
        case 'pencil':
            targetPixel.style.backgroundColor = pencilColorPicker.value;
            break;
        
        case 'eraser':
            targetPixel.style.backgroundColor = backgroundColorPicker.value;
            break;
        
        case 'rainbow':
            let randomColor = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
            targetPixel.style.backgroundColor = randomColor;
            break;

        case 'darken':
            targetPixel.style.backgroundColor = darken(targetPixel.style.backgroundColor);
            break;
    
        default:
            break;
    }
}

// Source - https://stackoverflow.com/a/5624139
// Posted by Tim Down, modified by community. See post 'Timeline' for change history
// Retrieved 2026-02-19, License - CC BY-SA 4.0
// function darkenHex(hex) {
//     var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//     result = result.map(e => (('0x'+ e) - 0x19) < 0x00 ? '0x00' :  (('0x'+ e) - 0x19).toString(16));
//     return '#' + result[1] + result[2] + result[3];
// }

function darken(rgb){
    let result = rgb.replace(/[^\d,]/g, '').split(',');
    result = result.map(e => (e - 26) < 0 ? 0 : (e - 26));
    return 'rgb(' + result.join(', ') + ')';
}

pencilColorPicker.addEventListener('input', () => {
    circlePencilColor.style.backgroundColor = pencilColorPicker.value;
});

backgroundColorPicker.addEventListener('input', () => {
    circleBackColor.style.backgroundColor = backgroundColorPicker.value;
});

bottomButtons.forEach(e1 => {
    e1.addEventListener('click', () => {
        for (const button of bottomButtons) {
            button.classList.remove('rotatingBorder');
        }
        e1.classList.add('rotatingBorder');
        activeMode = e1.id.slice(0, -6);        
    });
});

fillButton.addEventListener('click', () => {
    const sketchPixelsArr = document.querySelectorAll('.sketchPixels');
    sketchPixelsArr.forEach(e => e.style.backgroundColor = backgroundColorPicker.value);
});
