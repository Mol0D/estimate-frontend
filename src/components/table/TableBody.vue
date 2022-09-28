<template>
  <tbody>
    <!-- eslint-disable -->
    <table-section
      v-for="(section, s) in estimate.sections"
      :key="s"
      :section="section"
      :allow-delete="estimate.sections.length > 1"
      :start-index="getIndex(s)"
      @add-section="estimate.addSection()"
      @add-row="estimate.addRow(section.id)"
      @duplicate-row="estimate.duplicateRow(section.id, $event)"
      @delete-row="estimate.deleteRow(section.id, $event)"
      @duplicate-section="estimate.duplicateSection(section.id)"
      @delete-section="estimate.deleteSection(section.id)"
      @update-row-name="estimate.updateRowName(section.id, ...Object.values($event))"
      @update-section-name="estimate.updateSectionName(section.id, $event)"
      @update-dep="estimate.updateTaskValue(section.id, ...Object.values($event))"
    ></table-section>
    <table-row :row="estimate.subtotal"></table-row>
    <table-row class="estimate-table--row__discount" :row="estimate.discount"></table-row>
    <table-row class="estimate-table--row__fees" :row="estimate.fees"></table-row>
    <table-row class="estimate-table--row__taxes" :row="estimate.taxes"></table-row>
    <table-row class="estimate-table--row__total" :row="estimate.total"></table-row>
  </tbody>
</template>

<script setup lang="ts">
import { defineProps, PropType } from "vue";
import IEstimate from "estimate-library/build/types/IEstimate";
import TableSection from "@/components/table/TableSection.vue";
import TableRow from "@/components/table/TableRow.vue";

const props = defineProps({
  estimate: { type: Object as PropType<IEstimate>, required: true },
});

// const debugHelper = (...obj) => {
//   console.log(...Object.values(obj), 'debug');
// }

const getIndex = (s: number) => {
  let count = 1;

  for (let i = 0; i < s; i++) {
    if (i <= s) {
      count += props.estimate.sections[i].tasks.length;
    }
  }

  return count;
};
</script>
