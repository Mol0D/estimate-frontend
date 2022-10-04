import TableColumn from "@/components/table/models/table-column";
import { computed } from "vue";

const useTableStyles = (columns: Array<TableColumn>) => {
  const tableStyles = computed(() => {
    const widths = columns?.map((col: TableColumn) => `${col.width}px`) || [];

    return {
      "grid-template-columns": widths.length ? widths.join(" ") : "none",
    };
  });

  return {
    tableStyles,
  };
};

export default useTableStyles;
