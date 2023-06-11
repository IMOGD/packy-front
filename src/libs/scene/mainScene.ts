import Phaser from 'phaser';
import CONSTANT from '../../../constant';
import { CHAR_TYPE, GAME_TYPE, mapInterface } from '@libs/type';

export type PhaserElType =
	| Phaser.GameObjects.Container
	| Phaser.GameObjects.Text
	| Phaser.GameObjects.Image
	| Phaser.GameObjects.Rectangle
	| Phaser.GameObjects.Sprite;

class mainScene extends Phaser.Scene {
	private _character: CHAR_TYPE | undefined = undefined;
	private _character_2p?: CHAR_TYPE | undefined = undefined;
	private _map: mapInterface | undefined = undefined;
	private _gameType: GAME_TYPE | undefined = undefined;
	public w = 0;
	public h = 0;

	constructor(v: any) {
		super(v);
	}

	preload(): void {}

	create(): void {
		this.w = this.game.canvas.width;
		this.h = this.game.canvas.height;
	}

	// 소리 재생
	playSound(key: string): void {
		const sound = this.sound.add(key);
		sound.play();
	}

	// 클릭하기
	makeClick(el: PhaserElType, callback: () => void, react?: boolean) {
		if (el) {
			let isPointerdown = false;
			const btnMargin = 3;
			el.setInteractive(new Phaser.Geom.Rectangle(0, 0, el.width, el.height), Phaser.Geom.Rectangle.Contains);
			el.on('pointerover', () => {
				this.playSound(CONSTANT.SOUND_LIST.SELECT.key);
				el.setScale(1.01, 1.01);
			});
			el.on('pointerdown', () => {
				isPointerdown = true;
				this.playSound(CONSTANT.SOUND_LIST.CONFIRM.key);
				el.setPosition(el.x, el.y + btnMargin);
			});
			el.on('pointerup', () => {
				if (isPointerdown) {
					el.setPosition(el.x, el.y - btnMargin);
					isPointerdown = false;
					if (callback) callback();
				}
			});
			el.on('pointerout', () => {
				if (isPointerdown) {
					el.setPosition(el.x, el.y - btnMargin);
					isPointerdown = false;
				}
				el.setScale(1, 1);
			});
			if (CONSTANT.DEBUG) {
				this.input.enableDebug(el, 0x00ffff);
			}
		}
	}

	makeRoundGraphic(
		x: number,
		y: number,
		w: number,
		h: number,
		c: number,
		a: number,
		r?: number,
		child?: PhaserElType[],
	): Phaser.GameObjects.Container {
		const container = this.add.container(x, y).setSize(w, h);
		const g = this.add.graphics();
		g.fillStyle(c, a);
		g.fillRoundedRect(-w / 2, -h / 2, w, h, r);
		container.add(g);
		if (child) {
			child.forEach(el => container.add(el));
		}
		return container;
	}
	update(time: number, delta: number): void {}
}

export default mainScene;
