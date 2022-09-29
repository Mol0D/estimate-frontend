<template>
  <span class="estimate-table--menu__button" @click="showMenu = true"></span>
  <div
    v-if="showMenu"
    class="estimate-table--menu__list"
    v-click-outside="closeMenu"
  >
    <span
      v-for="(item, i) in list"
      :key="i"
      @click="actionHandler(item.action)"
    >
      {{ item.text }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, PropType, ref } from "vue";
import { TableAction } from "@/components/table/models/tabla-actions";

defineProps({
  list: { type: Array as PropType<Array<TableAction>>, required: true },
});

const emit = defineEmits([]);

const showMenu = ref(false);

const closeMenu = () => {
  showMenu.value = false;
};

const actionHandler = (action: string) => {
  emit(action as never);
  closeMenu();
};
</script>
