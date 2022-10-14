<template>
  <div
    ref="tableResizeButtonRef"
    class="estimate-table--resize-button"
    :style="{ height: `${height}px` }"
    @mousedown="mouseDownHandler($event)"
  ></div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, defineEmits } from "vue";

defineProps({
  height: Number,
});

const emit = defineEmits(["resize:start", "resize:end", "resize"]);

const tableResizeButtonRef = ref();
const currentColumn = ref<any>();
const currentElementWidth = ref<number>(0);
const pageX = ref<number>(0);
const isClicked = ref(false);

const mouseDownHandler = (e) => {
  isClicked.value = true;
  pageX.value = e.pageX;

  const padding = paddingDiff(currentColumn.value);

  currentElementWidth.value = currentColumn.value?.offsetWidth - padding;

  document.addEventListener("mousemove", mouseMoveHandler);

  document.addEventListener("mouseup", mouseUpHandler);

  document.body.style.cursor = "col-resize";
};

const mouseMoveHandler = (e) => {
  if (!isClicked.value) return;
  const diffX = e.pageX - pageX.value;

  emit("resize", currentElementWidth.value + diffX);
};

const mouseUpHandler = () => {
  document.body.style.cursor = "auto";
  emit("resize:end");
  isClicked.value = false;
  pageX.value = 0;
  currentElementWidth.value = 0;
};

onMounted(() => {
  currentColumn.value = tableResizeButtonRef.value.parentElement;

  tableResizeButtonRef.value.addEventListener("mouseover", () => {
    emit("resize:start");
  });

  tableResizeButtonRef.value.addEventListener("mouseout", () => {
    emit("resize:end");
  });
});

const paddingDiff = (col: any) => {
  if (getStyleVal(col, "box-sizing") === "border-box") return 0;

  const padLeft = getStyleVal(col, "padding-left");
  const padRight = getStyleVal(col, "padding-right");

  return parseInt(padLeft) + parseInt(padRight);
};

const getStyleVal = (elm: any, css: any) =>
  window.getComputedStyle(elm, null).getPropertyValue(css);
</script>
