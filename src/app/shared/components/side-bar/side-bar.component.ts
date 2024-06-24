import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
// import { navBarData } from './nav-data';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
interface sideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  loginDetails: any;
  constructor(private router: Router) { }
  @Output() onToggleSideNav: EventEmitter<sideNavToggle> = new EventEmitter();
  collapsed = true;
  screenWidth = 0;
  filteredLinks: any;
  @HostListener('window:resize', ['$event'])
  onreSize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }
  ngOnInit() {
    this.loginDetails = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
  closeSideNav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }

}
