import { defineStore } from "pinia";
import { ref } from "vue";

export enum storeKey {
  count = "count",
}

export const useStore = defineStore("store", () => {
  const _store = ref({
    count: 0,
  });

  /**
   * getter
   * @param key
   */
  const getter = (key: storeKey) => {
    if (key) return _store.value[key];
    else return undefined;
  };

  /**
   * setter
   * @param key
   * @param value
   */
  const setter = (key: storeKey, value: any) => {
    if (key && value) _store.value[key] = value;
    else throw new Error("INVALID PARAMETER");
  };

  return {
    getter,
    setter,
  };
});
