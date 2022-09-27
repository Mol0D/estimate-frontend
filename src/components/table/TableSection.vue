<template>
  <template v-for="(task, t) in section.tasks" :key="t">
    <tr>
      <td colspan="999">
        <input
          class="table--input"
          :value="section.name"
          @input="$emit('update-section-name', $event.target.value)"
        />
      </td>
    </tr>
    <table-row
      :row="task"
      @update-row-name="$emit('update-row-name', { taskId: task.id, $event })"
      @update-dep="$emit('update-dep', { taskId: task.id, ...$event })"
    ></table-row>
    <table-row :row="section.total"></table-row>
  </template>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, PropType } from "vue";
import ISection from "estimate-library/build/types/ISection";
import TableRow from "@/components/table/TableRow.vue";

const props = defineProps({
  section: Object as PropType<ISection>,
});

defineEmits(["update-row-name", "update-dep"]);
</script>
