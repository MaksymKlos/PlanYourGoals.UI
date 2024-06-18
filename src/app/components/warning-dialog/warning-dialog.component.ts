import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { CommonMaterialModule } from '../../common-modules/common-material.module';

@Component({
  selector: 'app-warning-dialog',
  standalone: true,
  imports: [
    CommonMaterialModule
  ],
  templateUrl: './warning-dialog.component.html',
  styleUrl: './warning-dialog.component.scss'
})
export class WarningDialogComponent implements OnInit{
  public title: string = '';
  public message: string = '';

  constructor(
      public dialogRef: MatDialogRef<WarningDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: {
        title: string,
        message: string
      }
  )
  { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.message = this.data.message;
  }


}
