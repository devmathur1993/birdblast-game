import { Container, type Application, type Ticker } from "pixi.js";
import StartScreen from "../screen/StartScreen";
import Raven from "../entities/Raven";
import { bgm } from "./audio";
import Score from "../entities/Score";
import type { GameState } from "../types";
import { InitialState } from "./GameStateController";
import type statusText from "../entities/StatusText";
import StatusText from "../entities/StatusText";
import type LoadScreen from "../screen/LoadScreen";
import type GameScreen from "../screen/GameScreen";
import type GameOverScreen from "../screen/GameOverScreen";

export default class Game extends Container {

    public application: Application;
    public scoreObj: Score;
    public statusText: statusText;
    public ravens: Raven[] = [];
    public timeToNextRaven = 0;
    public ravenInterval = 500;
    private gameState!: GameState;
    public currentScreen!: (LoadScreen | StartScreen | GameScreen | GameOverScreen);

    constructor(application: Application) {
        super();
        this.label = "game";
        this.application = application;
        this.statusText = new StatusText(this);
        this.setState(new InitialState(this), new StartScreen(this))
        this.scoreObj = new Score(this);
        this.application.stage.addChild(this);
        window.addEventListener('keydown', (e) => this.gameState.handleInput(e.key));
    }

    public init(): void {
        this.currentScreen.init();
    }

    public startLevel(): void {
        this.currentScreen.init();
        bgm.play("audio/music.mp3");
    }

    public update(deltatime: Ticker): void {
        this.gameState.update(deltatime);
    }

    public gameOver() {
        console.log("game over");

        [...this.ravens].forEach((obj) => {
            obj.raven.animation.stop();
            obj.raven.animation.destroy();
        });

        this.ravens.splice(0, this.ravens.length);
        this.scoreObj.resetValue();
    }

    public gameReset() {
        this.scoreObj.resetValue();
        this.children.forEach(child => child.destroy());
    }

    public setState(state: GameState, screen: (LoadScreen | StartScreen | GameScreen | GameOverScreen)): void {
        if (this.currentScreen) {
            this.currentScreen.dispose();
        }
        this.currentScreen = screen;
        this.gameState = state;
        this.gameState.enter();
    }

}