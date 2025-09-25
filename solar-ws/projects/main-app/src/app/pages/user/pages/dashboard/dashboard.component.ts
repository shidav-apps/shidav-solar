import { Component, computed, inject } from '@angular/core';
import { DashboardStore } from './store/dashboard.store';
import { SharedModule } from '@solar-lib';
import { BusyComponent } from "../../../../components/busy/busy.component";
import { Functions, httpsCallableData } from '@angular/fire/functions';

@Component({
  selector: 'app-dashboard',
  imports: [SharedModule, BusyComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss', 
  providers: [DashboardStore]
})
export default class DashboardComponent {
  readonly store = inject(DashboardStore);

  readonly functions = inject(Functions);


  readonly totals = computed(() => this.store.dashboardData().value?.totals ?? {
    totalEnergy: 0,
    daylightHoursAvg: 0,
    efficiency: 0,
    totalRevenue: 0
  })

  callHelloWorld() {
    const helloWorld = httpsCallableData<void, string>(this.functions, 'helloWorld');
    helloWorld().subscribe(val => {
      console.log('The function returned with the value: ', val);
    })

  }

}
