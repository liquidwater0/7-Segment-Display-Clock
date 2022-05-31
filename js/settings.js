const defaultSettings = {
    format: "12h",
    showSeconds: true
}

export const settings = JSON.parse(localStorage.getItem("7_Segment_Clock_Settings")) || { ...defaultSettings };

export function saveSettings() {
    localStorage.setItem("7_Segment_Clock_Settings", JSON.stringify(settings));
}