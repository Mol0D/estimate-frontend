<template>
  <draggable
    class="estimate-table--row"
    v-model="columnModel"
    tag="div"
    :item-key="(key) => key"
    :style="tableStyles"
    draggable=".estimate-table--column__draggable"
    ghost="estimate-table--ghost"
  >
    <template #item="{ element: header, index }">
      <div
        class="estimate-table--header__column"
        :class="{
          'estimate-table--column-disable':
            header.department?.id && header.isDisabled,
          'estimate-table--column__department': header.department?.id,
          'estimate-table--column__number': !header.value,
          'estimate-table--column__draggable':
            header.draggable && isAllowDragging,
        }"
        :style="{ width: `${header.width}px` }"
      >
        <span>{{ header.title }}</span>
        <table-side-menu
          v-if="header.department?.id"
          :list="getDepartmentMenu(header.isDisabled)"
          @toggle-department="$emit('toggle-department', header.department?.id)"
        ></table-side-menu>

        <table-resize-button
          v-if="header.resizable"
          :height="tableHeight"
          @resize:start="isAllowDragging = false"
          @resize:end="isAllowDragging = true"
          @resize="resizeHandler(index, $event)"
        ></table-resize-button>
      </div>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import {
  computed,
  defineComponent,
  defineEmits,
  defineProps,
  ref,
  PropType,
  WritableComputedRef,
} from "vue";
import { IConfig } from "estimate-library/build/types/IConfig";
import { TableAction } from "@/components/table/models/table-action";
import TableSideMenu from "@/components/table/components/TableSideMenu.vue";
import draggable from "vuedraggable";
import TableColumn from "@/components/table/models/table-column";
import useTableStyles from "@/components/table/composables/useTableStyles";
import TableResizeButton from "@/components/table/components/TableResizeButton.vue";

defineComponent(["draggable", "TableResizeButton"]);

const emit = defineEmits(["update-column"]);

const props = defineProps({
  config: Object as PropType<IConfig>,
  columns: { type: Object as PropType<Array<TableColumn>>, required: true },
  tableHeight: Number,
});

const { tableStyles } = useTableStyles(props);

const isAllowDragging = ref(true);

const getDepartmentMenu = (isDisabled: boolean): Array<TableAction> => [
  {
    text: isDisabled ? "Enable" : "Disable",
    action: "toggle-department",
  },
];

const columnModel: WritableComputedRef<Array<TableColumn>> = computed({
  get() {
    return props.columns;
  },
  set(value) {
    emit("update-column", value);
  },
});

const resizeHandler = (index: number, width: number) => {
  const minWidth = columnModel.value[index].value === "name" ? 200 : 70;
  const maxWidth = columnModel.value[index].value === "name" ? 500 : 300;
  let newWidth: number;

  if (width < minWidth) {
    newWidth = minWidth;
  } else if (width > maxWidth) {
    newWidth = maxWidth;
  } else {
    newWidth = width;
  }
  columnModel.value[index].width = newWidth;
};
</script>
