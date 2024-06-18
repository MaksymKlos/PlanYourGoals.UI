import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanningProjectComponent } from './planning-project.component';
import { TaskGroupModule } from './task-group/task-group.module';
import { CommonMaterialModule } from '../../common-modules/common-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlanningProjectDialogComponent } from './planning-project-dialog/planning-project-dialog.component';

@NgModule({
  declarations: [
    PlanningProjectComponent,
    PlanningProjectDialogComponent
  ],
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TaskGroupModule
  ]
})
export class PlanningProjectModule { }
