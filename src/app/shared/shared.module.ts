import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from './modules/mat-module';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ColumnComponent } from './components/column/column.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ButtonComponent } from './components/button/button.component';
import { SearchComponent } from './components/search/search.component';
import { CustomFilterComponent } from './components/custom-filter/custom-filter.component';



@NgModule({
  declarations: [
    HeaderComponent,
    BodyComponent,
    SideBarComponent,
    LayoutComponent,
    ColumnComponent,
    TaskCardComponent,
    ButtonComponent,
    SearchComponent,
    CustomFilterComponent,
  ],
  imports: [
    CommonModule,
    MatModule,
    DragDropModule
  ],
  exports: [LayoutComponent, HeaderComponent, BodyComponent, SideBarComponent, ColumnComponent, TaskCardComponent, MatModule, DragDropModule, ButtonComponent, SearchComponent, CustomFilterComponent]
})
export class SharedModule { }
