import { Container, RenderTexture, Sprite, Texture, TilingSprite } from "pixi.js";
import { application } from "../main";
import type Game from "../scripts/Game";

export class Background extends Container {
    public tiledBg: TilingSprite;
    private game: Game
    constructor(game: Game) {
        super();
        this.game = game;
        const baseTexture = Sprite.from("bgLayer-1");
        baseTexture.scale.set(0.75);
        const upperLayer = new Container();

        for (let i = 2; i < 8; i++) {
            const layer = Sprite.from(`bgLayer-${i}`);
            upperLayer.addChild(layer);
        }

        const bounds = upperLayer.getBounds();
        const renderTexture = RenderTexture.create({ width: bounds.width, height: bounds.height })
        this.game.application.renderer.render(upperLayer, { renderTexture });
        const combinedSprite = new Texture(renderTexture);
        this.tiledBg = new TilingSprite({ texture: combinedSprite, width: application.screen.width, height: application.screen.height });
        this.tiledBg.tileScale.set(0.75);
        this.addChild(baseTexture, this.tiledBg);
        this.game.currentScreen.addChild(this);
    }

    public get bg() {
        return this.tiledBg;
    }
}