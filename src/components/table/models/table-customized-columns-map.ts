import TableDepartmentColumn from "@/components/table/columns/TableDepartmentColumn.vue";
import TableNameColumn from "@/components/table/columns/TableNameColumn.vue";
import TableNumberColumn from "@/components/table/columns/TableNumberColumn.vue";

export enum TableCustomizedColumnsEnum {
  NAME = "name",
  DEPARTMENT = "department",
  NUMBER = "number",
}

export default class TableCustomizedColumnsMap {
  public static readonly COMPONENTS: Record<string, unknown> = {
    [TableCustomizedColumnsEnum.NAME]: TableNameColumn,
    [TableCustomizedColumnsEnum.DEPARTMENT]: TableDepartmentColumn,
    [TableCustomizedColumnsEnum.NUMBER]: TableNumberColumn,
  };
}
