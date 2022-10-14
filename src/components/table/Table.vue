<!-- eslint-disable -->
<template>
  <div v-if="estimateTable && tableColumns.length" class="estimate-table" ref="estimateTableRef">
    <table-header
      :config="estimateTable.config"
      :columns="tableColumns"
      :table-height="tableHeight"
      @toggle-department="estimateTable.toggleDepartment($event)"
      @update-column="tableColumns = $event"
    ></table-header>
    <table-body :estimate="estimateTable" :columns="tableColumns"></table-body>
  </div>
</template>

<script setup lang="ts">
import Table from "estimate-library";
// import Table from "../../../../estimate-table-lib/build/index.js";
import { defineExpose, onMounted, ref, nextTick, computed } from "vue";
import mockDepartments from "@/helpers/mock-departments";
import TableHeader from "@/components/table/components/TableHeader.vue";
import TableBody from "@/components/table/components/TableBody.vue";
import useInitialColumns from "@/components/table/composables/useInitialColumns";
import TableColumn from "@/components/table/models/table-column";
import useTableResizeColumns from "@/components/table/composables/useTableResizeColumns";

const estimateTable = ref();
const tableColumns = ref<Array<TableColumn>>([]);
const estimateTableRef = ref<HTMLElement | null>(null);

defineExpose({ estimateTableRef });

const tableHeight = computed(() => estimateTableRef.value?.offsetHeight || 0);

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
