import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonMaterialModule } from '../../common-modules/common-material.module';

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonMaterialModule,
    CommonModule,
    FullCalendarModule
  ]
})
export class CalendarModule { }
