const hourContainer = document.getElementById("hour");
const minutesContainer = document.getElementById("minutes");
const secondsContainer = document.getElementById("seconds");

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

export function updateClock() {
    const now = new Date();
    const hour = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    
    displayTime({ hour, minutes, seconds });

    window.requestAnimationFrame(updateClock);
}

function displayTime({ hour, minutes, seconds }) {
    const [hourDigit1, hourDigit2] = hour;
    const [minutesDigit1, minutesDigit2] = minutes;
    const [secondsDigit1, secondsDigit2] = seconds;

    //Hours Section
    [...hourContainer.children[0].children].forEach((segment, index) => {
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
