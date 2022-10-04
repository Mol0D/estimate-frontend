<template>
  <input
    class="estimate-table--input"
    :class="{ 'estimate-table--input-disable': row.isDisabled }"
    :value="row.name"
    :disabled="!showMenu"
    @input="$emit('update-row-name', $event.target.value)"
  />
</template>

<script setup lang="ts">
import { defineProps, PropType } from "vue";
import IRow from "estimate-library/build/types/IRow";

defineProps({
  row: { type: Object as PropType<IRow>, required: true },
  showMenu: { type: Boolean, default: false },
});
</script>
