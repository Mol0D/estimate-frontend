<template>
  <tr
    class="estimate-table--row"
    :class="{ 'estimate-table--row-disable': row.isDisabled }"
  >
    <td class="estimate-table--column__number">
      <template v-if="showMenu">
        <span>{{ index }}</span>
        <table-side-menu
          v-if="showMenu"
          :list="rowActions"
          @add-row="$emit('add-row')"
          @toggle-row="$emit('toggle-row')"
          @duplicate-row="$emit('duplicate-row')"
          @delete-row="$emit('delete-row')"
        ></table-side-menu>
      </template>
    </td>
    <td>
      <input
        class="estimate-table--input"
        :class="{ 'estimate-table--input-disable': row.isDisabled }"
        :value="row.name"
        :disabled="!showMenu"
        @input="$emit('update-row-name', $event.target.value)"
      />
    </td>
    <td v-for="(dep, d) in row.departments" :key="d">
      <table-cell
        :class="{
          'estimate-table--input-disable': row.isDisabled,
          'estimate-table--column-disable': dep.isDisabled,
        }"
        :value="dep.value"
        @input="$emit('update-dep', { depId: dep.id, value: $event })"
      ></table-cell>
    </td>
    <td>{{ row.costPrice }}</td>
    <td>{{ row.margin }}</td>
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

defineEmits(["update-row-name", "duplicate-section"]);
</script>
