<template>
  <div>
    <estimate-form :estimate="estimate"></estimate-form>

    <div style="padding-top: 200px">
      <estimate-table-component :estimate="estimate"></estimate-table-component>
    </div>
  </div>
</template>

<script setup lang="ts">
import EstimateTableComponent from "@/components/table/Table.vue";
import EstimateForm from "@/views/estimate/components/EstimateForm.vue";
// import Table from "estimate-library";
import Table from "../../../../estimate-table-lib/build/index.js";
import { onMounted, ref } from "vue";
import mockDepartments from "@/helpers/mock-departments";

const estimate = ref();

onMounted(() => {
  estimate.value = Table({
    departments: mockDepartments,
    margin: 0,
    discount: 0,
    fees: 0,
    taxes: 0,
  });
});
</script>
