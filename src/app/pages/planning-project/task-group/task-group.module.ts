import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskGroupComponent } from './task-group.component';
import { TaskModule } from './task/task.module';
import { CommonMaterialModule } from '../../../common-modules/common-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskGroupDialogComponent } from './task-group-dialog/task-group-dialog.component';



@NgModule({
  declarations: [
    TaskGroupComponent,
    TaskGroupDialogComponent
  ],
  imports: [
    CommonModule,
    CommonMaterialModule,
    ReactiveFormsModule,
    TaskModule
  ],
  exports: [
    TaskGroupComponent
  ]
})
export class TaskGroupModule { }
