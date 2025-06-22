import { Application, type Ticker } from "pixi.js";
import "./style.css";
import Score from "./entities/Score";
import { initAssets } from "./scripts/assets";
import { audio } from "./scripts/audio";
import LoadScreen from "./screen/LoadScreen";
import Game from "./scripts/Game";

const application = new Application();
let scoreObj: Score;
await application.init({ resizeTo: window, backgroundColor: 0xefefef });

document.body.appendChild(application.canvas);
const loadScreen = new LoadScreen();

initAssets().then(async () => {

	loadScreen.dispose();
	document.addEventListener('visibilitychange', () => {
		if (document.visibilityState !== 'visible') {
			audio.muted(true);
		} else {
			audio.muted(false);
		}
	});

	const game = new Game(application);
	application.ticker.add((deltatime: Ticker) => {
		game.update(deltatime);
	});
});

export { application, scoreObj };