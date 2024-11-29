import { Words } from "./logic";



export class SettingsController {
    private difficulty = "normal";
    private wordLength = 5;
    private tries = 6;
    private setWordLength: (prev) => void;
    private setTries: (prev) => void;
    private isDarkMode = false;
    private words;

    constructor(setWordLength: (prev) => void, setTries: (prev) => void, words: Words) {
        this.setWordLength = setWordLength;
        this.setTries = setTries;
        this.words = words;
    }

    public addWord(word: string) {
        this.words.addWord(word);
    }
    
    public removeWord(word: string) {
        this.words.removeWord(word);
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

    public toggleTheme = () => {
        const root = document.documentElement;
        console.log("toggle theme");
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

}