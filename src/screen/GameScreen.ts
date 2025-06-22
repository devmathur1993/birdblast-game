import { Container, type Ticker } from "pixi.js";
import type Game from "../scripts/Game";
import { Background } from "../components/Background";

export default class GameScreen extends Container {

    private game: Game;
    public background!: Background;
    constructor(game: Game) {
        super();
        this.game = game;
        this.label = "GameSreen";
    }

    public init(): void {
        this.game.addChild(this);
        this.background = new Background(this.game);
        this.game.scoreObj.addScoreToScreen();
    }

    public update(deltatime: Ticker): void {
        this.background.bg.tilePosition.x += 5;
    }

    public dispose(): void {
        this.game.removeChildren();
        this.destroy();
    }
}