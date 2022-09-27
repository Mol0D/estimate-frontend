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
  border: 1px solid #ececee;
  border-collapse: collapse;

  tr {
    height: 48px;
  }

  th,
  td {
    border: 1px solid #ececee;
  }

  th,
  td {
    background-color: #ffffff;
  }

  &--input {
    width: 100%;
    height: 48px;
    border: none;
    font-size: 24px;
    text-align: center;
  }

  &--row {
    &__discount {
      td,
      input {
        background-color: #e0f7ef !important;
      }
    }

    &__fees {
      td,
      input {
        background-color: #e7f6fd !important;
      }
    }

    &__taxes {
      td,
      input {
        background-color: #feeeee !important;
      }
    }

    &__total {
      td,
      input {
        background-color: #2f3778 !important;
        color: #fbfcfe !important;
      }
    }
  }
}
</style>
