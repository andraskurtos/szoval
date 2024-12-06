import { useEffect } from "preact/hooks";
import "./less/Keyboard.less";

/**
 * Component representing a single key on the keyboard.
 * 
 * @param value - The letter or symbol displayed on the key.
 * @param onClick - Callback function executed when the key is clicked.
 * @param icon - Optional icon to display on the key.
 * @param className - Optional CSS class applied to the key.
 */
export function Key({ value, onClick, icon, className }: { value?: string; onClick: () => void; icon?: string; className?: string }) {
    return (
        <div className={"key " + className + "-key"} onClick={onClick}>
            <p>{value}</p>
            <span className="material-symbols-outlined">
                {icon}
            </span>
        </div>
    );
}

/**
 * Component representing the keyboard interface.
 * 
 * @param onKeyPress - Function invoked when a key is pressed.
 * @param letters - Object mapping keys to their respective CSS classes.
 */
export function Keyboard({ onKeyPress, letters }: { onKeyPress: (key: string) => void; letters: { [key: string]: string } }) {
    const keys1 = ["q", "w", "e", "r", "t", "z", "u", "i", "o", "p", "ő", "ú", "ű"];
    const keys2 = ["refresh", "a", "s", "d", "f", "g", "h", "j", "k", "l", "é", "á", "backspace"];
    const keys3 = ["settings", "í", "y", "x", "c", "v", "b", "n", "m", "ö", "ü", "ó", "enter"];
    const allKeys = [...keys1, ...keys2, ...keys3];

    /**
     * Handles physical keyboard keydown events and triggers onKeyPress for valid keys.
     */
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const key = event.key.toLowerCase();
            if (allKeys.includes(key) || key === "escape") {
                onKeyPress(key.toUpperCase());
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [allKeys, onKeyPress]);

    return (
        <div className="keyboard">
            {[keys1, keys2, keys3].map((row, rowIndex) => (
                <div key={rowIndex} className="keyboard-row">
                    {row.map((key) => (
                        key === "backspace" || key === "refresh" || key === "settings" ? (
                            <Key key={key} icon={key} onClick={() => onKeyPress(key.toUpperCase())} />
                        ) : key === "enter" ? (
                            <Key key={key} icon="login" onClick={() => onKeyPress(key.toUpperCase())} />
                        ) : (
                            <Key key={key} value={key} className={letters[key]} onClick={() => onKeyPress(key.toUpperCase())} />
                        )
                    ))}
                </div>
            ))}
        </div>
    );
}
