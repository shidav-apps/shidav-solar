import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SOLAR_API } from '@contract';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss', 
  imports: [CommonModule],
})
export class AppComponent {
  readonly api = inject(SOLAR_API);

  readonly records = toSignal(this.api.getAllRecords(), {initialValue: []});

}
