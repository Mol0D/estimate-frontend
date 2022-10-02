<template>
  <tr
    class="estimate-table--row"
    :class="{ 'estimate-table--row-disable': row.isDisabled }"
  >
    <td v-for="(column, c) in columns" :key="c">
      <component
        v-if="column.customizedType"
        :is="TableCustomizedColumnsMap.COMPONENTS[column.customizedType]"
        :row="row"
        :show-menu="showMenu"
        :allow-delete="allowDelete"
        :index="index"
        :dep-id="column?.department?.id"
        @add-row="$emit('add-row')"
        @toggle-row="$emit('toggle-row')"
        @duplicate-row="$emit('duplicate-row')"
        @delete-row="$emit('delete-row')"
        @update-row-name="$emit('update-row-name', $event.target.value)"
        @update-dep="
          $emit('update-dep', { depId: column?.department?.id, value: $event })
        "
      ></component>
      <span v-else>{{ row[column.value] }}</span>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, PropType } from "vue";
import IRow from "estimate-library/build/types/IRow";
import TableColumn from "@/components/table/models/table-column";
import TableCustomizedColumnsMap from "@/components/table/models/table-customized-columns-map";

defineProps({
  row: { type: Object as PropType<IRow>, required: true },
  showMenu: { type: Boolean, default: false },
  allowDelete: { type: Boolean, default: false },
  index: { type: Number, default: 0 },
  columns: Object as PropType<Array<TableColumn>>,
});

defineEmits(["update-row-name", "duplicate-section"]);
</script>
