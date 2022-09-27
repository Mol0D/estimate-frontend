<template>
  <div>
    <input
      :value="props.value"
      @input.prevent.stop="$emit('input', +$event.target.value)"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  value: { type: Number, required: true },
});
</script>
