import { LibTableDataType } from "./lib-table-values.model";
import { ValueSelector } from "./selectors.model";

export interface LibTableColumnDefinition<T extends LibTableDataType> {
    readonly id: string;
    readonly header?: string;

    readonly value?: ValueSelector<T>;
    readonly width?: number;
}