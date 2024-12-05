import { Words } from "./logic";



export class SettingsController {
    private wordLength;
    private tries;
    private setWordLength: (prev) => void;
    private setTries: (prev) => void;
    private isDarkMode = false;
    private words;
    private difficulty;

    constructor(setWordLength: (prev) => void, setTries: (prev) => void, words: Words, tries: number, wordLength: number) {
        this.setWordLength = setWordLength;
        this.setTries = setTries;
        this.words = words;
        this.wordLength = wordLength;
        this.tries = tries;
        if (this.wordLength === 5) {
            if (this.tries === 8) {
                this.difficulty = "easy";
            } else if (this.tries === 6) {
                this.difficulty = "normal";
            } else if (this.tries === 4) {
                this.difficulty = "hard";
            }
            else {
                this.difficulty = "custom";
            }
        }
        else {
            this.difficulty = "custom";
        }
    }

    public addWord(word: string) {
        this.words.addWord(word);
    }

    public removeWord(word: string) {
        this.words.removeWord(word);
    }

    public setDifficulty(difficulty: string) {
        this.difficulty = difficulty;
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
                return;
        }
        this.setWordLength(this.wordLength);
        this.words.changeWordLength(this.wordLength);
        this.setTries(this.tries);
    }

    public getDifficulty() {
        return this.difficulty;
    }

    public toggleTheme = () => {
        const root = document.documentElement;
        this.isDarkMode = !this.isDarkMode;
        if (this.isDarkMode) {
            root.style.setProperty('--background-color', '#222222'); // Sötét háttér
            root.style.setProperty('--active-bgcolor', '#00A500'); // Zöld helyett világosabb zöld
            root.style.setProperty('--active-hover-bgcolor', '#007A00'); // Sötétebb zöld
            root.style.setProperty('--active-color', 'white'); // Fehér helyett fekete
            root.style.setProperty('--inactive-bgcolor', '#333333'); // Fehér helyett sötétebb szürke
            root.style.setProperty('--inactive-hover-bgcolor', '#444444'); // Egy árnyalatnyi sötétebb
            root.style.setProperty('--inactive-color', 'white'); // Fehér betűk
            root.style.setProperty('--border-color', '#808080'); // Világos szürke
            root.style.setProperty('--shadow-color', '#505050'); // Sötétebb szürke
            root.style.setProperty('--emptycell-bgcolor', '#222222'); // Sötétebb háttér
            root.style.setProperty('--emptycell-hover-bgcolor', '#444444'); // Kicsit világosabb hover
            root.style.setProperty('--emtycell-color', 'white'); // Fehér szöveg
            root.style.setProperty('--correctcell-bgcolor', '#007A00'); // Zöld helyett sötétebb zöld
            root.style.setProperty('--correctcell-hover-bgcolor', '#005700'); // Nagyon sötét zöld hover
            root.style.setProperty('--correctcell-color', 'white'); // Fehér szöveg
            root.style.setProperty('--incorrectcell-bgcolor', '#555555'); // Sötét szürke háttér
            root.style.setProperty('--incorrectcell-hover-bgcolor', '#333333'); // Kicsit világosabb hover
            root.style.setProperty('--incorrectcell-color', 'white'); // Fehér szöveg
            root.style.setProperty('--semicorrectcell-bgcolor', '#CC8A00'); // Sötétebb sárga
            root.style.setProperty('--semicorrectcell-hover-bgcolor', '#B88A00'); // Sötétebb sárga hover
            root.style.setProperty('--semicorrectcell-color', 'white'); // Fehér szöveg

        } else {
            root.style.setProperty('--background-color', '#f0f0f0');
            root.style.setProperty('--active-bgcolor', 'green');
            root.style.setProperty('--active-hover-bgcolor', '#00A500');
            root.style.setProperty('--active-color', 'white');
            root.style.setProperty('--inactive-bgcolor', 'white');
            root.style.setProperty('--inactive-hover-bgcolor', '#dddddd');
            root.style.setProperty('--inactive-color', 'black');
            root.style.setProperty('--border-color', '#d3d3d3');
            root.style.setProperty('--shadow-color', '#c0c0c0');
            root.style.setProperty('--emptycell-bgcolor', 'white');
            root.style.setProperty('--emptycell-hover-bgcolor', '#dddddd');
            root.style.setProperty('--emtycell-color', 'black');
            root.style.setProperty('--correctcell-bgcolor', 'green');
            root.style.setProperty('--correctcell-hover-bgcolor', '#00A500');
            root.style.setProperty('--correctcell-color', 'white');
            root.style.setProperty('--incorrectcell-bgcolor', 'gray');
            root.style.setProperty('--incorrectcell-hover-bgcolor', '#A0A0A0');
            root.style.setProperty('--incorrectcell-color', 'white');
            root.style.setProperty('--semicorrectcell-bgcolor', '#E6C400');
            root.style.setProperty('--semicorrectcell-hover-bgcolor', '#FFD700');
            root.style.setProperty('--semicorrectcell-color', 'white');
        }
    };

    public changeTries(tries: number): void {
        if (tries > 12) this.tries = 12;
        else if (tries<1) this.tries = 1;
        else this.tries = tries;
        this.setTries(this.tries);
    };

    public changeWordLength(wordLength: number): void {
        if (wordLength > 8) this.wordLength = 8;
        else if (wordLength < 2) this.wordLength = 2;
        else this.wordLength = wordLength;
        this.setWordLength(this.wordLength);
        this.words.setWordLength(this.wordLength);
    };

    public getWordLength(): number {
        return this.wordLength;
    }

    public getTries(): number {
        return this.tries;
    }   
}