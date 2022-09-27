<template>
  <thead>
    <tr>
      <th></th>
      <th>Name</th>
      <template v-for="(dep, d) in props.config.departments" :key="d">
        <th>{{ dep.name }}</th>
      </template>
      <th>Cost price</th>
      <th>Margin: {{ props.config.margin }} %</th>
      <th>Price</th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { IConfig } from "estimate-library/build/types/IConfig";

const props = defineProps({
  config: Object as PropType<IConfig>,
});
</script>
