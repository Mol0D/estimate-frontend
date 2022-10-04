<template>
  <!-- eslint-disable -->
  <div>
    <draggable v-model="sectionModel" item-key="id">
      <template #item="{ element, index}">
        <table-section
          :section="element"
          :allow-delete="estimate.sections.length > 1"
          :start-index="getIndex(index)"
          :columns="columns"
          @add-section="estimate.addSection()"
          @add-row="estimate.addRow(element.id)"
          @duplicate-row="estimate.duplicateRow(element.id, $event)"
          @toggle-row="estimate.toggleTaskInSection(element.id, $event)"
          @delete-row="estimate.deleteRow(element.id, $event)"
          @duplicate-section="estimate.duplicateSection(element.id)"
          @delete-section="estimate.deleteSection(element.id)"
          @update-row-name="estimate.updateRowName(element.id, ...Object.values($event))"
          @update-section-name="estimate.updateSectionName(element.id, $event)"
          @update-dep="estimate.updateTaskValue(element.id, ...Object.values($event))"
        ></table-section>
      </template>
    </draggable>
  </div>
    <table-row :row="estimate.subtotal" :columns="columns"></table-row>
    <table-row class="estimate-table--row__discount" :row="estimate.discount" :columns="columns"></table-row>
    <table-row class="estimate-table--row__fees" :row="estimate.fees" :columns="columns"></table-row>
    <table-row class="estimate-table--row__taxes" :row="estimate.taxes" :columns="columns"></table-row>
    <table-row class="estimate-table--row__total" :row="estimate.total" :columns="columns"></table-row>
</template>

<script setup lang="ts">
import { computed, defineComponent, defineProps, PropType } from "vue";
import IEstimate from "estimate-library/build/types/IEstimate";
import TableSection from "@/components/table/TableSection.vue";
import TableRow from "@/components/table/TableRow.vue";
import TableColumn from "@/components/table/models/table-column";
import draggable from "vuedraggable";

defineComponent(["draggable"]);

const props = defineProps({
  estimate: { type: Object as PropType<IEstimate>, required: true },
  columns: Object as PropType<Array<TableColumn>>,
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

const sectionModel = computed({
  get: () => props.estimate.sections,
  set: (value) => {
    console.log("value", value);
  },
});
</script>
