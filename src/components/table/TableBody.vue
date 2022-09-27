<template>
  <tbody>
    <!-- eslint-disable -->
    <table-section
      v-for="(section, s) in estimate.sections"
      :key="s"
      :section="section"
      @update-section-name="estimate.updateSectionName(section.id, $event)"
      @update-dep="estimate.updateTaskValue(section.id, ...Object.values($event))"
    ></table-section>
    <table-row :row="estimate.subtotal"></table-row>
    <table-row :row="estimate.discount"></table-row>
    <table-row :row="estimate.fees"></table-row>
    <table-row :row="estimate.taxes"></table-row>
    <table-row :row="estimate.total"></table-row>
  </tbody>
</template>

<script setup lang="ts">
import { defineProps, PropType } from "vue";
import IEstimate from "estimate-library/build/types/IEstimate";
import TableSection from "@/components/table/TableSection.vue";
import TableRow from "@/components/table/TableRow.vue";

const props = defineProps({
  estimate: Object as PropType<IEstimate>,
});
</script>
