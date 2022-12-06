<template>
  <input
    class="estimate-table--input"
    :class="{ 'estimate-table--input-disable': row.isDisabled }"
    :value="getName"
    :disabled="!showMenu"
    @input="$emit('update-row-name', $event.target.value)"
  />
</template>

<script setup lang="ts">
import { computed, defineProps, PropType } from "vue";
import IRow from "estimate-library/build/types/IRow";

const props = defineProps({
  row: { type: Object as PropType<IRow>, required: true },
  showMenu: { type: Boolean, default: false },
  percent: { type: String, required: true },
});

const getName = computed(
  () => `${props.row.name} ${props.percent ? ` (${props.percent}%)` : ""}`
);
</script>
