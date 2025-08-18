import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';

const commonImports = [
  CommonModule,
  RouterModule,
  FormsModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatExpansionModule,
];

@NgModule({
  declarations: [],
  imports: [...commonImports],
  exports: [...commonImports],
})
export class SharedModule {}
