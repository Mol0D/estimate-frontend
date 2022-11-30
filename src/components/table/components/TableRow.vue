<template>
  <div
    class="estimate-table--row"
    :class="{ 'estimate-table--row-disable': row.isDisabled }"
    :style="tableStyles"
  >
    <div
      class="estimate-table--column estimate-table--column__draggable"
      v-for="(column, c) in columns"
      :key="c"
      :class="{ 'hide-border-right': isHideValue(column.value) }"
    >
      <component
        v-if="column.customizedType"
        :is="TableCustomizedColumnsMap.COMPONENTS[column.customizedType]"
        :row="row"
        :show-menu="showMenu"
        :allow-delete="allowDelete"
        :index="index"
        :percent="percent"
        :dep-id="column?.department?.id"
        @add-row="$emit('add-row')"
        @toggle-row="$emit('toggle-row')"
        @duplicate-row="$emit('duplicate-row')"
        @delete-row="$emit('delete-row')"
        @update-row-name="$emit('update-row-name', $event)"
        @update-dep="
          $emit('update-dep', { depId: column?.department?.id, value: $event })
        "
      ></component>
      <template v-else>
        <span v-if="isHideValue(column.value)"></span>
        <span v-else>{{ row[column.value] }}</span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, PropType } from "vue";
import IRow from "estimate-library/build/types/IRow";
import TableColumn from "@/components/table/models/table-column";
import TableCustomizedColumnsMap from "@/components/table/models/table-customized-columns-map";
import useTableStyles from "@/components/table/composables/useTableStyles";

const props = defineProps({
  row: { type: Object as PropType<IRow>, required: true },
  showMenu: { type: Boolean, default: false },
  allowDelete: { type: Boolean, default: false },
  index: { type: Number, default: 0 },
  columns: { type: Object as PropType<Array<TableColumn>>, required: true },
  hideCostPrice: { type: Boolean, default: false },
  hideMargin: { type: Boolean, default: false },
  hidePrice: { type: Boolean, default: false },
  percent: { type: Number, required: true },
});

const { tableStyles } = useTableStyles(props);

const isHideValue = (columnType: string) => {
  const isHideMargin = columnType === "margin" && props.hideMargin;
  const isHideCostPrice = columnType === "costPrice" && props.hideCostPrice;
  const isHidePrice = columnType === "price" && props.hidePrice;

  return isHideMargin || isHideCostPrice || isHidePrice;
};

defineEmits(["update-row-name", "duplicate-section"]);
</script>
