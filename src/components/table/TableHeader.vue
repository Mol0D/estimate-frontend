<template>
  <draggable
    class="estimate-table--row"
    v-model="columnModel"
    tag="div"
    :item-key="(key) => key"
    :style="tableStyles"
  >
    <template #item="{ element: header }">
      <div
        class="estimate-table--header__column"
        :class="{
          'estimate-table--column-disable':
            header.department?.id && header.isDisabled,
          'estimate-table--column__department': header.department?.id,
          'estimate-table--column__number': !header.value,
        }"
        :style="{ width: `${header.width}px` }"
      >
        <span>{{ header.title }}</span>
        <table-side-menu
          v-if="header.department?.id"
          :list="getDepartmentMenu(header.isDisabled)"
          @toggle-department="$emit('toggle-department', header.department?.id)"
        ></table-side-menu>
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
  PropType,
} from "vue";
import { IConfig } from "estimate-library/build/types/IConfig";
import { TableAction } from "@/components/table/models/table-action";
import TableSideMenu from "@/components/table/TableSideMenu.vue";
import draggable from "vuedraggable";
import TableColumn from "@/components/table/models/table-column";
import useTableStyles from "@/components/table/composables/useTableStyles";

defineComponent(["draggable"]);

const emit = defineEmits(["update-column"]);

const props = defineProps({
  config: Object as PropType<IConfig>,
  columns: { type: Object as PropType<Array<TableColumn>>, required: true },
});

const { tableStyles } = useTableStyles(props.columns);

const getDepartmentMenu = (isDisabled: boolean): Array<TableAction> => [
  {
    text: isDisabled ? "Enable" : "Disable",
    action: "toggle-department",
  },
];

const columnModel = computed({
  get() {
    return props.columns;
  },
  set(value) {
    emit("update-column", value);
  },
});
</script>
