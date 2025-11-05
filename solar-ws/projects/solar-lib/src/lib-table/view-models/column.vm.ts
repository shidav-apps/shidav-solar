import { SortDirection } from '@angular/material/sort';
import { TemplateRef } from "@angular/core";
import { HeaderTemplateContext } from "../models/template-context.model";

export interface ColumnVm {
    readonly id: string;
    readonly header: string;
    readonly template: TemplateRef<HeaderTemplateContext>;
    readonly sortDirection: SortDirection;
    readonly sortable: boolean;
    readonly width: number;
}