import { render } from 'preact';

import 'preact-material-components/TopAppBar/style.css';
import './index.less';
import { WordleGrid } from './Board';
import { Navbar } from './Navbar';



export function App() {
	
	return (
		
		<div class="content">
			<h1>Wordle</h1>
			<WordleGrid tries={6} wordLength={5} />
		</div>	
    );
}

render(<Navbar />, document.getElementById('navbar'));
render(<App />, document.getElementById('app'));
