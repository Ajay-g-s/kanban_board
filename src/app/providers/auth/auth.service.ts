import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TaskService } from '../task/task.service';
export interface User {
  fullName: string;
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [];
  constructor(private taskService: TaskService) { }
  register(user: User): Observable<boolean> {
    const userExists = this.users.some(exist => exist.email === user.email);
    if (userExists) {
      this.taskService.showSnackbar('Email already exists');
      return of(false); // Email already exists
    }
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
    this.taskService.showSnackbar('Registration successful, please login to continue');
    return of(true);
  }
  login(username: string, password: string): Observable<boolean> {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(user => user.email === username && user.password === password);
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify({ ...user, loggedIn: true }));
      this.taskService.showSnackbar('Login successful');
      return of(true);
    }
    this.taskService.showSnackbar('Login failed, please try again');
    return of(false);
  }
}
