import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, TaskService } from 'src/app/providers/task/task.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
  @Input() title: string | undefined;
  @Input() tasks: Task[] = [];
  @Output() taskDropped = new EventEmitter<CdkDragDrop<Task[]>>();
  @Output() updateTask = new EventEmitter();
  @Output() taskDelete = new EventEmitter();
  isAscending = true;
  drop(event: any) {
    this.taskDropped.emit(event);
  }
  setDotColor(title: string) {
    switch (title) {
      case 'To Do':
        return 'rgb(235, 47, 47)';
      case 'In Progress':
        return '#a734ba';
      case 'Done':
        return '#5FCAE5;';
      case 'Testing':
        return '#366CD6';
      case 'Completed':
        return '#13854e';
      default:
        return '#13854e';
    }
  }
  sortTasks(order: 'ascending' | 'descending'): void {
    const priorityOrder: { [key: string]: number } = {
      'Low': 1,
      'Medium': 2,
      'High': 3
    };

    if (order === 'ascending') {
      this.tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else {
      this.tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    }
    this.isAscending = !this.isAscending;
  }
}
