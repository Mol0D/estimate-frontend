<template>
  <table-cell
    :class="{
      'estimate-table--input-disable': row.isDisabled,
      'estimate-table--column-disable': department.isDisabled,
    }"
    :value="department.value"
    @input="$emit('update-dep', $event)"
  ></table-cell>
</template>

<script setup lang="ts">
import { computed, defineProps, PropType } from "vue";
import IRow from "estimate-library/build/types/IRow";
import TableCell from "@/components/table/TableCell.vue";

const props = defineProps({
  row: { type: Object as PropType<IRow>, required: true },
  depId: { type: Number },
});

const department = computed(() =>
  props.row.departments.find((dep) => dep.id === props.depId)
);
</script>
