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
    if (format === "24h") {
        formatSwitchButton.style.setProperty("--hue", 110);
    } else {
        formatSwitchButton.style.setProperty("--hue", null);
    }

    formatSwitchButton.textContent = format;
}

let useSeconds = localStorage.getItem("7_Segment_Clock_Use_Seconds") || "Yes";

function changeSeconds() {
    switch (useSeconds) {
        case "Yes":
            useSeconds = "No"
            break;
        case "No":
            useSeconds = "Yes"
            break;
    }

    setSeconds();
    localStorage.setItem("7_Segment_Clock_Use_Seconds", useSeconds);
}

function setSeconds() {
    if (useSeconds === "No") {
        useSecondsButton.style.setProperty("--hue", 15);
        useSecondsButton.style.color = "white";
    } else {
        useSecondsButton.style.setProperty("--hue", null);
        useSecondsButton.style.color = "";
    }

    useSecondsButton.textContent = useSeconds;
}
