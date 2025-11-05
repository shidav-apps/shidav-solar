import { LibTableKeyType } from "../models/lib-table-values.model";
import { LibTableSelectionMode } from "../store/lib-table.slice";
import { ColumnVm } from "./column.vm";
import { RowVm } from "./row.vm";

export interface TableVm {
    readonly columns: ColumnVm[];
    readonly rows: RowVm[];
    readonly selectedKey: LibTableKeyType | null;
    readonly selectionMode: LibTableSelectionMode;
    readonly sortable: boolean;
}