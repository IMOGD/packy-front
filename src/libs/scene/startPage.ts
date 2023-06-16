import mainScene from '@libs/scene/mainScene';
import CONSTANT from '../../../constant';
import gameUtil from '@libs/util/game-util';
import { GAME_TYPE } from '@libs/type';

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
		this.addBtn();
		// this.addStartBtn();
	}

	// 로고 생성
	addLogo(): void {
		const logo = this.add.text(this.w / 2, 100, 'PACKY', { fontSize: '50px', color: '#ffff00' }).setOrigin(0.5, 0.5);
		this.container?.add(logo);
	}

	// 버튼 그리기
	addBtn(): void {
		const soloText = this.add.text(0, 0, 'SOLO', { fontSize: '30px', color: '#000000' }).setOrigin(0.5, 0.5);
		const soloCon = this.makeRoundGraphic(this.w / 2, this.h / 2 - 60 - 20, 180, 60, 0xffffff, 1, 20, [soloText]);
		this.makeClick(soloCon, () => this.setGameType(GAME_TYPE.SOLO));

		const duoText = this.add.text(0, 0, 'DUO', { fontSize: '30px', color: '#000000' }).setOrigin(0.5, 0.5);
		const duoCon = this.makeRoundGraphic(this.w / 2, this.h / 2, 180, 60, 0xffffff, 1, 20, [duoText]);
		this.makeClick(duoCon, () => this.setGameType(GAME_TYPE.DUO));

		const multiText = this.add.text(0, 0, 'MULTI', { fontSize: '30px', color: '#000000' }).setOrigin(0.5, 0.5);
		const multiCon = this.makeRoundGraphic(this.w / 2, this.h / 2 + 60 + 20, 180, 60, 0xffffff, 1, 20, [multiText]);
		this.makeClick(multiCon, () => this.setGameType(GAME_TYPE.MULTI));

		this.container?.add([soloCon, duoCon, multiCon]);
	}

	handleDestroy(): void {
		this.container?.removeAll(true);
		this.container?.destroy(true);
	}

	// 게임타입 설정
	setGameType(gameType: GAME_TYPE): void {
		super.setGameType(gameType);
		if (gameType === GAME_TYPE.MULTI) {
			// 방 생성, 참가 페이지로 이동
			this.nextScene(CONSTANT.SCENE_LIST.GAME_LIST_PAGE);
		} else {
			// solo, duo 캐릭터 선택페이지 이동
			this.nextScene(CONSTANT.SCENE_LIST.CHOOSE_CHARACTER_PAGE);
		}
	}

	// 다음씬 보기
	async nextScene(scene: string): Promise<void> {
		await gameUtil.startScene(this, scene);
		this.handleDestroy();
	}
}

export default startPage;
