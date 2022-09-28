<template>
  <thead>
    <tr class="estimate-table--row">
      <th class="estimate-table--column__number"></th>
      <th>Name</th>
      <template v-for="(dep, d) in props.config.departments" :key="d">
        <th class="estimate-table--column__department">{{ dep.name }}</th>
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
