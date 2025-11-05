import { NgModule } from "@angular/core";
import { TableCellDirective } from "./directives/table-cell.directive";
import { TableHeaderDirective } from "./directives/table-header.directive";
import { ColumnComponent } from "./components/column/column.component";
import { LibTableComponent } from "./lib-table.component";
import { DataRowComponent } from "./components/data-row/data-row.component";
import { HeaderRowComponent } from "./components/header-row/header-row.component";
import { SortArrowComponent } from "./components/sort-arrow/sort-arrow.component";
import { MatIconModule } from "@angular/material/icon";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CommonModule } from "@angular/common";

const exportables = [
    TableCellDirective, 
    TableHeaderDirective, 
    ColumnComponent, 
    LibTableComponent
]

const privates = [
    DataRowComponent, 
    HeaderRowComponent, 
    SortArrowComponent
]

@NgModule({
    declarations: [
        ...exportables, 
        ...privates
    ],
    imports: [
        MatIconModule, 
        ScrollingModule, 
        CommonModule
    ], 
    exports: [
        ...exportables
    ]
})
export class LibTableModule {}