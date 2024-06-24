import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from 'src/app/providers/auth/auth.service';
import { TaskService } from 'src/app/providers/task/task.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private taskService: TaskService) { }
  ngOnInit() { }
  registerForm = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  checkPassword() {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword: any = this.registerForm.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      this.registerForm.get('confirmPassword')?.setErrors({ 'passwordMismatch': true });
      return;
    }
  }
  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.taskService.showSnackbar('Please fill all the required fields');
      return;
    } else {
      const payload: User = {
        fullName: this.registerForm.get('fullName')?.value || "",
        email: this.registerForm.get('email')?.value || "",
        password: this.registerForm.get('password')?.value || "",
      }
      this.authService.register(payload).subscribe({
        next: (succes: boolean) => {
          this.router.navigate(['/login']);
        }
      })
    }
  }
}
