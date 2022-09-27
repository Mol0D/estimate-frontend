<template>
  <template v-for="(task, t) in section.tasks" :key="t">
    <tr>
      <td colspan="999">
        <input
          :value="section.name"
          @input="$emit('update-section-name', $event.target.value)"
        />
      </td>
    </tr>
    <table-row
      :row="task"
      @update-dep="$emit('update-dep', { taskId: task.id, ...$event })"
    ></table-row>
    <table-row :row="section.total"></table-row>
  </template>
</template>

<script setup lang="ts">
import { defineProps, PropType } from "vue";
import ISection from "estimate-library/build/types/ISection";
import TableRow from "@/components/table/TableRow.vue";

const props = defineProps({
  section: Object as PropType<ISection>,
});
</script>
