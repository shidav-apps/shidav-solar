import { Component } from '@angular/core';
import { SharedModule } from '@solar-lib';
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: 'app-user',
  imports: [SharedModule, HeaderComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export default class UserComponent {

}
