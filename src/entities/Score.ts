import { Container } from "pixi.js";
import { GameText } from "../components/GameText";
import { scoreStyle } from "../style";
import type Game from "../scripts/Game";

export default class Score extends Container {

    private score: number = 0;
    private miss: number = 0;
    private scorevalue!: GameText;
    private missValue!: GameText;
    private game: Game;

    constructor(game: Game) {
        super();
        this.game = game;
        this.label = "scoreContainer";
    }

    public addScoreToScreen(): void {
        const scoreText = new GameText("Total Hits:", scoreStyle, { x: 20, y: 20 }, "scoreLabel", { x: 0, y: 0 });
        this.scorevalue = new GameText(this.score.toString(), scoreStyle, { x: scoreText.displayObject.width + 15, y: 20 }, "scoreValue", { x: 0, y: 0 });
        const missText = new GameText("Miss:", scoreStyle, { x: 20, y: scoreText.displayObject.height + 20 }, "missLabel", { x: 0, y: 0 });
        this.missValue = new GameText(this.miss.toString(), scoreStyle, { x: missText.displayObject.width + 15, y: scoreText.displayObject.height + 20 }, "scoreValue", { x: 0, y: 0 });
        this.addChild(scoreText.displayObject, this.scorevalue.displayObject, missText.displayObject, this.missValue.displayObject);
        this.position.set(0, 0);
        this.game.currentScreen.addChild(this);
    }

    public removeScoreFromScreen(): void {
        this.game.currentScreen.removeChild(this);
    }

    increaseScore() {
        ++this.score;
        this.scorevalue.displayObject.text = this.score;
    }

    increaseMissValue() {
        this.miss++;
        this.missValue.displayObject.text = this.miss;
    }

    public resetValue(): void {
        this.miss = 0;
        this.score = 0;
    }

    public get misses() {
        return this.miss;
    }

    public get totalScore() {
        return this.score;
    }

}