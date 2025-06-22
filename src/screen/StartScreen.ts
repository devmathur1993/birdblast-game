import { Container, Sprite } from "pixi.js";
import { GameText } from "../components/GameText";
import { frontStyle, shadowStyle, startTextStyle } from "../style";
import gsap from "gsap";
import type Game from "../scripts/Game";

export default class StartScreen extends Container {
    private bg: Sprite;
    private game: Game;
    private layeredText: Container;
    private tween!: gsap.core.Tween;

    constructor(game: Game) {
        super();
        this.label = "StartScreen";
        this.game = game;
        this.bg = Sprite.from('Landscape1_Orange');
        this.layeredText = new Container();
    }

    public init() {
        this.bg.width = this.game.application.screen.width;
        this.bg.height = this.game.application.screen.height;

        const shadowText = new GameText(
            "Bird Blast",
            shadowStyle,
            { x: this.game.application.screen.width * 0.51, y: this.game.application.screen.height * 0.41 },
            "shadowText",
            { x: 0.5, y: 0.5 }
        );

        const frontText = new GameText(
            "Bird Blast",
            frontStyle,
            { x: this.game.application.screen.width * 0.5, y: this.game.application.screen.height * 0.4 },
            "frontText",
            { x: 0.5, y: 0.5 }
        );

        const startText = new GameText(
            "Start",
            startTextStyle,
            { x: this.game.application.screen.width * 0.5, y: this.game.application.screen.height * 0.6 },
            "frontText",
            { x: 0.5, y: 0.5 }
        );

        this.layeredText.addChild(shadowText.displayObject);
        this.layeredText.addChild(frontText.displayObject);

        this.addChild(this.bg);
        this.addChild(this.layeredText);
        this.addChild(startText.displayObject)
        this.game.addChild(this);

        this.tween = gsap.to(startText.displayObject.scale, {
            x: 1.25,
            y: 1.25,
            duration: 0.75,
            repeat: -1,
            yoyo: true
        });
    }

    public update(): void {

    }

    public dispose() {
        gsap.killTweensOf(this.tween);
        // this.off("pointerdown", this.showLevelOne)
        this.game.removeChildren();
        this.destroy();
    }
}