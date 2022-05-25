const hourContainer = document.getElementById("hour");
const minutesContainer = document.getElementById("minutes");

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

window.requestAnimationFrame(getTime);

function getTime() {
    const now = new Date();
    const hour = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    
    displayTime({ hour, minutes });

    window.requestAnimationFrame(getTime);
}

function displayTime({ hour, minutes }) {
    const [hourDigit1, hourDigit2] = hour;
    const [minutesDigit1, minutesDigit2] = minutes;

    //Hours Section
    [...hourContainer.children[0].children].forEach((segment, index) => {
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
}