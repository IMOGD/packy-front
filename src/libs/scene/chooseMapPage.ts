import mainScene from '@libs/scene/mainScene';
import CONSTANT from '../../../constant';

class chooseMapPage extends mainScene {
	private container: Phaser.GameObjects.Container | undefined = undefined;
	constructor() {
		const passParam = CONSTANT.SCENE_LIST.CHOOSE_MAP_PAGE;
		super(passParam);
	}

	preload() {
		super.preload();
	}

	create() {
		super.create();
		this.container = this.add.container(0, 0);
		const soloText = this.add
			.text(this.w / 2, this.h / 2, 'chooseMapPage', { fontSize: '30px', color: '#ffffff' })
			.setOrigin(0.5, 0.5);
	}

	update(time: number, delta: number) {
		super.update(time, delta);
	}
}

export default chooseMapPage;
