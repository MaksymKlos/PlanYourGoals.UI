import { Component, OnInit } from '@angular/core';
import { EditPlanningProject, PlanningProject } from '../../models/planning-project';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlanningProjectService } from '../../services/planning-project.service';
import { MatDialog } from '@angular/material/dialog';
import { PlanningProjectDialogComponent } from './planning-project-dialog/planning-project-dialog.component';
import { WarningDialogComponent } from '../../components/warning-dialog/warning-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-planning-project',
  templateUrl: './planning-project.component.html',
  styleUrl: './planning-project.component.scss'
})
export class PlanningProjectComponent implements OnInit{
  projectForm!: FormGroup;
  defaultProjectId: number | null = null;
  selectedProject: PlanningProject | null = null;

  planingProjects: PlanningProject[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private projectService: PlanningProjectService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchProjects();
  }

  get projectsExist(): boolean {
    return this.planingProjects && this.planingProjects.length > 0;
  }

  // ----------------------------------------------------------
  // Render

  onProjectChange(selectedProjectId: number): void {
    this.selectedProject = this.planingProjects.find(
      project => project.id == selectedProjectId
    )!;
  }

  private initializeProjects(data: PlanningProject[]): void {
    if(data && data.length > 0) {
      this.planingProjects = data;
      this.defaultProjectId = this.planingProjects[0].id!;
      this.selectedProject = this.planingProjects[0];
      this.projectForm = this.formBuilder.group({
        project: [this.defaultProjectId]
      })
    }
  }

  // ----------------------------------------------------------
  // Dialogs

  openEditPopup(project: PlanningProject | null): void {
    this.dialog.open(PlanningProjectDialogComponent, {
      width: '40%',
      data: {
        title: (project ? 'Редагування' : 'Створення') + ' проєкту',
        project: project,
        createProject: this.createProject.bind(this),
        updateProject: this.updateProject.bind(this)
      }
    })
  }

  openDeletePopup(): void{
    const docRef = this.dialog.open(WarningDialogComponent, {
      width: '40%',
      data: {
        title: 'Попередження',
        message: 'Ви впевнені, що хочете видалити проект?'
      }
    });

    docRef.afterClosed().subscribe((result: boolean) => {
      if(result){
        this.deleteProject(this.selectedProject!.id);
      }
    });
  }

  // ----------------------------------------------------------
  // Requests

  private fetchProjects(): void {
    this.projectService
    .getProjects()
    .subscribe({
      next: (data: PlanningProject[]) => {
        this.initializeProjects(data);
      },
      error: error => {
        this.snackBar.open('Щось пішло не так', 'OK', {
          duration: 5000
        });
      }
    });
  }

  createProject(project: EditPlanningProject): void {
    this.projectService
    .createProject(project)
    .subscribe({
      next: (data: PlanningProject) => {
        if(data){
          if(this.projectsExist){
            this.planingProjects.push(data)
            this.selectedProject = this.planingProjects.at(this.planingProjects.length-1)!;
            this.projectForm.get('project')?.setValue(data.id);
          }
          else{
            this.fetchProjects();
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

  updateProject(project: EditPlanningProject) {
    this.projectService
    .updateProject(project)
    .subscribe({
      next: (data: PlanningProject) => {
        if(data){
          const index = this.planingProjects.findIndex(t => t.id === data.id);
          if (index !== -1) {
            this.planingProjects[index] = data;
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

  deleteProject(projectId: number) {
    this.projectService
    .deleteProject(projectId)
    .subscribe({
      next: () => {
        this.snackBar.open('Проєкт видалено', 'OK', {
          duration: 3000
        });
        if(this.planingProjects.length === 1){
          this.planingProjects = [];
        }
        else{
          this.initializeProjects(this.planingProjects.filter(project =>
            project.id != projectId))
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
