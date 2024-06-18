import { Component, Inject, OnInit } from '@angular/core';
import { EditPlanningProject, PlanningProject } from '../../../models/planning-project';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateOnlySpaces } from '../../../helpers/validators/general-validators';

@Component({
  selector: 'app-planning-project-dialog',
  templateUrl: './planning-project-dialog.component.html',
  styleUrl: './planning-project-dialog.component.scss'
})
export class PlanningProjectDialogComponent implements OnInit {
  private project: PlanningProject | null = null;

  form: FormGroup = this.formBuilder.group({});
  dialogTitle: string = '';

  constructor(
    private dialogRef: MatDialogRef<PlanningProjectDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string;
      project: PlanningProject | null;
      createProject: (project: EditPlanningProject) => void;
      updateProject: (project: EditPlanningProject) => void;
    }
  ){}

  ngOnInit(): void {
    this.project = this.data.project;
    this.dialogTitle = this.data.title;

    this.form = this.formBuilder.group({
      name: [this.project?.name || '', [Validators.required, validateOnlySpaces(), Validators.maxLength(50)]]
    })
  }

  onSave(){
    if(this.project) {
      this.updateProject();
    }
    else {
      this.createProject();
    }
  }

  private createProject() {
    const project: EditPlanningProject = {
      name: this.form.value.name!
    }

    this.data.createProject(project);
    this.dialogRef.close();
  }

  private updateProject() {
    const project: EditPlanningProject = {
      id: this.project?.id,
      name: this.form.value.name!
    }

    this.data.updateProject(project);
    this.dialogRef.close();
  }
}
