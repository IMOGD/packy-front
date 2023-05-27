import { Store } from "pinia";

export interface GameInterface {
  create(): void;

  update(): void;

  resize(): void;

  destroy(): void;
}

export class GameBase extends EventTarget implements GameInterface {
  private readonly _parentContainer: string;
  private readonly store: Store<any>;

  constructor(contentId: string, store: Store) {
    super();
    this._parentContainer = contentId;
    this.store = store;
  }

  create() {
    // implements
  }

  update() {
    // implements
  }

  resize() {
    // implements
  }

  destroy() {
    // implements
  }

  getParentContainer(): string {
    return this._parentContainer;
  }
}
