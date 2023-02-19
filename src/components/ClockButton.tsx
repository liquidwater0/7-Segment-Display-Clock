import { useState } from 'react';

type ClockButtonProps = {
    pressed?: boolean,
    onToggle?: (value: boolean) => void
}

export default function ClockButton({ pressed, onToggle }: ClockButtonProps) {
    const [isPressed, setIsPressed] = useState<boolean | undefined>(pressed);

    function handleClick() {
        if (onToggle) onToggle(!isPressed);
        setIsPressed(prev => !prev);
    }

    return (
        <button 
            className={`clock-button ${isPressed ? "pressed" : ""}`}
            onClick={handleClick}
        />
    );
}