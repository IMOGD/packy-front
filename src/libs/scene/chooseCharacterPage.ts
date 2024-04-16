import mainScene from '@libs/scene/mainScene';
import CONSTANT from '../../../constant';
import { CHAR_TYPE } from '@libs/type';
import { jsonLoader } from '../util/common-util';
import { ICharacterJson } from '../../type/type';

class chooseCharacterPage extends mainScene {
	private container: Phaser.GameObjects.Container | undefined = undefined;
	private childList: Phaser.GameObjects.Container[] = [];
	private characterList: ICharacterJson[] = [];
	constructor() {
		const passParam = CONSTANT.SCENE_LIST.CHOOSE_CHARACTER_PAGE;
		console.log(passParam);
		super(passParam);
	}

	async preload() {
		super.preload();
		this.characterList = await jsonLoader('../../data/character.json');
	}

	async create() {
		super.create();
		this.container = this.add.container(0, 0);
		// const soloText = this.add
		// 	.text(this.w / 2, this.h / 2, 'chooseCharacterPage', { fontSize: '30px', color: '#ffffff' })
		// 	.setOrigin(0.5, 0.5);

		// this.addCharacterCard('packy', CHAR_TYPE.PACKY, this.w / 2 - 80, this.h / 2);
		// this.addCharacterCard('ghost', CHAR_TYPE.GHOST, this.w / 2 + 80, this.h / 2);
		// const charCon = this.makeRoundGraphic(this.w / 2, this.h / 2, 150, 180, 0xffffff, 1, 20);
		await this.makeCharacterList();
	}

	async makeCharacterList() {
		this.characterList = await jsonLoader('../../data/character.json');
		if (!this.characterList || this.characterList.length < 0) return;

		this.characterList.forEach(item => {
			this.makeCharacterCard(item, this.w / 2, this.h / 2);
		});
	}

	// 캐릭터 카드 생성
	makeCharacterCard(char: ICharacterJson, x: number, y: number): void {
		const charText = this.add
			.text(0, 180 / 2 - 30, char.key, { fontSize: '30px', color: '#000000' })
			.setOrigin(0.5, 0.5);
		const charImg = this.add.image(0, -180 / 2 + 50 + 20, char.imgSrc);
		charImg.setSize(100, 100);
		charImg.setDisplaySize(100, 100);
		const charCon = this.makeRoundGraphic(x, y, 150, 180, 0xffffff, 1, 20, [charText, charImg]);
		// this.makeClick(charCon, () => this.setCharType(img));

		// this.childList.push(charCon);
		this.container?.add(charCon);
	}

	// 캐릭터 카드 생성
	addCharacterCard(charName: string, img: CHAR_TYPE, x: number, y: number): void {
		const charText = this.add
			.text(0, 180 / 2 - 30, charName, { fontSize: '30px', color: '#000000' })
			.setOrigin(0.5, 0.5);
		const charImg = this.add.image(0, -180 / 2 + 50 + 20, img);
		charImg.setSize(100, 100);
		charImg.setDisplaySize(100, 100);
		const charCon = this.makeRoundGraphic(x, y, 150, 180, 0xffffff, 1, 20, [charText, charImg]);
		this.makeClick(charCon, () => this.setCharType(img));

		// this.childList.push(charCon);
		this.container?.add(charCon);
	}

	// 캐릭터 정보저장, 다음화면 넘어가기
	setCharType(charType: CHAR_TYPE): void {
		console.log(charType);
	}

	update(time: number, delta: number) {
		super.update(time, delta);
	}

	handleDestroy(): void {
		this.container?.removeAll(true);
		this.container?.destroy(true);
		this.childList.map(v => {
			if (v) {
				v.removeAll(true);
				v.destroy(true);
			}
		});
	}
}

export default chooseCharacterPage;
