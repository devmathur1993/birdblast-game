import { Texture } from "pixi.js";
import MakeAnimation from "../utils/MakeAnimation";
import type { Position } from "../types";
import { application } from "../main";
import { sfx } from "../scripts/audio";

export class Explosion {
    private explosion: MakeAnimation;

    constructor(position: Position, scale: number) {
        const texture: Texture | null | undefined = Texture.from("boom");

        if (!texture) {
            throw new Error(`No sprite found for Raven`);
        }

        this.explosion = new MakeAnimation(texture, "boom", scale, 0.2, false, position);
        sfx.play("audio/blast.wav");
        this.explosion.animation.onComplete = () => {
            this.explosion.animation.destroy();
        }
        application.stage.addChild(this.explosion.animation);
    }
}