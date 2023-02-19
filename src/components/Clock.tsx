import { useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Digit from "./Digit";
import ClockButton from "./ClockButton";

export default function Clock() {
    const [hour, setHour] = useState<number>(10);
    const [minute, setMinute] = useState<number>(2);
    const [seconds, setSeconds] = useState<number>(2);

    const [timeFormat, setTimeFormat] = useLocalStorage("7SDC_time_format", "12hour");
    const [showSeconds, setShowSeconds] = useLocalStorage("7SDC_show_seconds", false);
    const [isPM, setIsPM] = useState<boolean>(false);

    const [tickID, setTickID] = useState<number>(null!);

    useEffect(() => {
        setTickID(requestAnimationFrame(tick));
        return () => cancelAnimationFrame(tickID);
    }, []);

    function tick() {
        const date = new Date();

        setHour(date.getHours());
        setMinute(date.getMinutes());
        setSeconds(date.getSeconds());
        setIsPM(date.getHours() >= 12);

        requestAnimationFrame(tick);
    }

    function format12HourTime(time: number) {
        if (time % 12 === 0 || time === 12) return 12;
        return time % 12;
    }

    return (
        <div className="clock">
            <div className="toggles">
                <div className="toggle-container">
                    <p>{ timeFormat === "12hour" ? "12 Hour" : "24 Hour" }</p>
                    <ClockButton 
                        pressed={timeFormat === "24hour"}
                        onToggle={value => setTimeFormat(value ? "24hour" : "12hour")}
                    />
                </div>
                <div className="toggle-container">
                    <p>Show Seconds</p>
                    <ClockButton 
                        pressed={showSeconds}
                        onToggle={value => setShowSeconds(value)}
                    />
                </div>
            </div>

            {
                timeFormat === "12hour" &&
                <div className={`am-pm-indicator ${isPM ? "active" : ""}`}>PM</div>
            }

            <Digit 
                digit={timeFormat === "12hour" ? format12HourTime(hour) : hour} 
                removeZero
            />
            <Digit digit={minute}/>
            { showSeconds && <Digit digit={seconds}/> }
        </div>
    );
}