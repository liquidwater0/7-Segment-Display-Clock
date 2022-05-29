import { updateClock } from "./clock.js";

document.addEventListener("DOMContentLoaded", () => {
    setFormat();
    setSeconds();
});

window.requestAnimationFrame(updateClock);

const formatSwitchButton = document.getElementById("formatSwitchButton");
const useSecondsButton = document.getElementById("useSecondsButton");

formatSwitchButton.addEventListener("click", changeFormat);
useSecondsButton.addEventListener("click", changeSeconds);

//Format Option
let format = localStorage.getItem("7_Segment_Clock_Format") || "12h";

function changeFormat() {
    switch (format) {
        case "12h":
            format = "24h"
            break;
        case "24h":
            format = "12h"
            break;
    }

    setFormat();
    localStorage.setItem("7_Segment_Clock_Format", format);
}

function setFormat() {
    formatSwitchButton.style.setProperty("--hue", (format === "24h") ? 110 : null);
    formatSwitchButton.textContent = format;
}

//Seconds Option
let useSeconds = JSON.parse(localStorage.getItem("7_Segment_Clock_Use_Seconds"));
if (useSeconds === null) useSeconds = true;

function changeSeconds() {
    useSeconds = !useSeconds;
    setSeconds();
    localStorage.setItem("7_Segment_Clock_Use_Seconds", useSeconds);
}

function setSeconds() {
    useSecondsButton.style.setProperty("--hue", (useSeconds == true) ? null : 15);
    useSecondsButton.style.color = (useSeconds == true) ? "" : "white";
    useSecondsButton.textContent = (useSeconds == true) ? "Yes" : "No";
}
