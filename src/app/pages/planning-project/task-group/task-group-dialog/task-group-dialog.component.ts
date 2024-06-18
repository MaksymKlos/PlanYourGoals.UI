import { Component, Inject, OnInit } from '@angular/core';
import { EditTaskGroup, TaskGroup } from '../../../../models/task-group';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateOnlySpaces } from '../../../../helpers/validators/general-validators';

@Component({
  selector: 'app-task-group-dialog',
  templateUrl: './task-group-dialog.component.html',
  styleUrl: './task-group-dialog.component.scss'
})
export class TaskGroupDialogComponent implements OnInit {
  private taskGroup: TaskGroup | null = null;

  form: FormGroup = this.formBuilder.group({});
  dialogTitle: string = '';

  constructor(
    private dialogRef: MatDialogRef<TaskGroupDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string;
      projectId: number;
      taskGroup: TaskGroup | null;
      createTaskGroup: (taskGroup: EditTaskGroup) => void;
      updateTaskGroup: (taskGroup: EditTaskGroup) => void;
    }
  ){ }

  ngOnInit(): void {
    this.taskGroup = this.data.taskGroup;
    this.dialogTitle = this.data.title;

    this.form = this.formBuilder.group({
      name: [this.taskGroup?.name || '', [Validators.required, validateOnlySpaces(), Validators.maxLength(50)]],
      description: [this.taskGroup?.description || '', [validateOnlySpaces(), Validators.maxLength(100)]]
    })
  }

  onSave(): void {
    if(this.taskGroup){
      this.updateTaskGroup();
    }
    else{
      this.createTaskGroup();
    }
  }

  private createTaskGroup(): void {
    const taskGroup: EditTaskGroup = {
      projectId: this.data.projectId,
      name: this.form.value.name!,
      description: this.form.value.description!
    }

    this.data.createTaskGroup(taskGroup);
    this.dialogRef.close();
  }

  private updateTaskGroup():void {
    const taskGroup: EditTaskGroup = {
      id: this.taskGroup?.id,
      name: this.form.value.name!,
      description: this.form.value.description!
    }

    this.data.updateTaskGroup(taskGroup);
    this.dialogRef.close();
  }
}
