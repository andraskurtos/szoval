import { render } from 'preact';

import 'preact-material-components/TopAppBar/style.css';
import './index.less';
import { WordleGrid } from './Board';
import { Navbar } from './Navbar';
import { SettingsController } from './settingsController';
import { useState } from 'preact/hooks';



export function App() {
	let [tries, setTries] = useState(6);
	let [wordLength, setWordLength] = useState(5);

	const setDifficulty = (difficulty: string) => {
        switch (difficulty) {
            case "easy":
                setWordLength(5);
                setTries(8);
                break;
            case "normal":
                setWordLength(5);
                setTries(6);
                break;
            case "hard":
                setWordLength(5);
                setTries(4);
                break;
            case "custom":
                setWordLength(10);
                setTries(5);
                break;
        }
    };
	console.log("refresh");
	console.log(tries);
	console.log(wordLength);

	return (
		<div class="content">
			<h1>Wordle</h1>
            <WordleGrid tries={tries} wordLength={wordLength} setDiff={setDifficulty} />
		</div>	
    );
}

render(<Navbar />, document.getElementById('navbar'));
render(<App />, document.getElementById('app'));
