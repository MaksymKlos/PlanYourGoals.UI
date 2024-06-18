import { Component, Input, OnInit } from '@angular/core';
import { TaskGroup } from '../../../../models/task-group';
import { EditTaskModel, TaskModel, TaskPriority, UpdateTaskState } from '../../../../models/task-model';
import { TaskService } from '../../../../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { WarningDialogComponent } from '../../../../components/warning-dialog/warning-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit{
  @Input() taskGroup!: TaskGroup;
  priorityEnum = TaskPriority;

  constructor(
    private dialog: MatDialog,
    private service: TaskService,
    private snackBar: MatSnackBar
  ){ }

  ngOnInit(): void {
    this.fetchTasks();
  }

  get tasksExist(): boolean {
    return this.tasks && this.tasks.length > 0;
  }

  get tasks(): TaskModel[] {
    return this.taskGroup.tasks ;
  }

  // ----------------------------------------------------------
  // Render

  initializeTasks(data: TaskModel[]): void {
    if(data && data.length > 0){
      this.taskGroup.tasks = data;
    }
  }

  onChangeTaskState(task: TaskModel){
    task.isCompleted = !task.isCompleted;

    var taskState: UpdateTaskState = {
      isCompleted: task.isCompleted
    };

    this.updateTaskState(task.id, taskState);
  }

  // ----------------------------------------------------------
  // Dialogs

  openEditPopup(task: TaskModel | null): void {
    this.dialog.open(TaskDialogComponent, {
      width: '40%',
      data: {
        taskGroupId: this.taskGroup.id,
        title: (task ? 'Редагування' : 'Створення') + ' задачі',
        task: task,
        createTask: this.createTask.bind(this),
        updateTask: this.updateTask.bind(this)
      }
    })
  }

  openDeletePopup(taskId: number): void {
    const docRef = this.dialog.open(WarningDialogComponent, {
      width: '40%',
      data: {
        title: 'Попередження',
        message: 'Ви впевнені, що хочете видалити задачу?'
      }
    });

    docRef.afterClosed().subscribe((result: boolean) => {
      if(result){
        this.deleteTask(taskId);
      }
    });
  }

  // ----------------------------------------------------------
  // Requests

  private fetchTasks(): void {
    this.service
    .getTasks(this.taskGroup.id)
    .subscribe({
      next: (data: TaskModel[]) => {
        this.initializeTasks(data);
      },
      error: error => {
        this.snackBar.open('Щось пішло не так', 'OK', {
          duration: 5000
        });
      }
    });
  }

  createTask(task: EditTaskModel): void {
    this.service
    .createTask(task)
    .subscribe({
      next: (data: TaskModel) => {
        if(this.tasksExist){
          this.taskGroup.tasks.push(data);
        }
        else{
          this.fetchTasks();
        }
      },
      error: (error) => {
        this.snackBar.open('Щось пішло не так', 'OK', {
          duration: 5000
        });
      }
    });
  }

  updateTask(task: EditTaskModel): void {
    this.service
    .updateTask(task)
    .subscribe({
      next: (data: TaskModel) => {
        if (data) {
          const index = this.taskGroup.tasks.findIndex(t => t.id === data.id);
          if (index !== -1) {
            this.taskGroup.tasks[index] = data;
          }
        }
      },
      error: (error) => {
        this.snackBar.open('Щось пішло не так', 'OK', {
          duration: 5000
        });
      }
    });
  }

  updateTaskState(id: number, taskState: UpdateTaskState): void {
    this.service
    .updateTaskState(id, taskState)
    .subscribe({
      next: () => { },
      error: (error) => {
        this.snackBar.open('Щось пішло не так', 'OK', {
          duration: 5000
        });
      }
    });
  }

  deleteTask(taskId: number): void {
    this.service
    .deleteTask(taskId)
    .subscribe({
      next: () => {
        this.snackBar.open('Задачу видалено', 'OK', {
          duration: 3000
        });

        if(this.taskGroup.tasks.length === 1){
          this.taskGroup.tasks = [];
        }
        else{
          this.initializeTasks(this.taskGroup.tasks.filter(task =>
            task.id != taskId))
        }
      },
      error: (error) => {
        this.snackBar.open('Щось пішло не так', 'OK', {
          duration: 5000
        });
      }
    });
  }
}
