const startScene = async (
  ctx: Phaser.Scene,
  sceneKey: string
): Promise<void> => {
  if (sceneKey) {
    const ts = await import(`../../libs/scene/${sceneKey}.ts`);
    // const sceneParam = Object.assign({}, { isDevelopment: AppConfig.ENV === 'development' }, param);
    try {
      if (ctx.scene) {
        const sceneList = ctx.scene.manager.getScenes();
        if (sceneList.length > 0) {
          for (const sceneListKey of sceneList) {
            if (sceneListKey.scene.key !== "default")
              ctx.scene.manager.remove(sceneListKey.scene.key);
          }
        }
        ctx.scene.add(sceneKey, new ts.default());
        ctx.scene.start(sceneKey);
      }
    } catch (e) {
      console.error(e, sceneKey, ts.default);
    }
  }
};

export default {
  startScene,
};
