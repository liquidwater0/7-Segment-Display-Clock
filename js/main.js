import { updateClock } from "./clock.js";

window.requestAnimationFrame(updateClock);

const formatSwitchButton = document.getElementById("formatSwitchButton");
formatSwitchButton.addEventListener("click", changeFormat);

let format = localStorage.getItem("7_Segment_Clock_Format") || "12h";
setFormat();

function changeFormat() {
    switch (format) {
        case "12h":
            format = "24h"
            break;
        case "24h":
            format = "12h"
            break;
    }

    formatSwitchButton.textContent = format;
    localStorage.setItem("7_Segment_Clock_Format", format);
}

function setFormat() {
    formatSwitchButton.textContent = format;
}