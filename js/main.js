import { settings, saveSettings } from "./settings.js";
import { updateClock } from "./clock.js";

document.addEventListener("DOMContentLoaded", updateUI);
window.requestAnimationFrame(updateClock);

const formatSwitchButton = document.getElementById("formatSwitchButton");
const useSecondsButton = document.getElementById("useSecondsButton");

formatSwitchButton.addEventListener("click", changeFormat);
useSecondsButton.addEventListener("click", changeSeconds);

//Format Option
let format = settings.format;

function changeFormat() {
    switch (format) {
        case "12h":
            format = "24h"
            break;
        case "24h":
            format = "12h"
            break;
    }

    settings.format = format;
    updateUI();
    saveSettings();
}

//Seconds Option
let showSeconds = settings.showSeconds;

function changeSeconds() {
    showSeconds = !showSeconds;
    settings.showSeconds = showSeconds;
    updateUI();
    saveSettings();
}

function updateUI() {
    const pmIndicatorContainer = document.getElementById("pmIndicatorContainer");
    const secondsSection = document.querySelectorAll(".seconds-section");

    secondsSection.forEach(element => {
        element.style.display = (showSeconds == true) ? "flex" : "none";
    });

    pmIndicatorContainer.style.display = (format === "12h") ? "flex" : "none";
    formatSwitchButton.style.setProperty("--hue", (format === "24h") ? 110 : null);
    formatSwitchButton.textContent = format;
    useSecondsButton.style.setProperty("--hue", (showSeconds == true) ? null : 15);
    useSecondsButton.style.color = (showSeconds == true) ? "" : "white";
    useSecondsButton.textContent = (showSeconds == true) ? "Yes" : "No";
}
