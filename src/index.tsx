import { render } from 'preact';
import wordlist from "./assets/words.json";
import 'preact-material-components/TopAppBar/style.css';
import './index.less';
import { WordleGrid } from './Board';
import { Navbar } from './Navbar';
import { SettingsController } from './settingsController';
import { useEffect, useState } from 'preact/hooks';



export function App() {	
	let [tries, setTries] = useState(6);
	let [wordLength, setWordLength] = useState(5);
	let settings = new SettingsController(setWordLength, setTries);

	
	console.log("refresh");

	return (
		<div class="content">
			<h1>Wordle</h1>
            <WordleGrid tries={tries} wordLength={wordLength} settingsController={settings} />
		</div>	
    );
}

render(<Navbar />, document.getElementById('navbar'));
render(<App />, document.getElementById('app'));
