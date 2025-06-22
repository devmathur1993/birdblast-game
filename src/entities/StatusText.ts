import { GameText } from "../components/GameText";
import type Game from "../scripts/Game";
import { statusTextStyle } from "../style";

export default class StatusText {

    private game: Game;
    private text: GameText;

    constructor(game: Game) {
        this.game = game;
        this.text = new GameText("", statusTextStyle, { x: this.game.application.screen.width * 0.5, y: this.game.application.screen.height * 0.5 }, "gameStatus", { x: 0.5, y: 0.5 });
    }

    public showStatusText(t: string) {
        this.text.setText(t);
        this.game.addChild(this.text.displayObject);
    }

    public setPosition(x: number, y: number) {
        this.text.displayObject.position.set(x, y);
    }

    public removeStatusText(): void {
        this.game.currentScreen.removeChild(this.text.displayObject);
    }
}