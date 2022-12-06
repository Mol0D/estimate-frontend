<template>
  <div class="flex flex-col">
    <div class="grid grid-cols-3 gap-4">
      <div class="flex flex-col items-start">
        <span class="pl-3">Margin, %</span>
        <input
          v-model="form.margin"
          type="number"
          class="rounded outline-0 py-2 px-3 w-full"
          @input="inputHandler('margin')"
        />
      </div>

      <div class="flex flex-col items-start">
        <span class="pl-3">Discount, %</span>
        <input
          v-model="form.discount"
          type="number"
          class="rounded outline-0 py-2 px-3 w-full"
          @input="inputHandler('discount')"
        />
      </div>

      <div class="flex flex-col items-start">
        <span class="pl-3">Fees, %</span>
        <input
          v-model="form.fees"
          type="number"
          class="rounded outline-0 py-2 px-3 w-full"
          @input="inputHandler('fees')"
        />
      </div>

      <div class="flex flex-col items-start">
        <span class="pl-3">Taxes, %</span>
        <input
          v-model="form.taxes"
          type="number"
          class="rounded outline-0 py-2 px-3 w-full"
          @input="inputHandler('taxes')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, defineProps, ref } from "vue";
import IEstimate from "estimate-library/build/types/IEstimate";

const props = defineProps({
  estimate: { type: Object as PropType<IEstimate>, required: true },
});

const emptyForm = (): Record<string, number | null> => ({
  fees: 0,
  discount: 0,
  taxes: 0,
  margin: 0,
});

const form = ref<Record<string, number | null>>(emptyForm());

const inputHandler = (type: string) => {
  props.estimate.setConfig({ [type]: form.value[type] });
};
</script>
