import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PlanningProject } from '../../../models/planning-project';
import { EditTaskGroup, TaskGroup } from '../../../models/task-group';
import { MatDialog } from '@angular/material/dialog';
import { TaskGroupService } from '../../../services/task-group.service';
import { TaskGroupDialogComponent } from './task-group-dialog/task-group-dialog.component';
import { WarningDialogComponent } from '../../../components/warning-dialog/warning-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-group',
  templateUrl: './task-group.component.html',
  styleUrl: './task-group.component.scss'
})
export class TaskGroupComponent implements OnInit, OnChanges{
  @Input() selectedProject!: PlanningProject;

  panelOpenState = true;

  constructor(
    private dialog: MatDialog,
    private service: TaskGroupService,
    private snackBar: MatSnackBar
  ){ }

  ngOnInit(): void {
    this.fetchTaskGroups();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedProject'] && !changes['selectedProject'].firstChange) {
      this.fetchTaskGroups();
    }
  }

  get taskGroupsExist(): boolean {
    return this.taskGroups && this.taskGroups.length > 0;
  }

  get taskGroups(): TaskGroup[] {
    return this.selectedProject.taskGroups;
  }

  // ----------------------------------------------------------
  // Render

  initializeTaskGroups(data: TaskGroup[]): void {
    if(data && data.length > 0){
      this.selectedProject.taskGroups = data;
    }
  }

  // ----------------------------------------------------------
  // Dialogs

  openEditPopup(taskGroup: TaskGroup | null): void {
    this.dialog.open(TaskGroupDialogComponent, {
      width: '40%',
      data: {
        projectId: this.selectedProject.id,
        title: (taskGroup ? 'Редагування' : 'Створення') + ' групи задач',
        taskGroup: taskGroup,
        createTaskGroup: this.createTaskGroup.bind(this),
        updateTaskGroup: this.updateTaskGroup.bind(this)
      }
    })
  }

  openDeletePopup(taskGroupId: number): void{
    const docRef = this.dialog.open(WarningDialogComponent, {
      width: '40%',
      data: {
        title: 'Попередження',
        message: 'Ви впевнені, що хочете видалити групу задач?'
      }
    });

    docRef.afterClosed().subscribe((result: boolean) => {
      if(result){
        this.deleteTaskGroup(taskGroupId);
      }
    });
  }

  // ----------------------------------------------------------
  // Requests

  private fetchTaskGroups(): void {
    this.service
    .getTaskGroups(this.selectedProject.id)
    .subscribe({
      next: (data: TaskGroup[]) => {
        this.initializeTaskGroups(data);
      },
      error: error => {
        this.snackBar.open('Щось пішло не так', 'OK', {
          duration: 5000
        });
      }
    });
  }

  createTaskGroup(taskGroup: EditTaskGroup): void {
    this.service
    .createTaskGroup(taskGroup)
    .subscribe({
      next: (data: TaskGroup) => {
        if(this.taskGroupsExist){
          this.selectedProject.taskGroups.push(data);
        }
        else{
          this.fetchTaskGroups();
        }
      },
      error: (error) => {
        this.snackBar.open('Щось пішло не так', 'OK', {
          duration: 5000
        });
      }
    });
  }

  updateTaskGroup(taskGroup: EditTaskGroup): void {
    this.service
    .updateTaskGroup(taskGroup)
    .subscribe({
      next: (data: TaskGroup) => {
        const index = this.selectedProject.taskGroups.findIndex(t => t.id === data.id);
        if (index !== -1) {
          this.selectedProject.taskGroups[index] = data;
        }
      },
      error: (error) => {
        this.snackBar.open('Щось пішло не так', 'OK', {
          duration: 5000
        });
      }
    });
  }

  deleteTaskGroup(taskGroupId: number): void {
    this.service
    .deleteTaskGroup(taskGroupId)
    .subscribe({
      next: () => {
        this.snackBar.open('Групу задач видалено', 'OK', {
          duration: 3000
        });
        if(this.selectedProject.taskGroups.length === 1){
          this.selectedProject.taskGroups = [];
        }
        else{
          this.initializeTaskGroups(this.selectedProject.taskGroups.filter(group =>
            group.id != taskGroupId))
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
