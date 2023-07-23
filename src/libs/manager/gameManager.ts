class GameManager {
	constructor() {}
}

let gameManager: GameManager | undefined;

export const getGameManager = () => {
	if (gameManager) gameManager = new GameManager();
	return gameManager;
};
