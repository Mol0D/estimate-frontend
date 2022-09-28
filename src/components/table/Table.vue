<!-- eslint-disable -->
<template>
  <table v-if="estimateTable" class="estimate-table">
    <table-header :config="estimateTable.config"></table-header>
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
  });

  estimateTable.value.createTable();

  console.log(estimateTable.value, "table here");
});
</script>

<style lang="scss">
@import "./table";
</style>
