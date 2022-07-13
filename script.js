function generateDivs(count) {
    let size = 100 / count;
    
    const drawArea = document.querySelector(".drawing");

    for (let i = 0; i < count * count; i++) {
        let pixel = document.createElement("div");
        pixel.classList.add("pixel");
        pixel.style.width = `${size}%`;
        pixel.style.height = `${size}%`;
        drawArea.appendChild(pixel);
    }
}



generateDivs(20);
const pixels = document.querySelectorAll(".pixel");
pixels.forEach( pixel => {
    pixel.addEventListener("mouseover", () => pixel.classList.add("active"));
});



// let count = Number(prompt("Enter how many pixels"));
// console.log(count);