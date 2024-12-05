import { render } from 'preact';
import 'preact-material-components/TopAppBar/style.css';
import './less/index.less';
import { WordleGrid } from './Board';
import { Navbar } from './Navbar';
import { SettingsController } from './settingsController';
import { useEffect, useState } from 'preact/hooks';
import { Words } from './logic';
import "./Pwa";



let settings = new SettingsController();

export function App() {	

	return (
		<div class="content">
			<h1>Wordle</h1>
            <WordleGrid settingsController={settings}/>
		</div>	
    );
}

//render(<Navbar />, document.getElementById('navbar'));
render(<App />, document.getElementById('app'));
