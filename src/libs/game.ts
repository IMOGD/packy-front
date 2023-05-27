import Phaser from "phaser";
import { Store } from "pinia";
import { GameBase } from "./game-base";
import * as TWEEN from "@tweenjs/tween.js";
import gameUtil from "@libs/util/game-util";
import CONSTANT from "../../constant";

export class Game extends GameBase {
  private game?: Phaser.Game | undefined;
  private contentContainer?: Phaser.GameObjects.Container;
  private requestAnimationId = -1;

  constructor(contentId: string, store: Store) {
    super(contentId, store);
  }

  preload(): void {}

  create(): void {
    this.game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 640,
      height: 640,
      // backgroundColor: "#003bd5",
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
        },
      },
      parent: this.getParentContainer(),
      scene: {
        preload: this.gamePreload.bind(this),
        create: this.gameCreate.bind(this),
        // update: this.gameUpdate.bind(this),
      },
    });
    this.game.canvas.classList.add("GameContainer");
  }

  getScene(): Phaser.Scene {
    if (!this.game) throw new Error("Not found game.");
    return <Phaser.Scene>this.game.scene.getAt(0);
  }

  gamePreload(): void {}

  gameCreate(): void {
    const scene = this.getScene();
    if (scene) {
      scene.game.input.addPointer(1);
      this.contentContainer = scene.add.container(0, 0);
      this.resize();
      // this.gameStart();
      const animate = (time: number) => {
        TWEEN.update(time);
        this.requestAnimationId = window.requestAnimationFrame(animate);
      };
      this.requestAnimationId = window.requestAnimationFrame(animate);
      this.gameStart();
    }
  }

  gameUpdate(): void {}

  async gameStart(): Promise<void> {
    const scene = this.getScene();
    if (this.contentContainer) this.contentContainer.removeAll(true);
    await gameUtil.startScene(scene, CONSTANT.SCENE_LIST.MAIN);
  }
}

let game: Game;

export const createNewGame = (contentId: string, store: any) => {
  if (!game) game = new Game(contentId, store);
  return game;
};
//
// export const getGame: Game = () => {
//   if (game) return game;
// };
