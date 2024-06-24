import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: string,
  priority: string
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private snackBar: MatSnackBar) { }
  private tasks: Task[] = [];
  getTasks(): Task[] {
    this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    return this.tasks;
  }
  addTask(task: Omit<Task, 'id'>): void {
    this.tasks.push({ ...task, id: this.generateRandomId() });
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.showSnackbar('Task added successfully');

  }
  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index > -1) {
      this.tasks[index] = updatedTask;
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      this.showSnackbar('Task updated successfully');

    }
  }
  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.showSnackbar('Task deleted successfully');
  }
  generateRandomId(): number {
    return Math.floor(Math.random() * Date.now());
  }
  showSnackbar(content: string) {
    this.snackBar.open(content, 'Close', {
      duration: 2000,
    });
  }
}
