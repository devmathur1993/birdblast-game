import { AnimatedSprite, Rectangle, Texture } from "pixi.js";
import spritesData from "../../public/sprites.json" assert {type: 'json'};
import type { SpriteMetaMap } from "../types";

export default class MakeAnimation {
    public animation!: AnimatedSprite;

    private texture: Texture;
    private spriteData: SpriteMetaMap[string];
    public spriteWidth: number = 0;
    public spriteHeight: number = 0;

    constructor(texture: Texture, name: string, scale: number, animSpeed: number = 1, loop: boolean = true, position: { x: number, y: number }) {

        const data = (spritesData as SpriteMetaMap)[name];
        if (!data) {
            throw new Error(`No sprite data found for ${name}`);
        }

        this.texture = texture;
        this.spriteData = data;
        this.spriteWidth = this.texture.frame.width / this.spriteData.frames;
        this.spriteHeight = this.texture.frame.height;

        const frames: Texture[] = [];

        for (let i = 0; i < this.spriteData.frames; i++) {
            frames.push(new Texture({ source: this.texture.source, frame: new Rectangle(i * this.spriteWidth + this.texture.frame.x, this.texture.frame.y, this.spriteWidth, this.spriteHeight) }));
        }
        this.animation = new AnimatedSprite(frames);

        this.animation.animationSpeed = animSpeed;
        this.animation.scale.set(scale);
        this.animation.anchor.set(0.5);
        this.animation.position.set(position.x, position.y);
        this.animation.loop = loop;
        this.animation.play();
    }

}