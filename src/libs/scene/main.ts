import { Game } from "@libs/game";
import Phaser from "phaser";
import {
  getKeyboardManager,
  KeyboardManager,
} from "@libs/manager/keyBoardManager";
import CONSTANT from "../../../constant";

class main extends Phaser.Scene {
  private character: Phaser.GameObjects.Rectangle | undefined = undefined;
  private keyboardManager: KeyboardManager | undefined = undefined;
  private map: any;
  private char: Phaser.GameObjects.Image | undefined = undefined;
  private cursor: any = undefined;
  constructor(v: any) {
    let passParam = v;
    if (!v) passParam = { key: CONSTANT.SCENE_LIST.MAIN };
    super(passParam);
  }

  preload(): void {
    if (CONSTANT.DEBUG) console.log(`preload`);
    this.load.image("pack_char", "./assets/images/pack_char.png");
    this.load.image("test_tile", "./assets/resource/test/test-tiled-set.png");
    this.load.tilemapTiledJSON("test_json", "./assets/resource/test/test.json");
    this.cursor = this.input.keyboard?.createCursorKeys();
  }

  create(): void {
    if (CONSTANT.DEBUG) console.log(`create!!`);
    // this.scene.run("game-ui");
    // tiled map 생성
    const map = this.make.tilemap({ key: "test_json" });
    //
    const tileset = map.addTilesetImage("test-tiled-set", "test_tile");
    // map.createStaticLayer("ground", tileset);
    map.createLayer("ground", tileset as Phaser.Tilemaps.Tileset, 0, 0);
    const wallLayer = map.createLayer(
      "wall",
      tileset as Phaser.Tilemaps.Tileset,
      0,
      0
    );

    wallLayer?.setCollisionByProperty({ collision: true });

    const debugGraphics = this.add.graphics().setAlpha(0.3);
    wallLayer?.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
      faceColor: new Phaser.Display.Color(243, 234, 48, 255),
    });

    // 캐릭터 생성
    // this.char = this.add.rectangle(100, 100, 10, 10, 0xff00ff);
    this.char = this.add.sprite(0, 0, "pack_char");
  }

  update(time: number, delta: number) {
    if (!this.cursor || !this.char) return;

    // console.log(`update`);
    // console.log(time, delta);
    if (this.cursor.left.isDown) {
      console.log(`left`);
      // this.char.set;
    }
    if (this.cursor.right.isDown) {
      console.log(`right`);
    }
    if (this.cursor.up.isDown) {
      console.log(`up`);
    }
    if (this.cursor.down.isDown) {
      console.log(`down`);
    }
  }
}

export default main;
