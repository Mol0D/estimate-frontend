<template>
  <div>
    <div class="estimate-table--row estimate-table--row__section-name">
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
    </div>
    <draggable
      group="tasks"
      item-key="id"
      :list="section.tasks"
      @change="$emit('update-tasks-order')"
    >
      <template #item="{ element, index }">
        <table-row
          show-menu
          :row="element"
          :allow-delete="section.tasks.length > 1"
          :index="startIndex + index"
          :columns="columns"
          @add-row="$emit('add-row')"
          @duplicate-row="$emit('duplicate-row', element.id)"
          @toggle-row="$emit('toggle-row', element.id)"
          @delete-row="$emit('delete-row', element.id)"
          @update-row-name="
            $emit('update-row-name', { taskId: element.id, $event })
          "
          @update-dep="$emit('update-dep', { taskId: element.id, ...$event })"
        ></table-row>
      </template>
    </draggable>

    <table-row :row="section.total" :columns="columns"></table-row>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  defineComponent,
  defineEmits,
  defineProps,
  PropType,
} from "vue";
import ISection from "estimate-library/build/types/ISection";
import TableRow from "@/components/table/components/TableRow.vue";
import TableSideMenu from "@/components/table/components/TableSideMenu.vue";
import { TableAction } from "@/components/table/models/table-action";
import TableColumn from "@/components/table/models/table-column";
import draggable from "vuedraggable";

defineComponent(["draggable"]);

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
