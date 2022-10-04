<template>
  <tr class="estimate-table--row">
    <td colspan="999" class="estimate-table--column__number">
      <input
        class="estimate-table--input"
        :value="section.name"
        @input="$emit('update-section-name', $event.target.value)"
      />
      <table-side-menu
        :list="sectionActions"
        @add-section="$emit('add-section')"
        @duplicate-section="$emit('duplicate-section')"
        @delete-section="$emit('delete-section')"
      ></table-side-menu>
    </td>
  </tr>
  <table-row
    v-for="(task, t) in section.tasks"
    show-menu
    :key="t"
    :row="task"
    :allow-delete="section.tasks.length > 1"
    :index="startIndex + t"
    :columns="columns"
    @add-row="$emit('add-row')"
    @duplicate-row="$emit('duplicate-row', task.id)"
    @toggle-row="$emit('toggle-row', task.id)"
    @delete-row="$emit('delete-row', task.id)"
    @update-row-name="$emit('update-row-name', { taskId: task.id, $event })"
    @update-dep="$emit('update-dep', { taskId: task.id, ...$event })"
  ></table-row>
  <table-row :row="section.total" :columns="columns"></table-row>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, PropType } from "vue";
import ISection from "estimate-library/build/types/ISection";
import TableRow from "@/components/table/TableRow.vue";
import TableSideMenu from "@/components/table/TableSideMenu.vue";
import { TableAction } from "@/components/table/models/table-action";
import TableColumn from "@/components/table/models/table-column";

const props = defineProps({
  section: { type: Object as PropType<ISection>, required: true },
  allowDelete: { type: Boolean, required: true },
  startIndex: { type: Number, default: 1 },
  columns: Object as PropType<Array<TableColumn>>,
});

const sectionActions = computed((): Array<TableAction> => {
  const actions = [
    {
      text: "Add",
      action: "add-section",
    },
    {
      text: "Duplicate",
      action: "duplicate-section",
    },
  ];

  if (props.allowDelete) {
    actions.push({
      text: "Delete",
      action: "delete-section",
    });
  }

  return actions;
});

defineEmits(["update-row-name", "update-dep", "duplicate-section"]);
</script>
