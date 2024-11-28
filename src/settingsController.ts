


export class SettingsController {
    private difficulty = "normal";
    private wordLength = 5;
    private tries = 6;
    private setWordLength: (prev) => void;
    private setTries: (prev) => void;

    constructor(setWordLength: (prev) => void, setTries: (prev) => void) {
        this.setWordLength = setWordLength;
        this.setTries = setTries;
    }

    public addWord(word: string) {
        let words = JSON.parse(localStorage.getItem("wordlist"));
        if (words.includes(word)) {
            console.log("word already exists");
            return;
        }
        words.push(word);
        
        localStorage.setItem("wordlist", JSON.stringify(words));
    }
    
    public removeWord(word: string) {
        let words = JSON.parse(localStorage.getItem("wordlist"));
        if (!words.includes(word)) {
            console.log("word does not exist");
            return;
        }
        words = words.filter((w) => w !== word);
        localStorage.setItem("wordlist", JSON.stringify(words));
    }

    public setDifficulty(difficulty: string) {
        this.difficulty = difficulty;
        console.log(`set difficulty to ${difficulty}`);
        switch (difficulty) {
            case "easy":
                this.wordLength = 5;
                this.tries = 8;
                break;
            case "normal":
                this.wordLength = 5;
                this.tries = 6;
                break;
            case "hard":
                this.wordLength = 5;
                this.tries = 4;
                break;
            case "custom":
                this.wordLength = 10;
                this.tries = 5;
                break;
        }
        this.setWordLength(this.wordLength);
        this.setTries(this.tries);
    }


}