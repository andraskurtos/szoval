import dailies from './assets/dailies.json';

if (!localStorage.getItem('dailies')) {
    // Only set it if 'wordlist' doesn't already exist in localStorage
    localStorage.setItem('dailies', JSON.stringify(dailies));
}

export class DailyChallenge {

    private launchDate: Date = new Date("2024-12-04T20:00:00");
    private today: Date = new Date();
    private challenge;
    private tries : number;
    private wordLength: number;
    private solution: string;
    private solved: boolean;
    private diff = Math.floor((this.today.getTime()-this.launchDate.getTime()) / (1000 * 60 * 60 * 24));
    private dailies = JSON.parse(localStorage.getItem('dailies'));
    
    constructor() {
        this.challenge = this.dailies[this.diff];
        this.tries= Number(this.challenge["tries"]);
        this.wordLength= Number(this.challenge["wordLength"]);
        this.solution= this.challenge["solution"];
        this.solved = this.challenge["solved"];
    }

    isSolved(): boolean {
        return this.solved;
    }

    getTries(): number {
        return this.tries;
    }

    getWordLength(): number {
        return this.wordLength;
    }

    getSolution(): string {
        return this.solution;
    }

    setSolved(solved: boolean): void {
        this.solved = solved;
        this.challenge["solved"] = solved;
        this.dailies[this.diff] = this.challenge;
        localStorage.setItem('dailies', JSON.stringify(this.dailies));
    }

}