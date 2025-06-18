import { inject, Injectable } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable({providedIn: 'root'})
export class InitService {
    readonly matIconRegistry = inject(MatIconRegistry);
    readonly domSanitizer = inject(DomSanitizer);


    init() {
        const illustrationIcon = this.domSanitizer.bypassSecurityTrustResourceUrl('Illustration.svg');


        this.matIconRegistry.setDefaultFontSetClass('material-symbols-outlined');
        this.matIconRegistry.registerFontClassAlias('icons', 'material-icons-sharp');
        this.matIconRegistry.addSvgIcon('flower', illustrationIcon);

    }
}