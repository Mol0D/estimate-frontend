<template>
  <thead>
    <tr class="estimate-table--row">
      <th class="estimate-table--column__number"></th>
      <th>Name</th>
      <template v-for="(dep, d) in props.config.departments" :key="d">
        <th
          class="estimate-table--column__department"
          :class="{ 'estimate-table--column-disable': dep.isDisabled }"
        >
          <span>{{ dep.name }}</span>
          <table-side-menu
            :list="getDepartmentMenu(dep)"
            @toggle-department="$emit('toggle-department', dep.id)"
          ></table-side-menu>
        </th>
      </template>
      <th>Cost price</th>
      <th>Margin: {{ props.config.margin }} %</th>
      <th>Price</th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { IConfig } from "estimate-library/build/types/IConfig";
import { TableAction } from "@/components/table/models/tabla-actions";
import IDepartment from "estimate-library/build/types/IDepartment";
import TableSideMenu from "@/components/table/TableSideMenu.vue";

const props = defineProps({
  config: Object as PropType<IConfig>,
});

const getDepartmentMenu = (department: IDepartment): Array<TableAction> => [
  {
    text: department.isDisabled ? "Enable" : "Disable",
    action: "toggle-department",
  },
];
</script>
