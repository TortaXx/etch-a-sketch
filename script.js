function generateDivs(count) {
    if (count > 100) {
        console.log("Maximum is 100x100 pixels");
        return;
    }
    const drawArea = document.querySelector(".drawing");
    drawArea.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
    drawArea.style.gridTemplateRows = `repeat(${count}, 1fr)`;

    for (let i = 0; i < count * count; i++) {
        let pixel = document.createElement("div");
        pixel.classList.add("pixel");
        drawArea.appendChild(pixel);
    }
}


function draw() {
    let color = "black";
    let drag = false;
    let rainbow = false;
    let eraser = false; 

    const clearBtn = document.querySelector("#clear");
    const colorBtn = document.querySelector("#color");
    const eraserBtn = document.querySelector("#eraser");
    const rainbowBtn = document.querySelector("#rainbow");
    const pixels = document.querySelectorAll(".pixel");
    
    document.addEventListener("mousedown", () => drag = true);
    document.addEventListener("mouseup", () => drag = false);

    clearBtn.addEventListener("click", () => clear(pixels));
    eraserBtn.addEventListener("click", () => eraser = !eraser);
    rainbowBtn.addEventListener("click", () => {
        eraser = false;
        rainbow = !rainbow;
    });

    ["click", "change"].forEach(evt => {
        colorBtn.addEventListener(evt, () => {
            color = colorBtn.value;
            rainbow = false;
            eraser = false;
        });
    });

    for (const pixel of pixels) {
        pixel.addEventListener("mouseover", () => {
            if (drag) setPixelColor(pixel, rainbow, eraser, color);
        });
    }
}


function setPixelColor(pixel, rainbow, eraser, color) {
    if (eraser) {
        color = "white";
    } else if (rainbow) {
        color = getRandomColor();
    }
    pixel.style.backgroundColor = color;
}


function clear(pixels) {
    pixels.forEach(pixel =>{
        pixel.style.backgroundColor = "white";
    });
}


function getRandomColor() {    
    let color = "#"
    const possible = "0123456789ABCDEF";
    for (let i = 0; i< 6; i++) {
        color += possible[Math.floor(Math.random() * 16)];
    }
    return color;
}

function removePixels() {
    const pixels = document.querySelectorAll(".pixel");
    for (let pixel of pixels) {
        pixel.remove();
    }
}

function changeSliderDisplay(value) {
    const sliderVal = document.querySelector(".slider-value");
    sliderVal.textContent = `${value}x${value}`;
    
}

function main() {
    const slider = document.querySelector(".slider");
    generateDivs(Number(slider.value));
    draw();

    slider.addEventListener("input", () => {
        removePixels();
        generateDivs(Number(slider.value));
        changeSliderDisplay(slider.value);
        draw();
    });
}

const sliderVal = document.querySelector(".slider-value");
console.log(sliderVal.textContent);

main();