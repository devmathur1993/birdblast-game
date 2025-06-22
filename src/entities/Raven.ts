import { Texture } from "pixi.js"
import { application } from "../main";
import MakeAnimation from "../utils/MakeAnimation";
import { Explosion } from "../components/Explosion";
import { sfx } from "../scripts/audio";
import type Game from "../scripts/Game";

export default class Raven {

    public raven: MakeAnimation;
    private height: number = 100;
    private x: number = application.canvas.width;
    private y: number = Math.random() * ((application.canvas.height * 0.9) - this.height + 1) + this.height;
    private directionX: number = Math.random() * 5 + 3;
    private directionY: number = Math.random() * 5 - 2.5;
    public makedForDeletion: boolean = false;
    public scale = Math.random() * (0.7 - 0.3) + 0.3;
    private game: Game;

    constructor(game: Game) {
        this.game = game;
        const texture: Texture | null | undefined = Texture.from("raven");

        if (!texture) {
            throw new Error(`No sprite found for Raven`);
        }

        const animSpeed = Math.random() * (0.9 - 0.4) + 0.4;
        this.raven = new MakeAnimation(texture, "raven", this.scale, animSpeed, true, { x: this.x, y: this.y });
        sfx.play("audio/crow_caw.wav", { volume: 0.5 });
        this.game.currentScreen.addChild(this.raven.animation);
        this.raven.animation.interactive = true;

        this.raven.animation.on('pointerdown', (e) => {
            this.makedForDeletion = true;
            new Explosion({ x: e.clientX, y: e.clientY }, this.scale);
            this.raven.animation.destroy();
            this.game.scoreObj.increaseScore();
        })
    }

    public update() {
        if (this.raven.animation.position.y - this.raven.spriteHeight * 0.5 < 0 || this.raven.animation.position.y + this.raven.spriteHeight > application.screen.height) {
            this.directionY *= -1;
        }

        this.raven.animation.position.x -= this.directionX;
        this.raven.animation.position.y += this.directionY;

        if (this.raven.animation.position.x + this.raven.animation.width * 0.5 < 0) {
            this.makedForDeletion = true;
            this.raven.animation.destroy();
            this.game.scoreObj.increaseMissValue();
        }
    }
}