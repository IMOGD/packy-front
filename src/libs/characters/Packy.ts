import Phaser from 'phaser';
import CONSTANT from '../../../constant';

// packy 모델 전역 선언
declare global {
	namespace Phaser.GameObjects {
		interface GameObjectFactory {
			Packy(x: number, y: number, texture: string, charType: CHAR_TYPE, target?: Packy | undefined): Packy;
		}
	}
}

// 캐릭터 상태값
enum HEALTH_STATE {
	IDLE = 0,
	DAMAGE = 1,
	DEAD = 2,
}

// 캐릭터 타입
export enum CHAR_TYPE {
	PACKY,
	GHOST,
}

export default class Packy extends Phaser.Physics.Arcade.Sprite {
	private healthState = HEALTH_STATE.IDLE;
	private damageTime = 0;
	private _health = 3;
	private _coins = 0;
	private _moveSpeed = 100;
	private readonly _charType: CHAR_TYPE = CHAR_TYPE.PACKY;
	private _target: Packy | undefined;

	// private knives?: Phaser.Physics.Arcade.Group; // 난 칼안써.

	constructor(scene: Phaser.Scene, x: number, y: number, texture: string, charType: CHAR_TYPE, target?: Packy) {
		super(scene, x, y, texture);
		this._charType = charType;
		if (charType === CHAR_TYPE.GHOST) this._target = target; //ghost라면 타겟이 필요함
	}

	get health() {
		return this._health;
	}

	// damaged
	hasDamaged() {
		if (CONSTANT.DEBUG) console.log(`Packy:hasDamaged}`);

		if (this._health <= 0) return;
		this._health--;

		if (this.health <= 0) {
			// died
			this.healthState = HEALTH_STATE.DEAD;
			this.setVelocity(0, 0);
		} else if (this._health < 3) {
			this.healthState = HEALTH_STATE.DAMAGE;
		}
	}

	// healed
	hasHealed(): void {
		if (CONSTANT.DEBUG) console.log(`Packy:hasHealed}`);

		// 죽었을땐 힐 안됌
		if (this._health <= 0) return;
		// max health 값 설정
		if (this._health > 2) return;

		this._health++;

		// TODO heal effect?
	}

	getCharType() {
		return this._charType;
	}

	/**
	 * 고스트일때 술래잡기
	 */
	chatchTarget() {
		// 나 자신이 고스트일때, 타겟 좌표로 잡기
		if (this._charType === CHAR_TYPE.GHOST) {
			if (this._target) {
				// console.log(Math.round(this._target.x / 24), Math.round(this._target.y / 24));
				// console.log(Math.round(this.x / 24), Math.round(this.y / 24));
				if (Math.round(this._target.x / 24) === Math.round(this.x / 24)) {
					if (Math.round(this._target.y / 24) === Math.round(this.y / 24)) {
						window.alert('CHATCH!');
						this.setVelocity(0, 0);
						this._target.destroy(true);
						this._target = undefined;
					}
				}
			}
		}
	}

	update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
		if (this._health === HEALTH_STATE.DEAD) return;
		else if (this._health === HEALTH_STATE.DAMAGE) {
			// TODO add damaged action?
		}
		if (!cursors) return;

		// left
		if (cursors.left.isDown) {
			this.setVelocity(-this._moveSpeed, 0);
		}
		// right
		else if (cursors.right.isDown) {
			this.setVelocity(this._moveSpeed, 0);
		}
		// up
		else if (cursors.up.isDown) {
			this.setVelocity(0, -this._moveSpeed);
		}
		//down
		else if (cursors.down.isDown) {
			this.setVelocity(0, this._moveSpeed);
		}
		// else {
		// 	this.setVelocity(0, 0);
		// }
		// 술래잡기
		this.chatchTarget();
	}
}

export function initPacky() {
	// 사용자 정의 게임 오브젝트 등록
	Phaser.GameObjects.GameObjectFactory.register(
		'Packy',
		function (
			this: Phaser.GameObjects.GameObjectFactory,
			x: number,
			y: number,
			texture: string,
			charType: CHAR_TYPE,
			target?: Packy,
		) {
			const sprite = new Packy(this.scene, x, y, texture, charType, target);
			sprite.setScale(1);

			this.displayList.add(sprite);
			this.updateList.add(sprite);

			this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY);
			// sprite.body?.setSize(sprite.width * 0.1, sprite.height * 0.1);

			return sprite;
		},
	);
}
