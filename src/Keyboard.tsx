import { useEffect } from "preact/hooks";
import "./Keyboard.less";

export function Key({ value, onClick, icon, className}: { value?: string, onClick: () => void , icon?: string, className?: string}) {
    return (
        <div className={"key "+className+"-key"} onClick={onClick}>
            <p>{value}</p>
            <span className="material-symbols-outlined">
                {icon}
            </span>
        </div>
    );
}

export function Keyboard({ onKeyPress , letters}: { onKeyPress: (key: string) => void , letters: {[key: string]: string}}) {
    const keys1 = ["q", "w", "e", "r", "t", "z", "u", "i", "o", "p", "ő", "ú", "ű"];
    const keys2 = ["refresh","a", "s", "d", "f", "g", "h", "j", "k", "l", "é", "á", "backspace"];
    const keys3 = ["í", "y", "x", "c", "v", "b", "n", "m", "ö", "ü", "ó", "enter"];
    const allKeys = [...keys1, ...keys2, ...keys3];
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const key = event.key.toLowerCase();
            if (allKeys.includes(key)) {
                onKeyPress(key.toUpperCase());
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [allKeys, onKeyPress]);

    return (
        <div class="keyboard">
            {[keys1, keys2, keys3].map((row, rowIndex) => (
                <div key={rowIndex} className="keyboard-row">
                    {row.map((key) => (
                        (key==="backspace"||key==="refresh")?<Key key={key} icon={key} onClick={() => onKeyPress(key.toUpperCase())} />
                        :(key==="enter")?<Key key={key} icon="login" onClick={() => onKeyPress(key.toUpperCase())} />:<Key key={key} value={key} className={letters[key]} onClick={() => onKeyPress(key.toUpperCase())} />
                    ))}
                </div>
            ))}
        </div>
    );

}