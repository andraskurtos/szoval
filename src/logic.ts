import wordlist from "./assets/words.json";
if (!localStorage.getItem('wordlist')) {
    // Only set it if 'wordlist' doesn't already exist in localStorage
    localStorage.setItem('wordlist', JSON.stringify(wordlist));
}

// class for wordlist
export class Words {
    // list of words
    private words: string[];

    // solution of the game
    private solution: string;


    constructor() {
        this.words = JSON.parse(localStorage.getItem('wordlist'));
        this.solution = this.pickWord();
        console.log(this.solution);
    }

    // getter for words
    getWords(): string[] {
        return this.words;
    }

    // getter for solution
    getSolution(): string {
        return this.solution;
    }

    // check if a word is in the wordlist
    validWord(word: string): boolean {
        return this.words.includes(word.toLowerCase());
    }

    // pick a random word from the list
    pickWord(): string {
        return this.words[Math.floor(Math.random() * this.words.length)];
    }

    // compare a word to the solution, return with array of colors
    // TODO - replace color names with more abstract syntax
    compare(word: string): string[] {
        let comp = ["white", "white", "white", "white", "white"]
        word = word.toLowerCase();
        let solution = this.solution.toLowerCase().split("");

        for (let i = 0; i < word.length; i++) {
            if (word[i] === solution[i]) {
                comp[i] = "green";
                solution[i] = " ";
            } else if (solution.includes(word[i])) {
                comp[i] = "yellow";
                solution[solution.indexOf(word[i])] = " ";
            } else {
                comp[i] = "gray";
            }
        }
        return comp;
    }


}

// class for game actions
// TODO - refactor this
export class GameActions {
    private words: Words;
    private setComparisons: (prev) => void;
    private setCurrentRow: (prev) => void;
    private setLetters: (prev) => void;
    private setGuess: (prev) => void;

    constructor(words: Words, setComparisons: (prev) => void, setCurrentRow: (prev) => void, setLetters: (prev) => void, setGuess: (prev) => void) {
        this.words = words;
        this.setComparisons = setComparisons;
        this.setCurrentRow = setCurrentRow;
        this.setLetters = setLetters;
        this.setGuess = setGuess;
    }

    // submit a word (called when enter is pressed)
    wordSubmitted(word: string, currentRow: number): void {

        // if it's too short, return
        if (word.length < 5) {
            //console.log("too short");
            return;
        }

        // if it's not a valid word, return
        if (!this.words.validWord(word)) {
            //console.log("Invalid word");
            return;
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
        })

        // if the word is correct, return
        // TODO - remove this
        if (comparison.every((color, index) => color === "green")) {
            //console.log("You win!");
        }

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

    // delete a letter (called when backspace is pressed)
    deleteLetter(currentRow): void {
        // delete the last letter
        this.setGuess((prevGuess) => {
            const newGuess = [...prevGuess];
            const row = newGuess[currentRow];
            const emptyIndex = row.findIndex((cell) => cell === "");
            if (emptyIndex > 0) {
                row[emptyIndex - 1] = "";
            }
            else if (emptyIndex === -1) {
                row[row.length - 1] = "";
            }
            return newGuess;
        });
    }

    // type a letter (called when a letter is pressed)
    typedLetter(letter: string, currentRow): void {
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