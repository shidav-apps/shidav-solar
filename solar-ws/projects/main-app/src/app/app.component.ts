import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { SOLAR_API } from '@contract';
import { SharedModule } from '@solar-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss', 
  imports: [SharedModule, FormsModule],
})
export class AppComponent {
  

}
