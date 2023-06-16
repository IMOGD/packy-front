import mainScene from '@libs/scene/mainScene';
import CONSTANT from '../../../constant';

class gameListPage extends mainScene {
	private container: Phaser.GameObjects.Container | undefined = undefined;
	constructor() {
		const passParam = CONSTANT.SCENE_LIST.GAME_LIST_PAGE;
		super(passParam);
	}

	preload() {
		super.preload();
	}

	create() {
		super.create();
		this.container = this.add.container(0, 0);
	}

	update(time: number, delta: number) {
		super.update(time, delta);
	}
}

export default gameListPage;
