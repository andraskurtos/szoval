import { Words } from "./words";

/**
 * Class that handles actions related to the game, such as submitting a word, typing a letter, 
 * and deleting a letter. It manages the state of the game by updating comparisons, rows, letters, 
 * and the current guess.
 */
export class GameActions {
    private words: Words;
    private setComparisons: (prev) => void;
    private setCurrentRow: (prev) => void;
    private setLetters: (prev) => void;
    private setGuess: (prev) => void;

    /**
     * Creates an instance of GameActions.
     *
     * @param {Words} words - The words object that provides methods for validating and comparing words.
     * @param {(prev) => void} setComparisons - A function to update the comparisons state.
     * @param {(prev) => void} setCurrentRow - A function to update the current row state.
     * @param {(prev) => void} setLetters - A function to update the letters state.
     * @param {(prev) => void} setGuess - A function to update the guess state.
     */
    constructor(
        words: Words,
        setComparisons: (prev) => void,
        setCurrentRow: (prev) => void,
        setLetters: (prev) => void,
        setGuess: (prev) => void
    ) {
        this.words = words;
        this.setComparisons = setComparisons;
        this.setCurrentRow = setCurrentRow;
        this.setLetters = setLetters;
        this.setGuess = setGuess;
    }

    /**
     * Submits a word when the Enter key is pressed.
     * Validates the word and compares it to the solution, then updates the game state.
     *
     * @param {string} word - The word submitted by the player.
     * @param {number} currentRow - The current row being played.
     * @throws {Error} If the word is not valid.
     */
    wordSubmitted(word: string, currentRow: number): void {
        // if it's too short, return
        if (word.length < this.words.getWordLength()) {
            alert("too short");
            return;
        }

        // if it's not a valid word, return
        if (!this.words.validWord(word)) {
            throw new Error("Invalid word");
        }

        // compare word to solution
        const comparison = this.words.compare(word);

        // set the colors of the letters
        this.setLetters((prevLetters) => {
            const newLetters = { ...prevLetters };
            for (let letter of word) {
                if (newLetters[letter.toLowerCase()] === "green") continue;
                newLetters[letter.toLowerCase()] = comparison[word.indexOf(letter)];
            }
            return newLetters;
        });

        // set the comparisons
        this.setComparisons((prevComparisons) => {
            const newComparisons = [...prevComparisons];
            newComparisons[currentRow] = comparison;
            return newComparisons;
        });

        // increment the current row
        this.setCurrentRow((prevRow) => {
            return prevRow + 1;
        });
    }

    /**
     * Deletes the last letter when the Backspace key is pressed.
     * Updates the guess state by removing the last letter from the current row.
     *
     * @param {number} currentRow - The current row being edited.
     */
    deleteLetter(currentRow: number): void {
        // delete the last letter
        this.setGuess((prevGuess) => {
            const newGuess = [...prevGuess];
            const row = newGuess[currentRow];
            const emptyIndex = row.findIndex((cell) => cell === "");
            if (emptyIndex > 0) {
                row[emptyIndex - 1] = "";
            } else if (emptyIndex === -1) {
                row[row.length - 1] = "";
            }
            return newGuess;
        });
    }

    /**
     * Types a letter when a key is pressed.
     * Updates the current row with the typed letter.
     *
     * @param {string} letter - The letter typed by the player.
     * @param {number} currentRow - The current row being edited.
     */
    typedLetter(letter: string, currentRow: number): void {
        // type the letter into current row
        this.setGuess((prevGuess) => {
            const newGuess = [...prevGuess];
            const row = newGuess[currentRow];
            const emptyIndex = row.findIndex((cell) => cell === "");
            if (emptyIndex !== -1) {
                row[emptyIndex] = letter;
            }
            return newGuess;
        });
    }
}
