import { Text, type TextStyle } from "pixi.js";
import type { Position } from "../types";

export class GameText {

    private text: Text;

    constructor(textString: string, style: Partial<TextStyle>, position: Position, label: string, anchor: Position) {
        this.text = new Text({
            text: textString,
            style,
        });
        this.text.label = label;
        this.text.anchor.set(anchor.x, anchor.y);
        this.text.position.set(position.x, position.y);
    }

    public get displayObject(): Text {
        return this.text;
    }

    public setText(t: string): void {
        this.text.text = t;
    }
}
