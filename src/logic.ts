import wordlist from "./assets/words.json";

// class for wordlist
export class Words {
    // list of words
    private words: string[];

    // solution of the game
    private solution: string;


    constructor() {
        this.words = wordlist;
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
    pickWord() : string {
        return this.words[Math.floor(Math.random() * this.words.length)];
    }

    // compare a word to the solution, return with array of colors
    // TODO - replace color names with more abstract syntax
    compare(word:string): string[] {
        let comp = ["white","white","white","white","white"]
        word = word.toLowerCase();

        for (let i = 0; i < word.length; i++) {
            if (word[i] === this.solution[i]) {
                comp[i] = "green";
            } else if (this.solution.includes(word[i])) {
                comp[i] = "yellow";
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
    
    constructor(words: Words) {
        this.words = words;
    }

    // submit a word (called when enter is pressed)
    wordSubmitted(word: string, setComparisons, setCurrentRow, currentRow, setLetters) : void {
        
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
        setLetters((prevLetters) => {
            const newLetters = {...prevLetters};
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
        setComparisons((prevComparisons) => {
            const newComparisons = [...prevComparisons];
            newComparisons[currentRow] = comparison;
            return newComparisons;
        });
        
        // increment the current row
        setCurrentRow((prevRow) => {
            return prevRow + 1;
        });

    }

    // delete a letter (called when backspace is pressed)
    deleteLetter(setGuess, currentRow) : void {
        // delete the last letter
        setGuess((prevGuess) => {
            const newGuess = [...prevGuess];
                const row = newGuess[currentRow];
                const emptyIndex = row.findIndex((cell) => cell === "");
                if (emptyIndex > 0) {
                    row[emptyIndex-1] = "";
                }
                else if (emptyIndex === -1){
                    row[row.length-1] = "";
                }
            return newGuess;
        });
    }

    // type a letter (called when a letter is pressed)
    typedLetter(letter: string, setGuess, currentRow) : void {
        // type the letter into current row
        setGuess((prevGuess) => {
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