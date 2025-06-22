import { Container, Sprite } from "pixi.js";
import type Game from "../scripts/Game";
import Panel from "../components/Panel";
import { GameText } from "../components/GameText";
import { restartStyle, statusTextStyle } from "../style";

export default class GameOverScreen extends Container {
    private game: Game;
    private bg: Sprite;
    constructor(game: Game) {
        super();
        this.game = game;
        this.label = "GameOverScreen";
        this.game = game;
        this.bg = Sprite.from('Landscape1_Orange');
    }

    public init(): void {

        this.bg.width = this.game.application.screen.width;
        this.bg.height = this.game.application.screen.height;
        this.game.statusText.setPosition(this.bg.width * 0.5, this.bg.height * 0.4);

        const panel = new Panel(this.game);
        panel.position.set(this.game.application.screen.width * 0.5, this.game.application.screen.height * 0.5)

        const scoreBox = new Container();
        scoreBox.label = "scorebox";

        const scoreLabel = new GameText("Score:", statusTextStyle, { x: panel.width * 0.16, y: panel.height * 0 }, "scoreLabel", { x: 1, y: 0.5 });
        const scoreValue = new GameText(this.game.scoreObj.totalScore.toString(), statusTextStyle, { x: panel.width * 0.2, y: panel.height * 0 }, "scoreValue", { x: 0, y: 0.5 });
        const missLabel = new GameText("Misses:", statusTextStyle, { x: panel.width * 0.16, y: panel.height * 0.2 }, "missLabel", { x: 1, y: 0.5 });
        const missValue = new GameText(this.game.scoreObj.misses.toString(), statusTextStyle, { x: panel.width * 0.2, y: panel.height * 0.2 }, "missValue", { x: 0, y: 0.5 });
        const restartLabel = new GameText("Press Enter to Restart", restartStyle, { x: this.bg.width * 0.5, y: this.bg.height * 0.8 }, "missValue", { x: 0.5, y: 0.5 });

        scoreBox.addChild(scoreLabel.displayObject, scoreValue.displayObject, missLabel.displayObject, missValue.displayObject);

        this.addChild(this.bg);
        this.addChild(panel);
        panel.addChild(scoreBox);
        this.addChild(restartLabel.displayObject);
        this.game.addChild(this);
    }

    public update(): void {

    }

    public dispose(): void {

    }
}