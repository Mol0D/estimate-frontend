<template>
  <input
    class="table--input"
    :value="props.value"
    @input="$emit('input', +$event.target.value)"
  />
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  value: { type: Number, required: true },
});

defineEmits(["input"]);
</script>
