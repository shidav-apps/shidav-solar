import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";

const commonImports = [
  CommonModule, 
  RouterModule, 
  MatButtonModule,
  MatIconModule
];


@NgModule({
  declarations: [],
  imports: [...commonImports],
  exports: [...commonImports]
})
export class SharedModule {}