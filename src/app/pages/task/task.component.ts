import { CdkDragDrop, moveItemInArray, transferArrayItem, } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Task, TaskService } from 'src/app/providers/task/task.service';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  constructor(private dialog: MatDialog, private taskService: TaskService, private fb: FormBuilder) { }
  tasksList: Task[] = [];
  filteredTasks: { [key: string]: any[] } = {
    'To Do': [],
    'In Progress': [],
    'Done': [],
    'Testing': [],
    'Deployed': [],
  };
  openDrawer: any;
  filterForm = this.fb.group({
    date: [''],
  })
  ngOnInit(): void {
    this.getTask();
  }
  onTaskDropped(event: CdkDragDrop<Task[]>, title?: string) {
    console.log(event, title);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const task = event.container.data[event.currentIndex];
      task.status = title || '';
      this.taskService.updateTask(task);
    }
  }
  addTask() {
    this.openPopup();
  }
  edit(task: Task) {
    this.openPopup(task);
  }
  openPopup(task?: Task) {
    this.dialog.open(AddTaskComponent, {
      width: '650px',
      height: 'max-content',
      data: { task: task },
      disableClose: true,
      panelClass: 'task-dialog-container',
    }).afterClosed().subscribe((res: any) => {
      if (res) {
        this.getTask();
      }
    });
  }
  search(event: string) {
  }
  deleteTask(id: number) {
    this.taskService.deleteTask(id);
    this.getTask();
  }
  getTask(taskAvailable?: boolean) {
    if (!taskAvailable) {
      this.tasksList = this.taskService.getTasks();
    }
    this.clearFilteredTasks();
    for (const task of this.tasksList) {
      this.filterByStatus(task.status);
    }
  };
  filterByStatus(status: string) {
    if (!this.filteredTasks[status]) {
      this.filteredTasks[status] = [];
    }
    this.filteredTasks[status] = this.tasksList.filter(task => task.status === status);
  }
  clearFilteredTasks() {
    for (const status in this.filteredTasks) {
      if (this.filteredTasks.hasOwnProperty(status)) {
        this.filteredTasks[status] = [];
      }
    }
  }
  openFilter() {
    this.openDrawer = { ...this.filterForm }
  }
  applyFilter(event: any) {
    this.tasksList = this.taskService.getTasks();
    const date = new Date(event.date).toString();
    if (date) {
      this.tasksList = this.tasksList.filter(task => {
        const dueDate = new Date(task.dueDate).toString();
        return dueDate == date;
      });
    } else {
      this.tasksList = [];
    }
    this.tasksList = [...this.tasksList];
    this.getTask(true);
  }
  clearFilter() {
    this.filterForm.reset();
    this.getTask(false);
  }
}
