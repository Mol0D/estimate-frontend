import { TableCustomizedColumnsEnum } from "@/components/table/models/table-customized-columns-map";

export default interface TableColumn {
  title: string;
  value?: string;
  resizable: boolean;
  draggable: boolean;
  customizedType?: TableCustomizedColumnsEnum;
  department?: {
    id: number;
    isDisabled: boolean;
  };
}