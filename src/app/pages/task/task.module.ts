import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TaskRoutingModule } from './task-routing.module';



@NgModule({
  declarations: [
    TaskComponent,
    AddTaskComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TaskRoutingModule
  ]
})
export class TaskModule { }
