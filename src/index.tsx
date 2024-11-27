import { render } from 'preact';

import 'preact-material-components/TopAppBar/style.css';
import './index.less';
import { WordleGrid } from './Board';
import { Navbar } from './Navbar';
import { Keyboard } from './Keyboard';
import { Game } from './Game';
import { Popup } from './Popup';

let handleKeyDown = (event) => {
	console.log(event.key);
};

export function App() {
	
	return (
		<div class="content">
			<Game />
		</div>	
    );
}

render(<Navbar />, document.getElementById('navbar'));
render(<App />, document.getElementById('app'));
