<!-- eslint-disable -->
<template>
  <div>
    <div v-if="estimate && tableColumns.length" class="estimate-table" ref="estimateTableRef">
      <table-header
        :config="estimate.config"
        :columns="tableColumns"
        :table-height="tableHeight"
        @toggle-department="estimate.toggleDepartment($event)"
        @update-column="tableColumns = $event"
      ></table-header>
      <table-body :estimate="estimate" :columns="tableColumns"></table-body>
    </div>
  </div>
</template>

<script setup lang="ts">
// import Table from "../../../../estimate-table-lib/build/index.js";
import { defineExpose, ref, computed, defineProps, PropType, watch } from "vue";
import TableHeader from "@/components/table/components/TableHeader.vue";
import TableBody from "@/components/table/components/TableBody.vue";
import useInitialColumns from "@/components/table/composables/useInitialColumns";
import TableColumn from "@/components/table/models/table-column";
import IEstimate from "estimate-library/build/types/IEstimate";
// import useTableResizeColumns from "@/components/table/composables/useTableResizeColumns";

const tableColumns = ref<Array<TableColumn>>([]);
const estimateTableRef = ref<HTMLElement | null>(null);

defineExpose({ estimateTableRef });

const props = defineProps({
  estimate: { type: Object as PropType<IEstimate>, required: true },
});

const tableHeight = computed(() => estimateTableRef.value?.offsetHeight || 0);

watch(
  () => props.estimate,
  () => {
    tableColumns.value = useInitialColumns(props.estimate.config.departments);

    props.estimate.createTable();

    console.log(props.estimate, "table here");
  }
);
</script>

<style lang="scss">
@import "./table";
</style>
