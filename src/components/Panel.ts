import { Container, Rectangle, Sprite, Texture } from "pixi.js";
import type Game from "../scripts/Game";

export default class Panel extends Container {

    private panel: Sprite;
    private game: Game;

    constructor(game: Game) {
        super();
        this.game = game;
        const texture = Texture.from("gui");
        const rectangle = new Rectangle(183, 273, 270, 210);
        const panelTexture = new Texture({ source: texture.source, frame: rectangle });
        this.panel = new Sprite(panelTexture);
        this.panel.anchor.set(0.5);
        this.panel.scale.set(1.5);
        this.addChild(this.panel);
    }
}