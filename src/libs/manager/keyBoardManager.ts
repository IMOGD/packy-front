import Phaser from "phaser";
let keyboard: KeyboardManager | undefined = undefined;

// 키보드 이벤트를 저장할 객채 생성
class EventContainerInterface {
  LEFT: boolean = false;
  RIGHT: boolean = false;
  UP: boolean = false;
  DOWN: boolean = false;
}

export class KeyboardManager {
  private target: Phaser.GameObjects.Container | undefined; // 이벤트를 받아 행동할 타켓
  private moveSpeed = 3;
  private keyboardEventContainer = new EventContainerInterface();
  constructor(target: any) {
    this.target = target;
    this.addKeydownEventListener = this.addKeydownEventListener.bind(this);
    this.addKeyUpEventListener = this.addKeyUpEventListener.bind(this);
    if (this.target) {
      this.createEvent();
    }
  }

  // 이벤트 생성
  createEvent(): void {
    addEventListener("keydown", this.addKeydownEventListener);
    addEventListener("keyup", this.addKeyUpEventListener);
  }

  // 이벤트 제거
  removeEvent(): void {
    removeEventListener("keydown", this.addKeydownEventListener);
    removeEventListener("keyup", this.addKeyUpEventListener);
  }

  // 키 눌렀을 시 이벤트 입력
  private addKeydownEventListener(e: KeyboardEvent): void {
    this.setEventQue(e.code, true);
  }
  // 키 뗏을때 이벤트 제거
  private addKeyUpEventListener(e: KeyboardEvent): void {
    this.setEventQue(e.code, false);
  }

  // 키보드 이벤트 저장
  private setEventQue(c: string, v: boolean) {
    switch (c) {
      case "KeyA":
      case "ArrowLeft":
        this.keyboardEventContainer.LEFT = v;
        break;
      case "KeyW":
      case "ArrowUp":
        this.keyboardEventContainer.UP = v;
        break;
      case "KeyD":
      case "ArrowRight":
        this.keyboardEventContainer.RIGHT = v;
        break;
      case "KeyS":
      case "ArrowDown":
        this.keyboardEventContainer.DOWN = v;
        break;
    }
    this.moveTarget();
  }

  // 타켓 이동
  private moveTarget() {
    if (this.keyboardEventContainer.LEFT) this.goLeft();
    if (this.keyboardEventContainer.UP) this.goUp();
    if (this.keyboardEventContainer.DOWN) this.goDown();
    if (this.keyboardEventContainer.RIGHT) this.goRight();
  }

  private goLeft() {
    this.target?.setPosition(this.target?.x - this.moveSpeed, this.target.y);
  }
  private goUp() {
    this.target?.setPosition(this.target?.x, this.target.y - this.moveSpeed);
  }
  private goRight() {
    this.target?.setPosition(this.target?.x + this.moveSpeed, this.target.y);
  }
  private goDown() {
    this.target?.setPosition(this.target?.x, this.target.y + this.moveSpeed);
  }

  // 타켓 변경
  chageTarget(t: any): void {
    if (t && t !== this.target) {
      this.target = t;
    }
  }
}

export const getKeyboardManager = (t?: Phaser.GameObjects.Container) => {
  if (!keyboard && t) keyboard = new KeyboardManager(t);
  return keyboard;
};

export const removeKeyboardManager = () => {
  keyboard?.removeEvent();
};
