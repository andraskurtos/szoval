export class Statistics {
    private average: number;
    private games: number;
    private wins: number;
    private losses: number;
    private winrate: number;

    constructor() {
        let statsdict = JSON.parse(localStorage.getItem('stats'));
        if (statsdict == null) {
            this.average = 0;
            this.games = 0;
            this.wins = 0;
            this.losses = 0;
            this.winrate = 0;
        } else {
            this.average = statsdict.average;
            this.wins = statsdict.wins;
            this.losses = statsdict.losses;
            this.winrate = this.wins / this.games;
            this.games = statsdict.games;
        }
    }

    public addRound(currentRound: number, win: boolean) {
        console.log("add round");
        this.games++;
        if (win) {
            this.wins += 1;
        } else {
            this.losses += 1;
        }
        this.winrate = this.games===0?0:this.wins / this.games;
        console.log(this.winrate);
        this.average = (this.average*(this.games-1)+currentRound) / this.games;
        localStorage.setItem('stats', JSON.stringify(this.getStats()));
    }

    public getStats() {
        return {
            games: this.games,
            wins: this.wins,
            losses: this.losses,
            winrate: this.winrate,
            average: this.average
        }
    }
}