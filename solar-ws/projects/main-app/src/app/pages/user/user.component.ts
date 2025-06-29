import { Component } from '@angular/core';
import { SharedModule } from '@solar-lib';

@Component({
  selector: 'app-user',
  imports: [SharedModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export default class UserComponent {

}
