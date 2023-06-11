<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { createNewGame } from '../libs/game';
import CONSTANT from '../../constant';

export default defineComponent({
	name: 'Main',
	setup() {
		let game;

		onMounted(() => {
			if (CONSTANT.DEBUG) console.log(`onMounted`);
			game = createNewGame();
			game.create();
		});

		return {};
	},
});
</script>

<template>
	<div id="game-container"></div>
</template>
