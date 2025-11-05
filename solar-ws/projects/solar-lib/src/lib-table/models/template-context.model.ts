import { TemplateRef } from "@angular/core";
import { LibTableDataType, LibTableValueType } from "./lib-table-values.model";

export interface HeaderTemplateContext {
    readonly $implicit: string;
    readonly id: string;
}

export interface CellTemplateContext {
    readonly $implicit: LibTableValueType | null;
    readonly item: LibTableDataType;
}

export type TemplateMap<T extends CellTemplateContext | HeaderTemplateContext> = Record<string, TemplateRef<T>>;
