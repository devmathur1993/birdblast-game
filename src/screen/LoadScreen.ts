import { Container, Graphics } from "pixi.js";
import { GameText } from "../components/GameText";
import { application } from "../main";
import { loadTextStyle } from "../style";

export default class LoadScreen extends Container {
    private loadingText: GameText;
    private bg: Graphics = new Graphics();
    private dotCount = 0;
    private baseText = "Loading";

    constructor() {
        super();
        this.bg.rect(0, 0, application.screen.width, application.screen.height).fill(0x000000);
        this.loadingText = new GameText(
            this.baseText,
            loadTextStyle,
            { x: application.screen.width * 0.5, y: application.screen.height * 0.5 },
            "loading",
            { x: 0, y: 0 }
        );
        this.loadingText.displayObject.position.x -= this.loadingText.displayObject.width * 0.5
        this.addChild(this.bg);
        this.addChild(this.loadingText.displayObject);
        application.stage.addChild(this);
        application.ticker.add(this.animateLoading.bind(this));
    }

    public init(): void {

    }

    public update(): void {

    }

    private animateLoading() {
        this.dotCount += 0.05;
        const dots = ".".repeat(Math.floor(this.dotCount) % 4); // "", ".", "..", "..."
        this.loadingText.displayObject.text = this.baseText + dots;
    }

    public dispose() {
        application.ticker.remove(this.animateLoading);
        this.destroy();
    }
}