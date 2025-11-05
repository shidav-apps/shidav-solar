import { SortDetails } from "../models/sort.model";

export function calcNewSort(oldSort: SortDetails, column: string): SortDetails {
    if (column === oldSort.column) return {
        ...oldSort, 
        direction: (oldSort.direction === 'asc' ? 'desc' : 'asc')
    };
    
    if (column === '') return {
        column: '', 
        direction: ''
    } 

    return {
        column, 
        direction: 'asc'
    }
}