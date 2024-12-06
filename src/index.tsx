import { render } from 'preact';
import 'preact-material-components/TopAppBar/style.css';
import './less/index.less';
import { WordleGrid } from './Board';
import { SettingsController } from './settingsController';

/**
 * Initializes the settings controller and renders the Wordle application.
 */
let settings = new SettingsController();

/**
 * Main application component for the Wordle game.
 * 
 * Handles notification permissions and includes the game grid.
 */
export function App() {
    // Request notification permission if supported by the browser.
    if ('Notification' in window) {
        Notification.requestPermission();
    }

    return (
        <div class="content">
            <h1>Wordle</h1>
            <WordleGrid settingsController={settings} />
        </div>
    );
}

// Renders the main application to the DOM.
render(<App />, document.getElementById('app'));
