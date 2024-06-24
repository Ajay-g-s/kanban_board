import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task, TaskService } from 'src/app/providers/task/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddTaskComponent>, @Inject(MAT_DIALOG_DATA) public dialogData: any, private taskService: TaskService,
  ) { }
  taskForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    dueDate: ['', Validators.required],
    priority: ['', Validators.required],
    status: ['']
  })
  minDate = new Date();
  ngOnInit(): void {
    if (this.dialogData?.task) {
      this.taskForm.patchValue(this.dialogData.task);
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      const taskData: Task = {
        title: formData.title || '',
        description: formData.description || '',
        dueDate: formData.dueDate || '',
        priority: formData.priority || '',
        status: this.dialogData.task?.status || 'To Do',
        id: this.dialogData?.task?.id || 0,
      };
      if (this.dialogData?.task) {
        const updatedTask: Task = { ...this.dialogData.task, ...taskData };
        console.log('updatedTask=>', updatedTask);
        this.taskService.updateTask(updatedTask);
      } else {
        this.taskService.addTask(taskData as Task);
      }
      const data = this.taskService.getTasks();
      this.dialogRef.close(true);
    } else {
      this.taskForm.markAllAsTouched();
      this.taskService.showSnackbar('Please fill all the required fields');
    }
  }

}
