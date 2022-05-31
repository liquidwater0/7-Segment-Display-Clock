import { settings } from "./settings.js";

const hourContainer = document.getElementById("hour");
const minutesContainer = document.getElementById("minutes");
const secondsContainer = document.getElementById("seconds");
const pmIndicator = document.querySelector("[data-pm-indicator]");

const digits = new Map([
    ["0", [1, 1, 1, 1, 1, 1, 0]],
    ["1", [0, 1, 1, 0, 0, 0, 0]],
    ["2", [1, 1, 0, 1, 1, 0, 1]],
    ["3", [1, 1, 1, 1, 0, 0, 1]],
    ["4", [0, 1, 1, 0, 0, 1, 1]],
    ["5", [1, 0, 1, 1, 0, 1, 1]],
    ["6", [1, 0, 1, 1, 1, 1, 1]],
    ["7", [1, 1, 1, 0, 0, 0, 0]],
    ["8", [1, 1, 1, 1, 1, 1, 1]],
    ["9", [1, 1, 1, 1, 0, 1, 1]]
]);

function format12h(hour) {
    const hourAsNumber = Number(hour);
    let formatted;

    if (hourAsNumber == 0 || hourAsNumber == 12) {
        formatted = 12;
    } else {
        formatted = hourAsNumber % 12;
    }

    return {
        hourFormatted: String(formatted).padStart(2, "0"),
        amPM: (hourAsNumber >= 12) ? "pm" : "am"
    }
}

export function updateClock() {
    const now = new Date();
    let hour = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const { hourFormatted, amPM } = format12h(hour);

    if (settings.format === "12h") {
        hour = hourFormatted;
        pmIndicator.classList.toggle("active", (amPM === "pm") ? true : false);
    } else {
        hour = String(now.getHours()).padStart(2, "0");
    }

    displayTime({ hour, minutes, seconds });

    window.requestAnimationFrame(updateClock);
}

function displayTime({ hour, minutes, seconds }) {
    const [hourDigit1, hourDigit2] = hour;
    const [minutesDigit1, minutesDigit2] = minutes;
    const [secondsDigit1, secondsDigit2] = seconds;

    //Hours Section
    [...hourContainer.children[0].children].forEach((segment, index) => {
        segment.classList.remove("active");
        if (hourDigit1 === "0") return;

        const segmentParts = digits.get(hourDigit1);
        segment.classList.toggle("active", segmentParts[index] === 1);
    });

    [...hourContainer.children[1].children].forEach((segment, index) => {
        const segmentParts = digits.get(hourDigit2);
        segment.classList.toggle("active", segmentParts[index] === 1);
    });

    //Minutes Section
    [...minutesContainer.children[0].children].forEach((segment, index) => {
        const segmentParts = digits.get(minutesDigit1);
        segment.classList.toggle("active", segmentParts[index] === 1);
    });

    [...minutesContainer.children[1].children].forEach((segment, index) => {
        const segmentParts = digits.get(minutesDigit2);
        segment.classList.toggle("active", segmentParts[index] === 1);
    });

    //Seconds Section
    [...secondsContainer.children[0].children].forEach((segment, index) => {
        const segmentParts = digits.get(secondsDigit1);
        segment.classList.toggle("active", segmentParts[index] === 1);
    });

    [...secondsContainer.children[1].children].forEach((segment, index) => {
        const segmentParts = digits.get(secondsDigit2);
        segment.classList.toggle("active", segmentParts[index] === 1);
    });
}
