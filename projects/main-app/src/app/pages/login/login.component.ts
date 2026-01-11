import { Component, computed, inject, signal } from '@angular/core';
import { AuthStore } from '../../stores/auth/auth.store';
import { SharedModule } from '@solar-lib';
import { SOLAR_API } from '@contract';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {
  readonly auth = inject(AuthStore);
  readonly api = inject(SOLAR_API);
  readonly dataFromServer = signal<string[]>(['No Data Yet']);


  readonly usercode = signal('');
  readonly password = signal('');
  readonly canSubmit = computed(() => this.usercode() && this.password());

  login() {
    console.log('Login with', this.usercode(), this.password());
    this.auth.login({userid: this.usercode(), password: this.password()})
  }

  async getDateFromServer() {
    try {
      const val = await firstValueFrom(this.api.getCompanies());
      this.dataFromServer.set(val);
    } catch (error) {
      console.log('Error getting data from server', error);
      this.dataFromServer.set(['Error getting data from server']);
    }
  }

}
