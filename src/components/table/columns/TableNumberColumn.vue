<template>
  <div
    v-if="showMenu"
    class="estimate-table--column estimate-table--column__number"
  >
    <div>{{ index }}</div>
    <table-side-menu
      v-if="showMenu"
      :list="rowActions"
      @add-row="$emit('add-row')"
      @toggle-row="$emit('toggle-row')"
      @duplicate-row="$emit('duplicate-row')"
      @delete-row="$emit('delete-row')"
    ></table-side-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, PropType } from "vue";
import { TableAction } from "@/components/table/models/table-action";
import IRow from "estimate-library/build/types/IRow";
import TableSideMenu from "@/components/table/components/TableSideMenu.vue";

const props = defineProps({
  showMenu: { type: Boolean, default: false },
  row: { type: Object as PropType<IRow>, required: true },
  allowDelete: { type: Boolean, default: false },
  index: { type: Number, default: 0 },
});

const rowActions = computed((): Array<TableAction> => {
  const actions = [
    {
      text: "Add",
      action: "add-row",
    },
    {
      text: "Duplicate",
      action: "duplicate-row",
    },
    {
      text: props.row.isDisabled ? "Enable" : "Disable",
      action: "toggle-row",
    },
  ];

  if (props.allowDelete) {
    actions.push({
      text: "Delete",
      action: "delete-row",
    });
  }

  return actions;
});
</script>
