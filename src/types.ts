import type { TextDropShadow, Texture, Ticker } from "pixi.js";

export type SpriteMeta = {
    frames: number;
}

export type SpriteMetaMap = {
    [key: string]: SpriteMeta;
}

export type Position = {
    x: number;
    y: number;
}

export type StrokeStyle = {
    color: string; // Hex color as string, e.g. "0xffffff"
    width: number;
    join: string;// PIXI.TextStyleJoin values
};

export type DropShadowStyle = {
    color: string; // Hex color as string, e.g. "0x000000"
    blur: number;
    angle: string; // If you prefer this as a number: use number
    distance: number;
};

export type TextStyle = {
    fontFamily: string;
    fontSize: number;
    fontWeight: string;
    fill: string; // Hex color as string, e.g. "0xffffff"
    stroke: Partial<StrokeStyle>;
    dropShadow: Partial<TextDropShadow>
    wordWrap: boolean;
    wordWrapWidth: number;
};

export type StyleMap = {
    [key: string]: Partial<TextStyle>;
};
export type TextStyleMap = Record<string, TextStyle>;

export type TilingSpriteType = { texture: Texture, width: number, height: number }

export const GAMECURRENTSTATE = {
    INIT: 0,
    RUNNING: 1,
    PAUSED: 2,
    GAME_OVER: 3
}

export interface GameState {
    enter(): void;
    update(deltatime: Ticker): void;
    handleInput(key: string): void;
}
