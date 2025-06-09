import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SOLAR_API } from '@contract';
import { SharedModule } from '@solar-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss', 
  imports: [SharedModule],
})
export class AppComponent {
  readonly api = inject(SOLAR_API);

  readonly records = toSignal(this.api.getAllRecords(), {initialValue: []});

}
