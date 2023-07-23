import Phaser from 'phaser';
import { CHARACTER } from '@libs/type';

const char_list = [
	CHARACTER.PACKY_BLUE,
	CHARACTER.PACKY_GREEN,
	CHARACTER.PACKY_PINK,
	CHARACTER.PACKY_RED,
	CHARACTER.PACKY_SKY,
	CHARACTER.PACKY_YELLOW,
	CHARACTER.GHOST_BLUE,
	CHARACTER.GHOST_GREEN,
	CHARACTER.GHOST_ORANGE,
	CHARACTER.GHOST_PINK,
	CHARACTER.GHOST_PURPLE,
	CHARACTER.GHOST_RED,
	CHARACTER.GHOST_SKY,
	CHARACTER.GHOST_YELLOW,
];

export const preLoader = (scene: Phaser.Scene) => {
	const promiseFun = (resolve: any, reject: any): void => {
		try {
			char_list.forEach(v => {
				scene.load.spritesheet(v, `./assets/images/character/${v}.png`, {
					frameWidth: 30,
					frameHeight: 30,
					startFrame: 0,
					endFrame: 2,
				});
			});
			resolve(`preload comp`);
		} catch (e) {
			reject(e);
		}
	};
	return new Promise(promiseFun);
};
