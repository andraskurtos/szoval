import { render } from 'preact';
import 'preact-material-components/TopAppBar/style.css';
import './less/index.less';
import { WordleGrid } from './Board';
import { Navbar } from './Navbar';
import { SettingsController } from './settingsController';
import { useEffect, useState } from 'preact/hooks';
import { Words } from './logic';



export function App() {	
	let [tries, setTries] = useState(6);
	let [wordLength, setWordLength] = useState(5);
	let [words, setWords] = useState(new Words());
	let settings = new SettingsController(setWordLength, setTries, words);

	
	console.log("refresh");

	return (
		<div class="content">
			<h1>Wordle</h1>
            <WordleGrid tries={tries} wordLength={wordLength} settingsController={settings} words={words}/>
		</div>	
    );
}

//render(<Navbar />, document.getElementById('navbar'));
render(<App />, document.getElementById('app'));
