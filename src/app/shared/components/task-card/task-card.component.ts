import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from 'src/app/pages/task/components/add-task/add-task.component';
import { Task, TaskService } from 'src/app/providers/task/task.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
  @Input() task: any;
  @Output() taskedit = new EventEmitter();
  @Output() taskDelete = new EventEmitter();
  constructor(private taskService: TaskService, private dialog: MatDialog) { }
  editTask() {
    this.taskedit.emit(this.task);
  }
  deleteTask() {
    this.taskDelete.emit(this.task.id);
  }
  setColor(priority: string) {
    switch (priority) {
      case 'High':
        return 'rgb(235, 47, 47)';
      case 'Medium':
        return '#a734ba';
      case 'Low':
        return '#13854e';
      default:
        return '#13854e';
    }
  }
  setBgColor(priority: string) {
    switch (priority) {
      case 'High':
        return 'rgb(245 194 194)';
      case 'Medium':
        return '#f2dcf5';
      case 'Low':
        return '#d6ede2';
      default:
        return '#d6ede2';
    }
  }
}
