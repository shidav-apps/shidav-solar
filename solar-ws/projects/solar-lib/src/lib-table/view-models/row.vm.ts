import { LibTableDataType } from "../models/lib-table-values.model";
import { CellVm } from "./cell.vm";

export interface RowVm {
    readonly key: LibTableDataType;
    readonly cells: CellVm[];
    readonly isSelected: boolean;
    readonly item: LibTableDataType;
    readonly index: number;
}