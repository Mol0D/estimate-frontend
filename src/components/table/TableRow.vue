<template>
  <tr class="estimate-table--row">
    <td class="estimate-table--column__number">
      <span>1</span>
      <table-side-menu
        v-if="showMenu"
        :list="rowActions"
        @add-row="$emit('add-row')"
        @duplicate-row="$emit('duplicate-row')"
        @delete-row="$emit('delete-row')"
      ></table-side-menu>
    </td>
    <td>
      <input
        class="estimate-table--input"
        :value="row.name"
        @input="$emit('update-row-name', $event.target.value)"
      />
    </td>
    <td v-for="(dep, d) in row.departments" :key="d">
      <table-cell
        :value="dep.value"
        @input="$emit('update-dep', { depId: dep.id, value: $event })"
      ></table-cell>
    </td>
    <td>{{ row.costPrice }}</td>
    <td>margin here</td>
    <td>{{ row.price }}</td>
  </tr>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, PropType } from "vue";
import IRow from "estimate-library/build/types/IRow";
import TableCell from "@/components/table/TableCell.vue";
import TableSideMenu from "@/components/table/TableSideMenu.vue";
import { TableAction } from "@/components/table/models/tabla-actions";

const props = defineProps({
  row: { type: Object as PropType<IRow>, required: true },
  showMenu: { type: Boolean, default: false },
  allowDelete: { type: Boolean, default: false },
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
  ];

  if (props.allowDelete) {
    actions.push({
      text: "Delete",
      action: "delete-row",
    });
  }

  return actions;
});

defineEmits(["update-row-name", "duplicate-section"]);
</script>
