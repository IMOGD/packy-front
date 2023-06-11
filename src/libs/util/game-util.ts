const startScene = async (ctx: Phaser.Scene, sceneKey: string): Promise<void> => {
	if (sceneKey) {
		const ts = await import(`../scene/${sceneKey}.ts`);
		try {
			if (ctx.scene) {
				ctx.scene.add(sceneKey, new ts.default());
				ctx.scene.start(sceneKey);
				const sl = ctx.scene.manager.scenes;
				sl.forEach(v => {
					if (v.scene.key !== 'default' && v.scene.key !== sceneKey) {
						ctx.scene.remove(v.scene.key);
					}
				});
			}
		} catch (e) {
			console.error(e, sceneKey, ts.default);
		}
	}
};

export default {
	startScene,
};
