import { useEffect, useState } from "preact/hooks";
import "./less/Board.less";
import { Keyboard } from "./Keyboard";
import { Popup } from "./Popup";
import { Settings } from "./Settings";
import { SettingsController } from "./settingsController";
import { Statistics } from "./statistics";
import { GameActions } from "./gameactions";

/**
 * Represents a single cell in the Wordle game board.
 * @param value - The letter displayed in the cell.
 * @param color - The color representing the cell's state (e.g., correct, incorrect).
 */
export function WordleCell({ value, color }: { value: string, color: string }) {
    return (
        <div className={"wordle-cell " + color + "-cell"}>
            <p>{value}</p>
        </div>
    );
}

/**
 * Array of all possible keyboard keys, including special Hungarian characters.
 */
const keys = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", 
    "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "á", "é", "í", "ó", "ö", "ő", 
    "ú", "ü", "ű"
];

/**
 * Main game board component for the Wordle game.
 * Manages the state of guesses, comparisons, and keyboard interactions.
 * 
 * @param settingsController - Controller for managing game settings.
 */
export function WordleGrid({ settingsController }: { settingsController: SettingsController }) {

    const tries = settingsController.getTries();
    const wordLength = settingsController.getWordLength();
    const words = settingsController.getWords();

    // State for player guesses (rows are guesses, cells are letters).
    const [guess, setGuess] = useState(Array.from({ length: tries }, () => Array(wordLength).fill("")));

    // State for tracking the current row being edited.
    const [currentRow, setCurrentRow] = useState(0);

    // State for color comparisons of guesses (e.g., correct, misplaced).
    const [comparisons, setComparisons] = useState(Array.from({ length: tries }, () => Array(wordLength).fill("white")));

    // State for keyboard key colors indicating correctness.
    const [letters, setLetters] = useState(Object.fromEntries(keys.map(key => [key, "white"])));

    // State for displaying the "bad guess" popup.
    const [badGuess, setBadGuess] = useState(false);

    // Game statistics.
    const stats = new Statistics();

    // State for controlling the visibility of the settings window.
    const [settings, setSettings] = useState("invisible");

    /**
     * Initializes a new game by resetting the board and updating the game state.
     */
    useEffect(() => {
        newGame();
    }, [tries, wordLength]);

    const newGame = () => {
        if (wonGame() || lostGame()) {
            stats.addRound(currentRow, wonGame());
            settingsController.solveDaily();
        }
        setGuess(Array.from({ length: tries }, () => Array(wordLength).fill("")));
        setCurrentRow(0);
        setComparisons(Array.from({ length: tries }, () => Array(wordLength).fill("white")));
        setLetters(Object.fromEntries(keys.map(key => [key, "white"])));
        if (!settingsController.isDaily()) words.resetSolution();
    };

    /**
     * Closes the settings window.
     */
    const closeSettings = () => {
        setSettings(() => "invisible");
    };

    /**
     * Determines if the player has won the game by checking if any row is fully green.
     * @returns `true` if the player has won, otherwise `false`.
     */
    function wonGame(): boolean {
        return comparisons.some(comparison => comparison.every(color => color === "green"));
    }

    /**
     * Adds a guessed word to the word list if the guess is invalid.
     * @param key - The word to be added.
     */
    function addButton(key: string) {
        settingsController.addWord(key);
        setBadGuess(() => false);
    }

    /**
     * Determines if the player has lost the game by checking if all attempts are used.
     * @returns `true` if the player has lost, otherwise `false`.
     */
    function lostGame(): boolean {
        return currentRow === tries;
    }

    /**
     * Handles keyboard input and updates the game state accordingly.
     * 
     * @param key - The key pressed by the player.
     */
    const handleKeyPress = (key: string) => {
        const gameActions = new GameActions(words, setComparisons, setCurrentRow, setLetters, setGuess);

        switch (key) {
            case "ENTER":
                if (wonGame() || lostGame()) {
                    newGame();
                } else if (badGuess) {
                    addButton(guess[currentRow].join(""));
                } else {
                    const guessWord = guess[currentRow].join("");
                    try {
                        gameActions.wordSubmitted(guessWord, currentRow);
                    } catch (e) {
                        setBadGuess(() => true);
                    }
                }
                break;

            case "ESCAPE":
                if (badGuess) {
                    setBadGuess(() => false);
                } else {
                    newGame();
                }
                break;

            case "BACKSPACE":
                gameActions.deleteLetter(currentRow);
                break;

            case "REFRESH":
                newGame();
                break;

            case "SETTINGS":
                setSettings("visible");
                break;

            default:
                gameActions.typedLetter(key, currentRow);
                break;
        }
    };

    /**
     * Renders the game board, keyboard, and popups.
     */
    return (
        <div class="wordle-game">
            <Popup 
                className={badGuess ? "visible" : "invisible"} 
                title="Bad Guess" 
                message="This word is not in the wordlist!"
                buttonText="EXIT" 
                onClick={() => setBadGuess(() => false)}
                onClick2={() => addButton(guess[currentRow].join(""))} 
                button2Text="ADD" 
            />
            <Popup 
                className={(wonGame() || lostGame()) ? "visible" : "invisible"} 
                title={wonGame() ? "NYERTÉL!" : "VESZTETTÉL!"} 
                message={wonGame() ? "Szép játék!" : ("A szó \"" + words.getSolution() + "\" volt.")} 
                onClick={newGame} 
                buttonText="Újra!"
            />
            <Settings 
                closeWindow={closeSettings} 
                className={settings} 
                settingsController={settingsController} 
                stats={stats} 
            />
            <div className="wordle-grid">
                {guess.map((row, rowIndex) => (
                    <div class="wordle-row" key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <WordleCell 
                                value={cell} 
                                key={cellIndex} 
                                color={comparisons[rowIndex][cellIndex]} 
                            />
                        ))}
                    </div>
                ))}
            </div>
            <Keyboard onKeyPress={handleKeyPress} letters={letters} />
        </div>
    );
}
