import { Game } from '@libs/game';
import Phaser from 'phaser';
import { getKeyboardManager, KeyboardManager } from '@libs/manager/keyBoardManager';
import CONSTANT from '../../../constant';
import TilemapLayer = Phaser.Tilemaps.TilemapLayer;
import Packy, { CHAR_TYPE } from '@libs/characters/Packy';

class mainScene extends Phaser.Scene {
	private character: Phaser.GameObjects.Rectangle | undefined = undefined;
	private keyboardManager: KeyboardManager | undefined = undefined;
	private wallLayer: TilemapLayer | undefined = undefined;
	private Packy: Phaser.GameObjects.Sprite | undefined = undefined;
	private Packy2: Phaser.GameObjects.Sprite | undefined = undefined;
	private cursor: any = undefined;
	private cursorPlayer2: any = undefined;
	constructor(v: any) {
		let passParam = v;
		if (!v) passParam = { key: CONSTANT.SCENE_LIST.MAIN };
		super(passParam);
	}

	preload(): void {
		if (CONSTANT.DEBUG) console.log(`preload`);
		this.load.image('Packy', './assets/images/Packy_1.png');
		this.load.image('Ghost', './assets/images/Ghost_1.png');
		this.load.image('test_tile', './assets/resource/map/map-tiled-set.png');
		this.load.tilemapTiledJSON('test_json', './assets/resource/map/map-tiled-set.json');
		this.cursor = this.input.keyboard?.createCursorKeys();
	}

	create(): void {
		if (CONSTANT.DEBUG) console.log(`create!!`);
		// tiled map 생성
		const map = this.make.tilemap({ key: 'test_json' });
		// tileset
		const tileset = map.addTilesetImage('map-tiled-set', 'test_tile');
		map.createLayer('ground', tileset as Phaser.Tilemaps.Tileset, 0, 0);

		this.wallLayer = map.createLayer('wall', tileset as Phaser.Tilemaps.Tileset) as TilemapLayer;

		this.wallLayer?.setCollisionByProperty({ collision: true });

		const debugGraphics = this.add.graphics().setAlpha();
		this.wallLayer?.renderDebug(debugGraphics, {
			tileColor: null,
			collidingTileColor: new Phaser.Display.Color(0, 0, 0, 255),
			faceColor: new Phaser.Display.Color(243, 234, 48, 255),
		});

		// 캐릭터 생성
		this.Packy = this.add.Packy(this.getSpawnPoint().x, this.getSpawnPoint().y, 'Packy', CHAR_TYPE.PACKY);

		// 충돌체 추가
		this.physics.add.collider(this.Packy, this.wallLayer as TilemapLayer);

		this.addPlayer2();
	}

	update(time: number, delta: number) {
		if (!this.cursor || !this.Packy) return;

		if (this.Packy) {
			this.Packy.update(this.cursor);
		}
		if (this.Packy2) {
			this.Packy2.update(this.cursorPlayer2);
		}
	}

	getSpawnPoint() {
		const spawnPoint = [
			{ x: 45, y: 45 },
			{ x: 555, y: 45 },
			{ x: 525, y: 555 },
			{ x: 45, y: 555 },
			{ x: 30 * 11 + 15, y: 30 * 10 + 15 },
		];
		const randomNum = Math.floor(Math.random() * 5);

		return spawnPoint[randomNum];
	}

	addPlayer2(): void {
		const w = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W); // up
		const s = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S); // DOWN
		const a = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A); // LEFT
		const d = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D); // RIGHT
		this.cursorPlayer2 = {
			up: w,
			down: s,
			left: a,
			right: d,
		};
		this.Packy2 = this.add.Packy(
			this.getSpawnPoint().x,
			this.getSpawnPoint().y,
			'Ghost',
			CHAR_TYPE.GHOST,
			this.Packy as Packy,
		);
		this.physics.add.collider(this.Packy2, this.wallLayer as TilemapLayer);
	}
}

export default mainScene;
