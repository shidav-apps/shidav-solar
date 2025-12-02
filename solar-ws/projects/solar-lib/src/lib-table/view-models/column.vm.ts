import { SortDirection } from '@angular/material/sort';
import { TemplateRef } from "@angular/core";
import { HeaderTemplateContext } from "../models/template-context.model";
import { ColumnWidth } from '@solar-lib';
import { ColumnWidthVm } from './column-width.vm';

export interface ColumnVm {
    readonly id: string;
    readonly header: string;
    readonly template: TemplateRef<HeaderTemplateContext>;
    readonly sortDirection: SortDirection;
    readonly sortable: boolean;
    readonly width: ColumnWidthVm;
}