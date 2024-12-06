import { useEffect, useState } from "preact/hooks";
import "./less/Settings.less";
import { SettingsController } from "./settingsController";
import { Statistics } from "./statistics";

let notificationShown = false;

/**
 * Settings component that allows the user to configure various application settings.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.closeWindow - Function to close the settings window.
 * @param {string} props.className - Custom CSS class to style the component.
 * @param {SettingsController} props.settingsController - Controller for managing settings state.
 * @param {Statistics} props.stats - Statistics object to retrieve and display game statistics.
 * @returns {JSX.Element} - The rendered settings component.
 */
export function Settings({ closeWindow, className, settingsController, stats }: { closeWindow: () => void, className: string, settingsController: SettingsController, stats: Statistics }) {
    let [activetab, setactivetab] = useState("general");
    let [activebutton, setactivebutton] = useState(settingsController.getDifficulty());
    let [wordInput, setWordInput] = useState("");
    let supportsNotifs = 'Notification' in window;
    activebutton = settingsController.getDifficulty();
    
    // Show notification if daily challenge is available
    if (supportsNotifs) {
        if (Notification.permission === "granted" && !settingsController.isDailySolved() && !notificationShown) {
            let notification = new Notification("SZÓVAL", {
                body: "Elérhető a napi kihívás!",
                icon: "./logo192.png"
            });
            notification.onclick = () => {
                window.focus();
                notification.close();
            };
            notificationShown = true;
        }
    }

    /**
     * Handles tab switch when a tab is clicked.
     * 
     * @param {string} tab - The tab to activate.
     */
    const onTabClick = (tab: string) => {
        setactivetab(() => tab);
    };

    /**
     * Handles difficulty level change when a difficulty button is clicked.
     * 
     * @param {string} diff - The selected difficulty level.
     */
    const onDiffClick = (diff: string) => {
        settingsController.setDifficulty(diff);
        setactivebutton(() => settingsController.getDifficulty());
    };

    let statsDict;
    if (statsDict === undefined) {
        statsDict = stats.getStats();
    }

    useEffect(() => {
        statsDict = stats.getStats();
    }, [stats]);

    return (
        <div className={`settings ${className}`}>

            <nav className="settings-nav">
                <ul>
                    <li className={`settings-nav-tab ${activetab === "general" ? " activetab" : ""}`} id="general"><button onClick={() => onTabClick("general")}>General</button></li>
                    <li className={`settings-nav-tab ${activetab === "diff" ? " activetab" : ""}`} id="diff"><button onClick={() => onTabClick("diff")}>Difficulty</button></li>
                    <li className={`settings-nav-tab ${activetab === "words" ? " activetab" : ""}`} id="words"><button onClick={() => onTabClick("words")}>Words</button></li>
                    <li className={`settings-nav-tab ${activetab === "stats" ? " activetab" : ""}`} id="stats"><button onClick={() => onTabClick("stats")}>Statistics</button></li>
                    <li className="exitbutton"><button onClick={closeWindow}><span className="material-symbols-outlined">close</span></button></li>
                </ul>
            </nav>
            <div className="settings-content">
                <div id="general" className={`settings-tab ${activetab === "general" ? "" : "invisible"}`}>
                    <h2>General</h2>
                    <button onClick={settingsController.toggleTheme}>Dark Mode Toggle</button>
                    <button onClick={settingsController.loadDaily}>Load Daily Challenge</button>
                    <button onClick={() => { if (supportsNotifs) Notification.requestPermission() }}>Enable Notifications</button>
                </div>
                <div className={`settings-tab ${activetab === "diff" ? "" : "invisible"}`} id="diff">
                    <h2>Difficulty</h2>
                    <ul>
                        <li onClick={() => onDiffClick("easy")} id="easy" className={`diff-button ${activebutton === "easy" ? "activebutton" : ""}`}><button>Easy</button></li>
                        <li onClick={() => onDiffClick("normal")} id="normal" className={`diff-button ${activebutton === "normal" ? "activebutton" : ""}`}><button>Medium</button></li>
                        <li onClick={() => onDiffClick("hard")} id="hard" className={`diff-button ${activebutton === "hard" ? "activebutton" : ""}`}><button>Hard</button></li>
                        <li onClick={() => onDiffClick("custom")} id="custom" className={`diff-button ${activebutton === "custom" ? "activebutton" : ""}`}><button>Custom</button></li>
                    </ul>
                    <div className={`diff-inputs ${activebutton === "custom" ? "visible" : "invisible"}`}>
                        <div className="diff-inputs-row">
                            <label className="diff-label" htmlFor="wordlength">Word length:</label>
                            <input min="2" max="8" className="diff-input" type="number" id="wordlength" value={settingsController.getWordLength()} onInput={(e) => settingsController.changeWordLength(Number((e.target as HTMLInputElement).value))}></input>
                        </div>
                        <div className="diff-inputs-row">
                            <label className="diff-label" htmlFor="tries">Tries:</label>
                            <input min="1" max="12" className="diff-input" type="number" id="tries" value={settingsController.getTries()} onInput={(e) => settingsController.changeTries(Number((e.target as HTMLInputElement).value))}></input>
                        </div>
                    </div>
                </div>
                <div id="words" className={`settings-tab ${activetab === "words" ? "" : "invisible"}`}>
                    <h2>Words</h2>
                    <ul>
                        <li><input type="text" placeholder="Add word" value={wordInput} onInput={(e => setWordInput((e.target as HTMLInputElement).value))}></input></li>
                        <li className="activebutton"><button onClick={() => settingsController.addWord(wordInput)}>Add</button></li>
                        <li className="activebutton"><button onClick={() => settingsController.removeWord(wordInput)}>Delete</button></li>
                    </ul>

                </div>
                <div id="stats" className={`settings-tab ${activetab === "stats" ? "" : "invisible"}`}>
                    <h2>Statistics</h2>
                    <p>Games: {statsDict.games}</p>
                    <p>Wins: {statsDict.wins}</p>
                    <p>Losses: {statsDict.losses}</p>
                    <p>Winrate: {statsDict.winrate.toFixed(2)}</p>
                    <p>Average rounds per game: {statsDict.average.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
}
