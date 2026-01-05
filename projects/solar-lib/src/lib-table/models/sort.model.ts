export type ColumnSortDirection = '' | 'asc' | 'desc';


export interface SortDetails {
    readonly column: string;
    readonly direction: ColumnSortDirection;
}