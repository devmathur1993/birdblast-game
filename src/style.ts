import type { TextStyle } from "pixi.js";

export const scoreStyle: Partial<TextStyle> = {
	fontFamily: "Arial",
	fontSize: 20,
	fontWeight: "bold",
	fill: 0xffffff,
	stroke: {
		color: 0x4a1850,
		width: 5,
		join: "round"
	},
	dropShadow: {
		color: "0x000000",
		blur: 4,
		angle: 3.14 / 6,
		distance: 6,
		alpha: 1
	},
	wordWrap: true,
	wordWrapWidth: 440
}

export const loadTextStyle: Partial<TextStyle> = {
	fontFamily: "Arial",
	fontSize: 30,
	fontWeight: "bold",
	fill: 0xffffff,
	wordWrap: true,
	wordWrapWidth: 440
}


// Back layer (shadow/orange base)
export const shadowStyle: Partial<TextStyle> = {
	fontFamily: "LuckiestGuy-Regular",
	fontSize: 126,
	fontWeight: "bold",
	fill: "#ffaa00", // yellow-orange fill
	stroke: { color: 0xd68700, width: 8, join: "round" }
}

// Front layer (main white text)
export const frontStyle: Partial<TextStyle> = {
	fontFamily: "LuckiestGuy-Regular",
	fontSize: 120,
	fontWeight: "bold",
	fill: "#ffffff",
	stroke: { color: 0xffaa00, width: 6, join: "round" },
	dropShadow: { color: 0xffaa00, blur: 0, distance: 0, angle: 0, alpha: 1 },
	letterSpacing: 2,
}

export const startTextStyle: Partial<TextStyle> = {
	fontFamily: "LuckiestGuy-Regular",
	fontSize: 48,
	fontWeight: "normal",
	fill: "#ffffff",
	stroke: { color: 0xffaa00, width: 6, join: "round" },
	dropShadow: { color: 0xffaa00, blur: 0, distance: 0, angle: 0, alpha: 1 },
	letterSpacing: 2,
}

export const statusTextStyle: Partial<TextStyle> = {
	fontFamily: "LuckiestGuy-Regular",
	fontSize: 48,
	fontWeight: "normal",
	fill: "#ffffff",
	stroke: { color: 0x800080, width: 6, join: "round" },
	dropShadow: { color: 0x800080, blur: 0, distance: 0, angle: 0, alpha: 1 },
	letterSpacing: 2,
}


export const restartStyle: Partial<TextStyle> = {
	fontFamily: "Arial",
	fontSize: 20,
	fontWeight: "bold",
	fill: 0xffffff,
	stroke: {
		color: 0x4a1850,
		width: 5,
		join: "round"
	},
	wordWrap: true,
	wordWrapWidth: 440
}