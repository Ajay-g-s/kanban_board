import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/auth/auth.service';
import { TaskService } from 'src/app/providers/task/task.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService, private taskService: TaskService, private fb: FormBuilder,) { }
  //Login Form Validation
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )]],
    password: ['', Validators.required],
  });

  signIn() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login((email || ''), (password || '')).subscribe(success => {
        if (success) {
          this.router.navigate(['/task']);
        } else {
          this.taskService.showSnackbar('Invalid username or password');
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.taskService.showSnackbar('Please fill all the required fields');
    }
  }
}
