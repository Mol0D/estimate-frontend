<template>
  <tr>
    <td>1</td>
    <td>{{ row.name }}</td>
    <td v-for="(dep, d) in row.departments" :key="d">
      <table-cell
        :value="dep.value"
        @input="$emit('update-dep', { depId: dep.id, value: $event })"
      ></table-cell>
    </td>
    <td>{{ row.costPrice }}</td>
    <td>margin here</td>
    <td>{{ row.price }}</td>
  </tr>
</template>

<script setup lang="ts">
import { defineProps, PropType } from "vue";
import IRow from "estimate-library/build/types/IRow";
import TableCell from "@/components/table/TableCell.vue";

const props = defineProps({
  row: Object as PropType<IRow>,
});
</script>
