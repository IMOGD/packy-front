import mainSceneOld from '@libs/scene/mainScene.old';
import mainScene from '@libs/scene/mainScene';
import CONSTANT from '../../../constant';
import gameUtil from '@libs/util/game-util';

class startPage extends mainScene {
	private container: Phaser.GameObjects.Container | undefined = undefined;
	constructor() {
		const passParam = CONSTANT.SCENE_LIST.START_PAGE;
		super(passParam);
	}

	create() {
		super.create();
		this.container = this.add.container(0, 0);
		this.addLogo();
		this.addStartBtn();
	}

	// 로고 생성
	addLogo(): void {
		const logo = this.add.text(this.w / 2, 100, 'PACKY', { fontSize: '50px', color: '#ffff00' }).setOrigin(0.5, 0.5);
		this.container?.add(logo);
		// this.makeClick(logo, () => {
		// 	console.log(`click`);
		// });
	}

	addStartBtn(): void {
		// const startText = this.add
		// 	.text(this.w / 2, this.h / 2, 'START', { fontSize: '50px', color: '#ffff00' })
		// 	.setOrigin(0.5, 0.5);
		// const g = this.add.graphics();
		// g.fillStyle(0xffffff, 1);
		// g.fillRoundedRect(this.w / 2, this.h / 2, 300, 100, 20);
		// this.makeClick(g, () => {
		// 	console.log(`g`);
		// });
		// this.container?.add([g, startText]);
		const t = this.add.text(0, 0, 'START', { fontSize: '50px', color: '#000000' }).setOrigin(0.5, 0.5);
		const con = this.makeRoundGraphic(this.w / 2, this.h / 2, 300, 100, 0xffffff, 1, 20, [t]);

		this.makeClick(con, () => this.nextScene());
	}

	async nextScene(): Promise<void> {
		// const ts = await import(`./gamePage.ts`);
		// this.scene.add(CONSTANT.SCENE_LIST.GAME_PAGE, new ts.default());
		// this.scene.start('gamePage');
		await gameUtil.startScene(this, 'gamePage');
	}
}

export default startPage;
