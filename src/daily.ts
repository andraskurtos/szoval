import dailies from './assets/dailies.json';

if (!localStorage.getItem('dailies')) {
    // Only set it if 'wordlist' doesn't already exist in localStorage
    localStorage.setItem('dailies', JSON.stringify(dailies));
}

/**
 * Class representing a daily challenge, storing challenge data and tracking its status.
 * It initializes based on the current date and the launch date, providing various methods 
 * to get and update daily challenge details.
 */
export class DailyChallenge {

    private launchDate: Date = new Date("2024-12-04T20:00:00");
    private today: Date = new Date();
    private challenge;
    private tries: number;
    private wordLength: number;
    private solution: string;
    private solved: boolean;
    private diff = Math.floor((this.today.getTime() - this.launchDate.getTime()) / (1000 * 60 * 60 * 24));
    private dailies = JSON.parse(localStorage.getItem('dailies'));

    /**
     * Initializes the daily challenge based on the current date.
     * Fetches challenge details from local storage based on the difference 
     * in days since the launch date.
     */
    constructor() {
        this.challenge = this.dailies[this.diff];
        this.tries = Number(this.challenge["tries"]);
        this.wordLength = Number(this.challenge["wordLength"]);
        this.solution = this.challenge["solution"];
        this.solved = this.challenge["solved"];
    }

    /**
     * Returns whether the challenge has been solved.
     *
     * @returns {boolean} True if the challenge is solved, otherwise false.
     */
    isSolved(): boolean {
        return this.solved;
    }

    /**
     * Returns the number of tries allowed for the current challenge.
     *
     * @returns {number} The number of tries for the challenge.
     */
    getTries(): number {
        return this.tries;
    }

    /**
     * Returns the required word length for the current challenge.
     *
     * @returns {number} The word length for the challenge.
     */
    getWordLength(): number {
        return this.wordLength;
    }

    /**
     * Returns the solution for the current challenge.
     *
     * @returns {string} The solution for the challenge.
     */
    getSolution(): string {
        return this.solution;
    }

    /**
     * Sets the challenge as solved or unsolved and updates local storage.
     *
     * @param {boolean} solved - Whether the challenge is solved.
     */
    setSolved(solved: boolean): void {
        this.solved = solved;
        this.challenge["solved"] = solved;
        this.dailies[this.diff] = this.challenge;
        localStorage.setItem('dailies', JSON.stringify(this.dailies));
    }
}
