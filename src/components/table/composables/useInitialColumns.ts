import TableColumn from "@/components/table/models/table-column";
import IDepartment from "estimate-library/build/types/IDepartment";
import { TableCustomizedColumnsEnum } from "@/components/table/models/table-customized-columns-map";
import { v4 as uuidv4 } from "uuid";

const useInitialColumns = (
  departments: Array<IDepartment>
): Array<TableColumn> => {
  const columns = [
    {
      title: "",
      resizable: false,
      draggable: false,
      customizedType: TableCustomizedColumnsEnum.NUMBER,
      width: 48,
    },
    {
      title: "Name",
      value: "name",
      resizable: true,
      draggable: false,
      customizedType: TableCustomizedColumnsEnum.NAME,
      width: 200,
    },
    {
      title: "Margin",
      value: "margin",
      resizable: true,
      draggable: false,
      width: 150,
    },
    {
      title: "Cost price",
      value: "costPrice",
      resizable: true,
      draggable: false,
      width: 150,
    },
    {
      title: "Price",
      value: "price",
      resizable: true,
      draggable: false,
      width: 150,
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
      width: 150,
      department: {
        id: dep.id,
        isDisabled: dep.isDisabled,
      },
    }))
  );

  return columns.map((col) => ({ ...col, id: uuidv4() }));
};

export default useInitialColumns;
