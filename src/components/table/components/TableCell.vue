<template>
  <input
    class="estimate-table--input"
    type="number"
    v-model.number="modelValue"
  />
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from "vue";

const props = defineProps({
  value: { type: Number, required: true },
});

const modelValue = computed({
  get() {
    return props.value.toString();
  },
  set(value) {
    emits("input", value);
  },
});

const emits = defineEmits(["input"]);
</script>
