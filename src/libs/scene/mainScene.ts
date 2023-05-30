import { Game } from '@libs/game';
import Phaser from 'phaser';
import { getKeyboardManager, KeyboardManager } from '@libs/manager/keyBoardManager';
import CONSTANT from '../../../constant';
import TilemapLayer = Phaser.Tilemaps.TilemapLayer;

class mainScene extends Phaser.Scene {
	private character: Phaser.GameObjects.Rectangle | undefined = undefined;
	private keyboardManager: KeyboardManager | undefined = undefined;
	private map: any;
	private Packy: Phaser.GameObjects.Sprite | undefined = undefined;
	private cursor: any = undefined;
	constructor(v: any) {
		let passParam = v;
		if (!v) passParam = { key: CONSTANT.SCENE_LIST.MAIN };
		super(passParam);
	}

	preload(): void {
		if (CONSTANT.DEBUG) console.log(`preload`);
		this.load.image('Packy', './assets/images/Packy_1.png');
		this.load.image('test_tile', './assets/resource/map/map-tiled-set.png');
		this.load.tilemapTiledJSON('test_json', './assets/resource/map/map-tiled-set.json');
		this.cursor = this.input.keyboard?.createCursorKeys();
	}

	create(): void {
		if (CONSTANT.DEBUG) console.log(`create!!`);
		// tiled map 생성
		const map = this.make.tilemap({ key: 'test_json' });
		// tileset
		const tileset = map.addTilesetImage('test-tiled-set', 'test_tile');
		map.createLayer('ground', tileset as Phaser.Tilemaps.Tileset, 0, 0);

		const wallLayer = map.createLayer('wall', tileset as Phaser.Tilemaps.Tileset);

		wallLayer?.setCollisionByProperty({ collision: true });

		const debugGraphics = this.add.graphics().setAlpha();
		wallLayer?.renderDebug(debugGraphics, {
			tileColor: null,
			collidingTileColor: new Phaser.Display.Color(0, 0, 0, 255),
			faceColor: new Phaser.Display.Color(243, 234, 48, 255),
		});

		const spawnPoint = [
			{ x: 45, y: 45 },
			{ x: 555, y: 45 },
			{ x: 525, y: 555 },
			{ x: 45, y: 555 },
			{ x: 30 * 11 + 15, y: 30 * 10 + 15 },
		];
		const randomNum = Math.floor(Math.random() * 5);

		// 캐릭터 생성
		this.Packy = this.add.Packy(spawnPoint[randomNum].x, spawnPoint[randomNum].y, 'Packy');

		this.physics.add.collider(this.Packy, wallLayer as TilemapLayer);
	}

	update(time: number, delta: number) {
		if (!this.cursor || !this.Packy) return;

		if (this.Packy) {
			this.Packy.update(this.cursor);
		}
	}
}

export default mainScene;
