import { inject, Injectable } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";

@Injectable({providedIn: 'root'})
export class InitService {
    readonly matIconRegistry = inject(MatIconRegistry);


    init() {
        this.matIconRegistry.setDefaultFontSetClass('material-symbols-outlined');
        this.matIconRegistry.registerFontClassAlias('icons', 'material-icons-sharp');
        this.matIconRegistry.addSvgIcon('flower', 'illustration.svg');

    }
}