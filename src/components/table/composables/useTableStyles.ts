import TableColumn from "@/components/table/models/table-column";
import { computed } from "vue";

const useTableStyles = (props: any) => {
  // const props = defineProps(["columns"]);

  const tableStyles = computed(() => {
    const widths =
      props.columns?.map((col: TableColumn) => `${col.width}px`) || [];

    return {
      "grid-template-columns": widths.length ? widths.join(" ") : "none",
    };
  });

  return {
    tableStyles,
  };
};

export default useTableStyles;
