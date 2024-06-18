import { Component, Inject, OnInit } from '@angular/core';
import { EditTaskModel, TaskModel, TaskPriority } from '../../../../../models/task-model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { validateOnlySpaces } from '../../../../../helpers/validators/general-validators';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss'
})
export class TaskDialogComponent implements OnInit{
  private task: TaskModel | null = null;

  form: FormGroup = this.formBuilder.group({});
  dialogTitle: string = '';
  priorityEnum = TaskPriority;
  priorities: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      taskGroupId: number;
      title: string;
      task: TaskModel | null;
      createTask: (task: EditTaskModel) => void;
      updateTask: (task: EditTaskModel) => void;
    }
  ){ }

  ngOnInit(): void {
    this.task = this.data.task;
    this.dialogTitle = this.data.title;
    this.priorities = Object.keys(this.priorityEnum).filter(Number);

    this.form = this.createForm();
  }

  private createForm(): FormGroup{
    return this.formBuilder.group({
      name: [this.task?.name || '', [Validators.required, validateOnlySpaces(), Validators.maxLength(50)]],
      description: [this.task?.description || '', [validateOnlySpaces(), Validators.maxLength(100)]],
      priority: this.task?.priority?.toString() || TaskPriority.Unknown.toString(),
      startDate: [this.task?.startDate ? new Date(this.task.startDate) : null],
      endDate: [this.task?.endDate ? new Date(this.task.endDate) : null]
    })
  }

  get minStartDate(): Date {
    return new Date();
  }

  get minEndDate(): Date {
    const startDate = this.form.value.startDate;

    if(startDate){
      return startDate;
    }

    return new Date();
  }

  onSave(): void {
    if(this.task){
      this.updateTask();
    }
    else{
      this.createTask();
    }
  }

  convertPriorityToString(priorityNumber: number): string {
    return priorityNumber == 1 ? 'Без пріорітету'
    : priorityNumber == 2? 'Низький'
    : priorityNumber == 3? 'Середній'
    : 'Високий';
  }

  private createTask(): void {
    const formValue = this.form.value;

    const task: EditTaskModel = {
      taskGroupId: this.data.taskGroupId,
      name: formValue.name!,
      description: formValue.description!,
      priority: parseInt(formValue.priority!),
      startDate: formValue.startDate? moment(formValue.startDate).format('YYYY-MM-DD') : null,
      endDate: formValue.endDate? moment(formValue.endDate).format('YYYY-MM-DD') : null
    }

    this.data.createTask(task);
    this.dialogRef.close();
  }

  private updateTask():void {
    const formValue = this.form.value;

    const task: EditTaskModel = {
      id: this.task?.id,
      name: formValue.name!,
      description: formValue.description!,
      priority: parseInt(formValue.priority!),
      startDate: formValue.startDate? moment(formValue.startDate).format('YYYY-MM-DD') : null,
      endDate: formValue.endDate? moment(formValue.endDate).format('YYYY-MM-DD') : null
    }

    this.data.updateTask(task);
    this.dialogRef.close();
  }
}
