import "./Settings.less"

function onTabClick(tab:string) {
    let tabs = document.querySelectorAll(".settings-content > div");
    tabs.forEach((element) => {
        if (element.id !== tab) {
            element.classList.add("invisible");
        } else {
            element.classList.remove("invisible");
        }
    });
    let tabButtons = document.querySelectorAll(".settings-nav-tab");
    tabButtons.forEach((element) => {
        if (element.id !== tab) {
            element.classList.remove("activetab");
        } else {
            element.classList.add("activetab");
        }
    });
}


function closeWindow() {
    let settings = document.querySelector(".settings");
    settings.classList.add("invisible");
}

// Component for the settings
export function Settings() {
    return (
        <div className="settings">
            
            <nav className="settings-nav">
                <ul>
                    <li className="settings-nav-tab activetab" id="general"><button onClick={() => onTabClick("general")}>General</button></li>
                    <li className="settings-nav-tab" id="diff"><button onClick={()=>onTabClick("diff")}>Difficulty</button></li>
                    <li className="settings-nav-tab" id="words"><button onClick={()=>onTabClick("words")}>Words</button></li>
                    <li className="settings-nav-tab" id="keyboard"><button onClick={()=>onTabClick("keyboard")}>Keyboard</button></li>
                    <li className="settings-nav-tab" id="stats"><button onClick={()=>onTabClick("stats")}>Statistics</button></li>
                    <li className="exitbutton"><button onClick={closeWindow}><span className="material-symbols-outlined">close</span></button></li>
                </ul>
            </nav>
            <div className="settings-content">
                <div id="general" className="settings-tab">
                    <h2>General</h2>
                    <p>General settings</p>
                </div>
                <div className="settings-tab invisible" id="diff">
                    <h2>Difficulty</h2>
                    <ul>
                        <li><button>Easy</button></li>
                        <li><button>Medium</button></li>
                        <li><button>Hard</button></li>
                        <li><button>Custom</button></li>
                    </ul>
                </div>
                <div id="words" className="settings-tab invisible">
                    <h2>Words</h2>
                    <p>Word settings</p>
                </div>
                <div id="keyboard" className="settings-tab invisible">
                    <h2>Keyboard</h2>
                    <p>Keyboard settings</p>
                </div>
                <div id="stats" className="settings-tab invisible">
                    <h2>Statistics</h2>
                    <p>Statistics settings</p>
                </div>
            </div>
        </div>
    );
}