import { TemplateRef } from "@angular/core";
import { LibTableDataType, LibTableValueType } from "../models/lib-table-values.model";
import { CellTemplateContext } from "../models/template-context.model";

export interface CellVm {
    readonly rowKey: LibTableDataType;
    readonly columnId: string;
    readonly value: LibTableValueType;
    readonly item: LibTableDataType;
    readonly template: TemplateRef<CellTemplateContext>;
    readonly rowIndex: number;
    readonly isRowSelected: boolean;
    readonly width: number;

}