import type { Ticker } from "pixi.js";
import type { GameState } from "../types";
import type Game from "./Game";
import Raven from "../entities/Raven";
import GameScreen from "../screen/GameScreen";
import GameOverScreen from "../screen/GameOverScreen";
import StartScreen from "../screen/StartScreen";

class State {
    protected state: string | null = null;
    protected static prevState: string | null = null;
    constructor(state: string) {
        this.state = state;
    }
}

export class InitialState extends State implements GameState {

    private game: Game;
    constructor(game: Game) {
        super("init");
        this.game = game;
    }

    enter(): void {
        this.game.init();
        State.prevState = "init";
    }

    update(deltatime: Ticker): void {
    }
    handleInput(key: string): void {
        console.log(key)
        if (key === "Enter") {

            this.game.setState(new RunningState(this.game), new GameScreen(this.game));
        }
    }
}

export class RunningState extends State implements GameState {
    private game: Game;
    constructor(game: Game) {
        super("running");
        this.game = game;
    }

    enter(): void {
        if (State.prevState === "init") {
            this.game.startLevel();
        }
        this.game.statusText.removeStatusText();
        State.prevState = "running";
    }

    update(deltatime: Ticker): void {
        this.game.currentScreen.update(deltatime);
        this.game.timeToNextRaven += deltatime.deltaMS;

        if (this.game.timeToNextRaven > this.game.ravenInterval) {
            this.game.timeToNextRaven = 0;
            this.game.ravens.push(new Raven(this.game));
            this.game.ravens.sort((a, b) => a.scale - b.scale);
        }

        [...this.game.ravens].forEach((obj) => !obj.makedForDeletion && obj.update());
        this.game.ravens = this.game.ravens.filter((obj) => !obj.makedForDeletion);

        if (this.game.scoreObj.misses > 2) {
            this.game.setState(new GameOverState(this.game), new GameOverScreen(this.game));
        }
    }

    handleInput(key: string): void {
        if (key === ' ') {
            this.game.setState(new PausedState(this.game), this.game.currentScreen);
        }
    }
}

export class PausedState extends State implements GameState {
    private game: Game;

    constructor(game: Game) {
        super("paused");
        this.game = game;
    }

    enter(): void {
        this.game.statusText.showStatusText('Paused');
        State.prevState = "Paused";
    }

    update(deltatime: Ticker): void { }

    handleInput(key: string): void {

        if (key.toLowerCase() === ' ') {
            this.game.setState(new RunningState(this.game), this.game.currentScreen);
        }
    }
}

export class GameOverState extends State implements GameState {
    private game: Game
    constructor(game: Game) {
        super("gameOver")
        this.game = game;
    }

    enter() {
        this.game.startLevel();
        this.game.statusText.showStatusText('Game Over');
        this.game.gameOver();
        State.prevState = "gameOver";
    }

    update(deltatime: Ticker): void { }

    handleInput(key: string): void {
        console.log(key)
        if (key === 'Enter') {
            this.game.setState(new InitialState(this.game), new StartScreen(this.game));
        }
    }
}