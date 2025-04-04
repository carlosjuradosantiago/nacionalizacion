import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, SidebarComponent],
  template: `
    <div class="dashboard-container">
      <app-navbar></app-navbar>
      <div class="main-wrapper">
        <app-sidebar 
          [isCollapsed]="isSidebarCollapsed"
          (menuClick)="toggleSidebar()"
        ></app-sidebar>
        <main class="main-content" [class.expanded]="isSidebarCollapsed">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `
})
export class LayoutComponent {
  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}