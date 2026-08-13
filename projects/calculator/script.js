/* =====================================
   Calculator App
   Roshni Code Charm
===================================== */

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

// Button Click Events
buttons.forEach((button) => {

    button.addEventListener("click", () => {

        const value = button.dataset.value;

        switch (value) {

            case "C":
                clearDisplay();
                break;

            case "DEL":
                deleteLast();
                break;

            case "=":
                calculate();
                break;

            default:
                appendValue(value);

        }

    });

});

// Append Value
function appendValue(value) {

    if (display.value === "Error") {
        display.value = "";
    }

    display.value += value;

}

// Clear
function clearDisplay() {

    display.value = "";

}

// Delete Last Character
function deleteLast() {

    display.value = display.value.slice(0, -1);

}

// Calculate
function calculate() {

    if (display.value.trim() === "") return;

    try {

        let expression = display.value.replace(/÷/g, "/").replace(/×/g, "*");

        display.value = eval(expression);

    }

    catch {

        display.value = "Error";

        setTimeout(() => {

            display.value = "";

        }, 1200);

    }

}

/* ============================
   Keyboard Support
============================ */

document.addEventListener("keydown", (event) => {

    const key = event.key;

    // Numbers
    if (!isNaN(key)) {

        appendValue(key);
        return;

    }

    // Operators
    if (["+", "-", "*", "/", "%", "."].includes(key)) {

        appendValue(key);
        return;

    }

    // Enter
    if (key === "Enter") {

        event.preventDefault();
        calculate();
        return;

    }

    // Backspace
    if (key === "Backspace") {

        deleteLast();
        return;

    }

    // Escape
    if (key === "Escape") {

        clearDisplay();
        return;

    }

});