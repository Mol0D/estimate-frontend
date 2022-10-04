import TableColumn from "@/components/table/models/table-column";
import IDepartment from "estimate-library/build/types/IDepartment";
import { TableCustomizedColumnsEnum } from "@/components/table/models/table-customized-columns-map";

const useInitialColumns = (
  departments: Array<IDepartment>
): Array<TableColumn> => {
  const columns: Array<TableColumn> = [
    {
      title: "",
      resizable: false,
      draggable: false,
      customizedType: TableCustomizedColumnsEnum.NUMBER,
    },
    {
      title: "Name",
      value: "name",
      resizable: true,
      draggable: false,
      customizedType: TableCustomizedColumnsEnum.NAME,
    },
    {
      title: "Margin",
      value: "margin",
      resizable: true,
      draggable: true,
    },
    {
      title: "Cost price",
      value: "costPrice",
      resizable: true,
      draggable: true,
    },
    {
      title: "Price",
      value: "price",
      resizable: true,
      draggable: true,
    },
  ];

  columns.splice(
    2,
    0,
    ...departments.map((dep: IDepartment) => ({
      title: dep.name,
      resizable: true,
      draggable: true,
      customizedType: TableCustomizedColumnsEnum.DEPARTMENT,
      department: {
        id: dep.id,
        isDisabled: dep.isDisabled,
      },
    }))
  );

  return columns;
};

export default useInitialColumns;
