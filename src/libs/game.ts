import Phaser from 'phaser';
import * as TWEEN from '@tweenjs/tween.js';
import gameUtil from '@libs/util/game-util';
import CONSTANT from '../../constant';
import { initPacky } from '@libs/characters/Packy';

export class Game {
	private game?: Phaser.Game | undefined;
	private contentContainer?: Phaser.GameObjects.Container;
	private requestAnimationId = -1;

	preload(): void {}

	create(): void {
		this.game = new Phaser.Game({
			type: Phaser.AUTO,
			width: CONSTANT.CANVAS.WIDTH,
			height: CONSTANT.CANVAS.HEIGHT,
			// backgroundColor: '#003bd5',
			physics: {
				default: 'arcade',
				arcade: {
					gravity: { y: 0 },
					debug: true,
				},
			},
			parent: 'game-container',
			scene: {
				preload: this.gamePreload.bind(this),
				create: this.gameCreate.bind(this),
				// update: this.gameUpdate.bind(this),
			},
		});
		this.game.canvas.classList.add('GameContainer');
		initPacky();
	}

	resize() {
		// resize
	}
	destroy() {
		// destroy
		if (this.contentContainer) {
			this.contentContainer.removeAll(true);
		}
	}

	getScene(): Phaser.Scene {
		if (!this.game) throw new Error('Not found game.');
		return <Phaser.Scene>this.game.scene.getAt(0);
	}

	gamePreload(): void {
		const scene = this.getScene();
		console.log('gamePreload');
		scene.load.audio(CONSTANT.SOUND_LIST.CONFIRM.key, CONSTANT.SOUND_LIST.CONFIRM.src);
		scene.load.audio(CONSTANT.SOUND_LIST.SELECT.key, CONSTANT.SOUND_LIST.SELECT.src);
		scene.load.audio(CONSTANT.SOUND_LIST.CANCEL.key, CONSTANT.SOUND_LIST.CANCEL.src);
	}

	gameCreate(): void {
		const scene = this.getScene();
		if (scene) {
			scene.game.input.addPointer(1);
			this.contentContainer = scene.add.container(0, 0);
			this.resize();
			// this.gameStart();
			const animate = (time: number) => {
				TWEEN.update(time);
				this.requestAnimationId = window.requestAnimationFrame(animate);
			};
			this.requestAnimationId = window.requestAnimationFrame(animate);
			this.gameStart();
		}
	}

	gameUpdate(): void {}

	async gameStart(): Promise<void> {
		const scene = this.getScene();
		if (this.contentContainer) this.contentContainer.removeAll(true);
		await gameUtil.startScene(scene, CONSTANT.SCENE_LIST.START_PAGE);
	}
}

let game: Game;

export const createNewGame = () => {
	if (!game) game = new Game();
	return game;
};
//
// export const getGame: Game = () => {
//   if (game) return game;
// };
