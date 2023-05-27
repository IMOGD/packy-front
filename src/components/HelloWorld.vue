<script lang="ts">
import { defineComponent } from "vue";
import { storeKey, useStore } from "../store";
import { storeToRefs } from "pinia";
import CONSTANT from "../../constant";

export default defineComponent({
  setup() {
    const store = useStore();

    const a = () => {
      // store.$patch('increaseCount')
      // store.getCount();
      if (CONSTANT.DEBUG) console.log(store.getter(storeKey.count));
      store.setter(storeKey.count, store.getter(storeKey.count) + 1);
    };
    return {
      store,
      a,
    };
  },
});
</script>

<template>
  <div>안녕하세요</div>
  <img src="/vite.svg" alt="" />
  <div>드디어 성공했다!!</div>
  <div>nginx reload 안해도 된다고?</div>
  <div>짜잔!</div>
  <button @click="a">click</button>
  <div>{{ store.getter("count") }}</div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
