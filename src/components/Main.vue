<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { createNewGame } from "../libs/game";
import { useStore } from "../store";
import CONSTANT from "../../constant";

export default defineComponent({
  name: "Main",
  setup() {
    const store = useStore();
    let game;

    onMounted(() => {
      if (CONSTANT.DEBUG) console.log(`onMounted`);
      game = createNewGame(`game-container`, store);
      game.create();
    });

    return {};
  },
});
</script>

<template>
  <div id="game-container"></div>
</template>
