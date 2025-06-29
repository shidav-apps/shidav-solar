import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login-data',
  imports: [MatInputModule, MatButtonModule],
  templateUrl: './login-data.component.html',
  styleUrl: './login-data.component.scss'
})
export class LoginDataComponent {

}
