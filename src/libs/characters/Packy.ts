import Phaser from "phaser";

// packy 모델 전역 선언
declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      Packy(
        x: number,
        y: number,
        texture: string,
        frame?: string | number
      ): Packy;
    }
  }
}

class Packy extends Phaser.Physics.Arcade.Sprite {}
