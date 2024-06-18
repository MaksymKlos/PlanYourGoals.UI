import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { CommonMaterialModule } from '../../../../common-modules/common-material.module';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMenuModule} from '@angular/material/menu'; 



@NgModule({
  declarations: [
    TaskComponent,
    TaskDialogComponent
  ],
  imports: [
    CommonModule,
    CommonMaterialModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatMenuModule
  ],
  exports: [
    TaskComponent
  ]
})
export class TaskModule { }
