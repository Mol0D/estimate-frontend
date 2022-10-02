<!-- eslint-disable -->
<template>
  <table v-if="estimateTable && tableColumns.length" class="estimate-table">
    <table-header
      :config="estimateTable.config"
      :columns="tableColumns"
      @toggle-department="estimateTable.toggleDepartment($event)"
      @update-column="tableColumns = $event"
    ></table-header>
    <table-body :estimate="estimateTable" :columns="tableColumns"></table-body>
  </table>
</template>

<script setup lang="ts">
import Table from "estimate-library";
// import Table from "../../../../estimate-table-lib/build/index.js";
import { onMounted, ref } from "vue";
import mockDepartments from "@/helpers/mock-departments";
import TableHeader from "@/components/table/TableHeader.vue";
import TableBody from "@/components/table/TableBody.vue";
import useInitialColumns from "@/components/table/composables/useInitialColumns";
import TableColumn from "@/components/table/models/table-column";

const estimateTable = ref();
const tableColumns = ref<Array<TableColumn>>();

onMounted(() => {
  estimateTable.value = Table({
    departments: mockDepartments,
    margin: 10,
    discount: 10,
    fees: 5,
    taxes: 7,
  });

  tableColumns.value = useInitialColumns(
    estimateTable.value.config.departments
  );

  estimateTable.value.createTable();

  console.log(estimateTable.value, "table here");
});

// const debug = (foo) => {
//   console.log("foo", foo);
//   estimateTable.value.toggleDepartment(foo);
//   console.log(estimateTable.value.sections, "after toggle");
// };

// const debugHelper = (obj) => {
//   console.log(obj, 'debug');
// }
</script>

<style lang="scss">
@import "./table";
</style>
