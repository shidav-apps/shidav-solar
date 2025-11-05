import { HeaderTemplateContext } from './../models/template-context.model';
import { Directive, TemplateRef, inject } from "@angular/core";

@Directive({
    standalone: false,
    selector: '[libHeader]'
})
export class TableHeaderDirective {
    readonly template = inject(TemplateRef) as TemplateRef<HeaderTemplateContext>;
}