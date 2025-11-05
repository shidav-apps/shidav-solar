import { CellTemplateContext } from './../models/template-context.model';
import { Directive, TemplateRef, inject } from "@angular/core";


@Directive({
    standalone: false,
    selector: '[libCell]'
})
export class TableCellDirective {
    readonly template = inject(TemplateRef) as TemplateRef<CellTemplateContext>;
}