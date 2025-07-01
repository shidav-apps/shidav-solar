import { Component, inject } from '@angular/core';
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

  login() {
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
