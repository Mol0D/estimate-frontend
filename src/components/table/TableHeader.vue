<template>
  <thead class="estimate-table--row">
    <draggable v-model="columnModel" tag="tr" :item-key="(key) => key">
      <template #item="{ element: header }">
        <th
          scope="col"
          :class="{
            'estimate-table--column-disable':
              header.department?.id && header.isDisabled,
            'estimate-table--column__department': header.department?.id,
            'estimate-table--column__number': !header.value,
          }"
        >
          <span>{{ header.title }}</span>
          <table-side-menu
            v-if="header.department?.id"
            :list="getDepartmentMenu(header.isDisabled)"
            @toggle-department="
              $emit('toggle-department', header.department?.id)
            "
          ></table-side-menu>
        </th>
      </template>
    </draggable>
  </thead>
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

defineComponent(["draggable"]);

const emit = defineEmits(["update-column"]);

const props = defineProps({
  config: Object as PropType<IConfig>,
  columns: Object as PropType<Array<TableColumn>>,
});

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
