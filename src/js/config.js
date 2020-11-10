/**
 * interne Konfiguration
 */
Config = {
	fps: 60,
	jsFiles: [
		'lib/requestAnimationFrame.js',
		'src/player.js',
		'src/food.js',
		'src/controller.js',
		'src/layer.js'
	],
	player: {
		width: 10,
		height: 10
	},
	startPos: {
		top: 200,
		left: 250,
		direction: 'right'
	},

	controls: {
		27: 'esc',
		13: 'enter',
		37: 'left', // arrow left
		39: 'right', // arrow right
		40: 'down', // arrow down
		38: 'up' // space bar
	}
}