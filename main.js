document.addEventListener("DOMContentLoaded", function () {
    const red = document.getElementById("red");
    const green = document.getElementById("green");
    const blue = document.getElementById("blue");

    const redInput = document.getElementById("redInput");
    const greenInput = document.getElementById("greenInput");
    const blueInput = document.getElementById("blueInput");

    const colorBox = document.getElementById("colorBox");
    const hexCode = document.getElementById("hexCode");
    const colorPicker = document.getElementById("colorPicker");
    const copyBtn = document.getElementById("copyBtn");

    function updateColor() {
        let r = red.value;
        let g = green.value;
        let b = blue.value;
        let hex = rgbToHex(r, g, b);

        colorBox.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        hexCode.textContent = hex;
        colorPicker.value = hex;

        redInput.value = r;
        greenInput.value = g;
        blueInput.value = b;
    }

    function updateSliders() {
        let r = validateInput(redInput.value);
        let g = validateInput(greenInput.value);
        let b = validateInput(blueInput.value);
        let hex = rgbToHex(r, g, b);

        colorBox.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        hexCode.textContent = hex;
        colorPicker.value = hex;

        red.value = r;
        green.value = g;
        blue.value = b;
    }

    function updateFromColorPicker() {
        let hex = colorPicker.value;
        let rgb = hexToRgb(hex);

        red.value = rgb.r;
        green.value = rgb.g;
        blue.value = rgb.b;

        redInput.value = rgb.r;
        greenInput.value = rgb.g;
        blueInput.value = rgb.b;

        colorBox.style.backgroundColor = hex;
        hexCode.textContent = hex.toUpperCase();
    }

    function rgbToHex(r, g, b) {
        return `#${((1 << 24) + (r << 16) + (g << 8) + +b).toString(16).slice(1).toUpperCase()}`;
    }

    function hexToRgb(hex) {
        let bigint = parseInt(hex.slice(1), 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255
        };
    }

    function validateInput(value) {
        let num = parseInt(value);
        return isNaN(num) ? 0 : Math.min(255, Math.max(0, num));
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(hexCode.textContent)
            .then(() => alert("Código HEX copiado al portapapeles"))
            .catch(err => console.error("Error al copiar: ", err));
    }

    red.addEventListener("input", updateColor);
    green.addEventListener("input", updateColor);
    blue.addEventListener("input", updateColor);

    redInput.addEventListener("input", updateSliders);
    greenInput.addEventListener("input", updateSliders);
    blueInput.addEventListener("input", updateSliders);

    colorPicker.addEventListener("input", updateFromColorPicker);
    copyBtn.addEventListener("click", copyToClipboard);

    updateColor();
});

