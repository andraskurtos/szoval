import wordlist from "./assets/words.json";

export class Words {
    private words: string[];
    private solution: string;
    constructor() {
        this.words = wordlist;
        this.solution = this.pickWord();
        console.log(this.solution);
    }
    getWords(): string[] {
        return this.words;
    }
    getSolution(): string {
        return this.solution;
    }

    validWord(word: string): boolean {
        return this.words.includes(word.toLowerCase());
    }

    pickWord() : string {
        return this.words[Math.floor(Math.random() * this.words.length)];
    }

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
        //console.log(comp);
        return comp;
    }


}

export class GameActions {
    private words: Words;
    
    constructor(words: Words) {
        this.words = words;
    }

    wordSubmitted(word: string, setComparisons, setCurrentRow, currentRow, setLetters) : void {
        
        if (word.length < 5) {
            //console.log("too short");
            return;
        }

        if (!this.words.validWord(word)) {
            //console.log("Invalid word");
            return;
        }

        const comparison = this.words.compare(word);
        setLetters((prevLetters) => {
            const newLetters = {...prevLetters};
            for (let letter of word) {
                if (newLetters[letter.toLowerCase()] === "green") continue;
                newLetters[letter.toLowerCase()] = comparison[word.indexOf(letter)];
            }
            return newLetters;
        })
        if (comparison.every((color, index) => color === "green")) {
            //console.log("You win!");
        }

        setComparisons((prevComparisons) => {
            const newComparisons = [...prevComparisons];
            newComparisons[currentRow] = comparison;
            return newComparisons;
        });
        
        setCurrentRow((prevCurrentRow) => {
            return prevCurrentRow + 1;
        });

    }

    deleteLetter(setGuess, currentRow) : void {
        setGuess((prevGuess) => {
            const newGuess = [...prevGuess];
                const row = newGuess[currentRow];
                const emptyIndex = row.findIndex((cell) => cell === "");
                if (emptyIndex > 0) {
                    row[emptyIndex-1] = "";
                }
                else if (emptyIndex === -1){
                    row[4] = "";
                }
            return newGuess;
        });
    }

    typedLetter(letter: string, setGuess, currentRow) : void {
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