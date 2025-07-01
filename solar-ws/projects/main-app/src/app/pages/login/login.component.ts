import { Component, computed, inject, signal } from '@angular/core';
import { AuthStore } from '../../stores/auth/auth.store';
import { SharedModule } from '@solar-lib';

@Component({
  selector: 'app-login',
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {
  readonly auth = inject(AuthStore);

  readonly usercode = signal('');
  readonly password = signal('');
  readonly canSubmit = computed(() => this.usercode() && this.password());

  login() {
    console.log('Login with', this.usercode(), this.password());
    this.auth.login({
      id: 'bla bla bla', 
      email: 'bla@gmail.com', 
      dispalyName: 'Bla Smith', 
      companies: [
        {id: 'company1', dispalyName: 'Company 1'},
        {id: 'company2', dispalyName: 'Company 2'}
      ], 
      imageUrl: ''      
    })
  }

}
