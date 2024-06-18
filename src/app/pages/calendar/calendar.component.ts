import { Component, OnInit } from '@angular/core';
import { CalendarOptions, } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { TaskService } from '../../services/task.service';
import { TaskModel, TaskPriority } from '../../models/task-model';
import { CalendarEvent } from '../../models/calendar-event';
import { EventImpl } from '@fullcalendar/core/internal';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit{

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    eventClick: this.onEventClick.bind(this)
  };

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    this.taskService.getUserTasks().subscribe({
      next: (tasks: TaskModel[]) => {
        let events: CalendarEvent[] = [];
        for(let task of tasks){
          events.push(this.createEvent(task, true));
          if(task.endDate && !task.isCompleted){
            events.push(this.createEvent(task, false));
          }
        }
        this.calendarOptions.events = events;
      },
      error: (error) => {
        this.snackBar.open('Щось пішло не так', 'OK', {
          duration: 5000
        });
      }
    })
  }

  onEventClick(res:{event: EventImpl}): void{
    this.snackBar.open(res.event.title, 'OK', {
      duration: 3000
    });
  }

  private createEvent(task: TaskModel, isStart: boolean): CalendarEvent{
    if(isStart){
      return {
        title: task.name,
        date: new Date(task.startDate),
        backgroundColor: this.getPriorityColor(task.priority),
        borderColor: task.isCompleted ? 'grey' : 'green',
        overlap: task.isCompleted
      };
    }
    return {
      title: task.name + ' (останній день)',
      date: new Date(task.endDate!),
      borderColor: "#fa5b2a",
      backgroundColor: this.getPriorityColor(task.priority)
    };
  }

  private getPriorityColor(priority: TaskPriority){
    const priorityColors: { [key in TaskPriority]: string } = {
      [TaskPriority.High]: '#ef5350',
      [TaskPriority.Average]: '#f57c00',
      [TaskPriority.Low]: '#0288d1',
      [TaskPriority.Unknown]: 'grey'
    };

    return priorityColors[priority] || 'grey';
  }
}
