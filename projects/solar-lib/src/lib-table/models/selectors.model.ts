import { LibTableDataType } from "./lib-table-values.model";

export type TrackBySelector<T extends LibTableDataType> = 
    | ((t: T, index: number) => number)
    | ((t: T, index: number) => string)
    | ((t: T, index: number) => T);

export type ValueSelector<T extends LibTableDataType> = 
    | ((t: T, index: number) => number)
    | ((t: T, index: number) => string);
