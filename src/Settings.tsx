import { useState } from "preact/hooks";
import "./Settings.less"
import { SettingsController } from "./settingsController";



// Component for the settings
export function Settings({closeWindow, className, setDiff}: {closeWindow: () => void, className: string, setDiff: (diff:string) => void}){
    let [activetab,setactivetab] = useState("general");
    let [activebutton,setactivebutton] = useState("normal");

    const onTabClick = (tab:string) => {
        setactivetab(()=>tab);
    };

    const onDiffClick = (diff:string) => {
        setactivebutton(()=>diff);
        setDiff(diff);
    }

    return (
        <div className={`settings ${className}`}>
            
            <nav className="settings-nav">
                <ul>
                    <li className={`settings-nav-tab ${activetab==="general"?" activetab":""}`} id="general"><button onClick={() => onTabClick("general")}>General</button></li>
                    <li className={`settings-nav-tab ${activetab==="diff"?" activetab":""}`} id="diff"><button onClick={()=>onTabClick("diff")}>Difficulty</button></li>
                    <li className={`settings-nav-tab ${activetab==="words"?" activetab":""}`} id="words"><button onClick={()=>onTabClick("words")}>Words</button></li>
                    <li className={`settings-nav-tab ${activetab==="keyboard"?" activetab":""}`} id="keyboard"><button onClick={()=>onTabClick("keyboard")}>Keyboard</button></li>
                    <li className={`settings-nav-tab ${activetab==="stats"?" activetab":""}`} id="stats"><button onClick={()=>onTabClick("stats")}>Statistics</button></li>
                    <li className="exitbutton"><button onClick={closeWindow}><span className="material-symbols-outlined">close</span></button></li>
                </ul>
            </nav>
            <div className="settings-content">
                <div id="general" className={`settings-tab ${activetab==="general"?"":"invisible"}`}>
                    <h2>General</h2>
                    <p>General settings</p>
                </div>
                <div className={`settings-tab ${activetab==="diff"?"":"invisible"}`} id="diff">
                    <h2>Difficulty</h2>
                    <ul>
                        <li onClick={()=>onDiffClick("easy")} id="easy" className={`diff-button ${activebutton==="easy"?"activebutton":""}`}><button>Easy</button></li>
                        <li onClick={()=>onDiffClick("normal")} id="normal" className={`diff-button ${activebutton==="normal"?"activebutton":""}`}><button>Medium</button></li>
                        <li onClick={()=>onDiffClick("hard")} id="hard" className={`diff-button ${activebutton==="hard"?"activebutton":""}`}><button>Hard</button></li>
                        <li onClick={()=>onDiffClick("custom")} id="custom" className={`diff-button ${activebutton==="custom"?"activebutton":""}`}><button>Custom</button></li>
                    </ul>
                </div>
                <div id="words" className={`settings-tab ${activetab==="words"?"":"invisible"}`}>
                    <h2>Words</h2>
                    <p>Word settings</p>
                </div>
                <div id="keyboard" className={`settings-tab ${activetab==="leyboard"?"":"invisible"}`}>
                    <h2>Keyboard</h2>
                    <p>Keyboard settings</p>
                </div>
                <div id="stats" className={`settings-tab ${activetab==="stats"?"":"invisible"}`}>
                    <h2>Statistics</h2>
                    <p>Statistics settings</p>
                </div>
            </div>
        </div>
    );
}