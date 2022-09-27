<!-- eslint-disable -->
<template>
  <table v-if="estimateTable" class="table">
    <table-header :config="estimateTable.config"></table-header>
    <table-body :estimate="estimateTable"></table-body>
  </table>
</template>

<script setup lang="ts">
import Table from "estimate-library";
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
.table {
  width: 100%;
  tr {
    height: 48px;
  }
}
</style>
