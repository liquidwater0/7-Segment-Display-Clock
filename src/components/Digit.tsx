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

export default function Digit({ digit, removeZero }: { digit: number, removeZero?: boolean }) {
    const paddedDigit = digit.toString().padStart(2, "0");

    return (
        <div className="digit">
            <div className="segments">
                {
                    Array.from({ length: 7 }, (_, i) => i).map((_, index) => {
                        const digitArray = digits.get(paddedDigit[0]);
                        if (!digitArray) return;
                        
                        const isActive = digitArray[index];
                        const showZero = paddedDigit[0] === "0" && removeZero ? false : true;

                        return (
                            <div 
                                key={index} 
                                className={`segment ${isActive && showZero ? "active" : ""}`}
                            />
                        );
                    })
                }
            </div>
            <div className="segments">
                {
                    Array.from({ length: 7 }, (_, i) => i).map((_, index) => {
                        const digitArray = digits.get(paddedDigit[1]);
                        if (!digitArray) return;
                        const isActive = digitArray[index];

                        return (
                            <div 
                                key={index} 
                                className={`segment ${isActive ? "active" : ""}`}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
}