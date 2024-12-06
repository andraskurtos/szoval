/**
 * A Statistics osztály kezeli a játék statisztikákat, mint a nyert és vesztett játékok számát,
 * a játékok átlagos számát, és a győzelmi arányt. Az adatokat a böngésző `localStorage`-ában tárolja.
 */
export class Statistics {
    private average: number; // Az átlagos próbálkozások száma egy játékban
    private games: number; // A teljes játékok száma
    private wins: number; // A nyert játékok száma
    private losses: number; // A vesztett játékok száma
    private winrate: number; // A győzelmi arány

    /**
     * A konstruktor betölti a statisztikákat a `localStorage`-ból, ha léteznek.
     * Ha nincs mentett adat, akkor alapértelmezett értékeket állít be.
     */
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
            this.games = statsdict.games;
            this.winrate = this.wins / this.games;
        }
    }

    /**
     * Hozzáad egy új játékot a statisztikákhoz, és frissíti a győzelmek, vesztések és az átlagos próbálkozások számát.
     * @param currentRound - Az aktuális játékban végzett próbálkozások száma.
     * @param win - Igaz, ha a játékot megnyerték, hamis, ha veszítettek.
     */
    public addRound(currentRound: number, win: boolean) {
        this.games++;
        if (win) {
            this.wins += 1;
        } else {
            this.losses += 1;
        }
        this.winrate = this.games === 0 ? 0 : this.wins / this.games;
        this.average = (this.average * (this.games - 1) + currentRound) / this.games;
        localStorage.setItem('stats', JSON.stringify(this.getStats()));
    }

    /**
     * Visszaadja a jelenlegi statisztikákat.
     * @returns Egy objektum, ami tartalmazza a játékok számát, nyert és vesztett játékokat,
     *          a győzelmi arányt és az átlagos próbálkozások számát.
     */
    public getStats() {
        return {
            games: this.games,
            wins: this.wins,
            losses: this.losses,
            winrate: this.winrate,
            average: this.average
        };
    }
}
