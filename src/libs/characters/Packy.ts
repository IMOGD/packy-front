import Phaser from 'phaser';
import CONSTANT from '../../../constant';

// packy 모델 전역 선언
declare global {
	namespace Phaser.GameObjects {
		interface GameObjectFactory {
			Packy(x: number, y: number, texture: string, frame?: string | number): Packy;
		}
	}
}

// 캐릭터 상태값
enum HEALTH_STATE {
	IDLE = 0,
	DAMAGE = 1,
	DEAD = 2,
}

export default class Packy extends Phaser.Physics.Arcade.Sprite {
	private healthState = HEALTH_STATE.IDLE;
	private damageTime = 0;
	private _health = 3;
	private _coins = 0;
	private _moveSpeed = 100;

	// private knives?: Phaser.Physics.Arcade.Group; // 난 칼안써.

	constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
		super(scene, x, y, texture, frame);
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
			frame?: string | number,
		) {
			const sprite = new Packy(this.scene, x, y, texture, frame);
			// sprite.setScale(0.1);

			this.displayList.add(sprite);
			this.updateList.add(sprite);

			this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY);
			sprite.body?.setSize(sprite.width * 0.1, sprite.height * 0.1);

			return sprite;
		},
	);
}
