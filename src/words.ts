import wordlist from "./assets/words.json";

/**
 * Ha nincs 'wordlist' adat a localStorage-ban, akkor beállítja azt a `wordlist` JSON fájlból.
 */
if (!localStorage.getItem('wordlist')) {
    // Csak akkor állítja be, ha még nem létezik 'wordlist' a localStorage-ban
    localStorage.setItem('wordlist', JSON.stringify(wordlist));
}

/**
 * A Words osztály kezeli a szavak listáját és a játék megoldásának logikáját.
 * Kezeli a szavak hozzáadását, eltávolítását és érvényesítését, valamint a szavak összehasonlítását.
 */
export class Words {
    private words: string[]; // A szavak listája
    private solution: string; // A játék megoldása (a kiválasztott szó)
    private wordLength: number; // A szavak hossza

    /**
     * Konstruktor, amely inicializálja a szavak listáját a localStorage-ból,
     * beállítja a kívánt szóhosszt és kiválaszt egy kezdő szót.
     * @param wordLength - A szó hossza, amelyet a játék használ.
     */
    constructor(wordLength: number) {
        this.words = JSON.parse(localStorage.getItem('wordlist'));
        this.wordLength = wordLength;
        this.solution = this.pickWord();
    }

    /**
     * Beállítja a játék megoldását.
     * @param solution - Az új megoldás (szó).
     */
    setSolution(solution: string) {
        this.solution = solution;
        console.log(this.solution);
    }

    /**
     * Beállítja a szó hosszát, amelyet a játékban használni kell.
     * @param wordLength - A szó új hossza.
     */
    setWordLength(wordLength: number) {
        this.wordLength = wordLength;
    }

    /**
     * Visszaadja az összes szót a szavak listájából.
     * @returns A szavak listája.
     */
    getWords(): string[] {
        return this.words;
    }

    /**
     * Visszaadja a jelenlegi megoldást (szót).
     * @returns A játék megoldása (szó).
     */
    getSolution(): string {
        return this.solution;
    }

    /**
     * Ellenőrzi, hogy egy szó szerepel-e az aktuális szólistában.
     * @param word - A validálandó szó.
     * @returns Igaz, ha a szó érvényes, hamis, ha nem.
     */
    validWord(word: string): boolean {
        return this.words[String(this.wordLength)].includes(word.toLowerCase());
    }

    /**
     * Véletlenszerűen választ egy szót a szavak listájából.
     * @returns Egy véletlenszerűen kiválasztott szó.
     */
    pickWord(): string {
        return this.words[String(this.wordLength)][Math.floor(Math.random() * this.words[String(this.wordLength)].length)];
    }

    /**
     * Összehasonlítja a játékos által beadott szót a megoldással,
     * és visszaad egy színes kódú tömböt (fehér, zöld, sárga vagy szürke).
     * @param word - A játékos által beadott szó.
     * @returns Egy tömb, amely tartalmazza az összehasonlítás eredményét színkódokkal.
     */
    compare(word: string): string[] {
        let comp = Array(this.wordLength).fill("white");
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

    /**
     * Újra választ egy véletlenszerű szót, hogy frissítse a játék megoldását.
     */
    public resetSolution(): void {
        this.solution = this.pickWord();
        console.log(this.solution);
    }

    /**
     * Visszaadja az aktuális szó hosszát.
     * @returns Az aktuális szó hossz.
     */
    getWordLength(): number {
        return this.wordLength;
    }

    /**
     * Hozzáad egy új szót a szólistához.
     * @param word - Az új szó, amelyet hozzá szeretnénk adni.
     */
    public addWord(word: string): void {
        word = word.toLowerCase();
        let length = word.length;
        if (length > 8 || length < 3) {
            alert("word invalid length");
            return;
        }
        if (this.words[String(length)].includes(word)) {
            alert("word already exists");
            return;
        }
        
        this.words[String(length)].push(word);
        localStorage.setItem("wordlist", JSON.stringify(this.words));
    }

    /**
     * Eltávolít egy szót a szólistából.
     * @param word - Az eltávolítandó szó.
     */
    public removeWord(word: string): void {
        word = word.toLowerCase();
        let length = word.length;
        if (length > 8 || length < 3) {
            alert("word invalid length");
            return;
        }
        if (!this.words[String(length)].includes(word)) {
            alert("word does not exist");
            return;
        }
        this.words[String(length)].splice(this.words[String(length)].indexOf(word), 1);
        localStorage.setItem("wordlist", JSON.stringify(this.words));
    }
}
