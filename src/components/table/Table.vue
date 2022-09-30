<!-- eslint-disable -->
<template>
  <table v-if="estimateTable" class="estimate-table">
    <table-header :config="estimateTable.config" @toggle-department="debug($event)"></table-header>
    <table-body :estimate="estimateTable"></table-body>
  </table>
</template>

<script setup lang="ts">
import Table from "estimate-library";
// import Table from "../../../../estimate-table-lib/build/index.js";
import { onMounted, ref } from "vue";
import mockDepartments from "@/helpers/mock-departments";
import TableHeader from "@/components/table/TableHeader.vue";
import TableBody from "@/components/table/TableBody.vue";

const estimateTable = ref();

onMounted(() => {
  estimateTable.value = Table({
    departments: mockDepartments,
    margin: 10,
    discount: 10,
    fees: 5,
    taxes: 7,
  });

  estimateTable.value.createTable();

  console.log(estimateTable.value, "table here");
});

const debug = (foo) => {
  console.log("foo", foo);
  estimateTable.value.toggleDepartment(foo);
  console.log(estimateTable.value.sections, "after toggle");
};
</script>

<style lang="scss">
@import "./table";
</style>
