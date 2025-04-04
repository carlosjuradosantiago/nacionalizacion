import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="sidebar" [class.collapsed]="isCollapsed">
      <nav class="sidebar-nav">
        <ul class="nav-list">
          <li class="nav-item">
            <a class="nav-link toggle-link" (click)="toggleSidebar()">
              <i class="pi pi-bars"></i>
              <span class="nav-text" *ngIf="!isCollapsed">Menú</span>
            </a>
          </li>

          <li class="nav-item">
            <a routerLink="/" class="nav-link" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
              <i class="pi pi-home"></i>
              <span class="nav-text" *ngIf="!isCollapsed">Inicio</span>
            </a>
          </li>
          
          <li class="nav-item">
            <ng-container *ngIf="!isCollapsed">
              <a class="nav-link" (click)="toggleSubmenu('recepcion')">
                <i class="pi pi-inbox"></i>
                <span class="nav-text">Recepción</span>
                <i class="pi pi-chevron-right submenu-arrow" 
                  [class.rotated]="expandedMenus.includes('recepcion')">
                </i>
              </a>
            </ng-container>
            <ul [class.submenu-expanded]="!isCollapsed && expandedMenus.includes('recepcion')" 
                [class.submenu-collapsed]="isCollapsed"
                [class.hidden]="!isCollapsed && !expandedMenus.includes('recepcion')">
              <li>
                <a routerLink="/recepcion/asignacion" class="submenu-link" routerLinkActive="active">
                  <i class="pi pi-user-plus"></i>
                  <span *ngIf="!isCollapsed">Asignación</span>
                </a>
              </li>
              <li>
                <a routerLink="/recepcion/reasignacion" class="submenu-link" routerLinkActive="active">
                  <i class="pi pi-sync"></i>
                  <span *ngIf="!isCollapsed">Reasignación</span>
                </a>
              </li>
              <li>
                <a routerLink="/recepcion/verificar" class="submenu-link" routerLinkActive="active">
                  <i class="pi pi-file-edit"></i>
                  <span *ngIf="!isCollapsed">Verificar Documentos</span>
                </a>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <ng-container *ngIf="!isCollapsed">
              <a class="nav-link" (click)="toggleSubmenu('evaluacion')">
                <i class="pi pi-check-square"></i>
                <span class="nav-text">Evaluación</span>
                <i class="pi pi-chevron-right submenu-arrow"
                  [class.rotated]="expandedMenus.includes('evaluacion')">
                </i>
              </a>
            </ng-container>
            <ul [class.submenu-expanded]="!isCollapsed && expandedMenus.includes('evaluacion')"
                [class.submenu-collapsed]="isCollapsed"
                [class.hidden]="!isCollapsed && !expandedMenus.includes('evaluacion')">
              <li>
                <a routerLink="/evaluacion" class="submenu-link" routerLinkActive="active">
                  <i class="pi pi-file-edit"></i>
                  <span *ngIf="!isCollapsed">Evaluar Expediente</span>
                </a>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <ng-container *ngIf="!isCollapsed">
              <a class="nav-link" (click)="toggleSubmenu('emision')">
                <i class="pi pi-id-card"></i>
                <span class="nav-text">Emisión del Título</span>
                <i class="pi pi-chevron-right submenu-arrow"
                  [class.rotated]="expandedMenus.includes('emision')">
                </i>
              </a>
            </ng-container>
            <ul [class.submenu-expanded]="!isCollapsed && expandedMenus.includes('emision')"
                [class.submenu-collapsed]="isCollapsed"
                [class.hidden]="!isCollapsed && !expandedMenus.includes('emision')">
              <li>
                <a routerLink="/emision/generar" class="submenu-link" routerLinkActive="active">
                  <i class="pi pi-file-export"></i>
                  <span *ngIf="!isCollapsed">Generar Título</span>
                </a>
              </li>
              <li>
                <a routerLink="/emision/registrar" class="submenu-link" routerLinkActive="active">
                  <i class="pi pi-file-edit"></i>
                  <span *ngIf="!isCollapsed">Registrar Título</span>
                </a>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <ng-container *ngIf="!isCollapsed">
              <a class="nav-link" (click)="toggleSubmenu('consultas')">
                <i class="pi pi-search"></i>
                <span class="nav-text">Consultas</span>
                <i class="pi pi-chevron-right submenu-arrow"
                  [class.rotated]="expandedMenus.includes('consultas')">
                </i>
              </a>
            </ng-container>
            <ul [class.submenu-expanded]="!isCollapsed && expandedMenus.includes('consultas')"
                [class.submenu-collapsed]="isCollapsed"
                [class.hidden]="!isCollapsed && !expandedMenus.includes('consultas')">
              <li>
                <a routerLink="/consultas" class="submenu-link" routerLinkActive="active">
                  <i class="pi pi-search"></i>
                  <span *ngIf="!isCollapsed">Consulta de Trámite</span>
                </a>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <ng-container *ngIf="!isCollapsed">
              <a class="nav-link" (click)="toggleSubmenu('cierre')">
                <i class="pi pi-check-circle"></i>
                <span class="nav-text">Cierre</span>
                <i class="pi pi-chevron-right submenu-arrow"
                  [class.rotated]="expandedMenus.includes('cierre')">
                </i>
              </a>
            </ng-container>
            <ul [class.submenu-expanded]="!isCollapsed && expandedMenus.includes('cierre')"
                [class.submenu-collapsed]="isCollapsed"
                [class.hidden]="!isCollapsed && !expandedMenus.includes('cierre')">
              <li>
                <a routerLink="/cierre/tramite" class="submenu-link" routerLinkActive="active">
                  <i class="pi pi-check-circle"></i>
                  <span *ngIf="!isCollapsed">Cierre de Trámite</span>
                </a>
              </li>
              <li>
                <a routerLink="/cierre/baja" class="submenu-link" routerLinkActive="active">
                  <i class="pi pi-id-card"></i>
                  <span *ngIf="!isCollapsed">Baja Carnet de Extranjería</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 280px;
      background: white;
      height: 100%;
      transition: width 0.3s ease;
      overflow-x: hidden;
    }

    .sidebar.collapsed {
      width: 60px;
    }

    .nav-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .nav-item {
      margin: 4px 0;
    }

    .nav-link {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      color: #333;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.3s ease;
      gap: 12px;
      font-size: 1.12rem;
    }

    .nav-link:hover {
      color: #004F9F;
    }

    .nav-link:hover i {
      color: #004F9F;
    }

    .nav-link.active {
      color: #004F9F;
      background: rgba(0, 79, 159, 0.1);
    }

    .nav-link.active i {
      color: #004F9F;
    }

    .nav-link i {
      font-size: 18px;
      min-width: 24px;
      text-align: center;
      color: #333;
      transition: color 0.3s ease;
    }

    .nav-text {
      flex: 1;
    }

    .submenu-arrow {
      transition: transform 0.3s ease;
    }

    .submenu-arrow.rotated {
      transform: rotate(90deg);
    }

    .submenu-expanded {
      list-style: none;
      padding: 0;
      margin: 0;
      background: rgba(0, 0, 0, 0.02);
      display: block;
    }

    .submenu-collapsed {
      list-style: none;
      padding: 0;
      margin: 0;
      display: block;
    }

    .hidden {
      display: none;
    }

    .submenu-link {
      display: flex;
      align-items: center;
      padding: 10px 16px;
      color: #666;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.3s ease;
      gap: 12px;
      justify-content: center;
      font-size: 1.12rem;
    }

    .sidebar:not(.collapsed) .submenu-link {
      padding: 10px 16px 10px 52px;
      justify-content: flex-start;
    }

    .submenu-link:hover {
      color: #004F9F;
    }

    .submenu-link:hover i {
      color: #004F9F;
    }

    .submenu-link.active {
      color: #004F9F;
      background: rgba(0, 79, 159, 0.1);
    }

    .submenu-link.active i {
      color: #004F9F;
    }

    .submenu-link i {
      font-size: 16px;
      color: #666;
      transition: color 0.3s ease;
    }

    .sidebar.collapsed .submenu-link i {
      font-size: 20px;
    }

    .sidebar.collapsed .submenu-link span {
      display: none;
    }

    .toggle-link {
      border-bottom: 1px solid #eee;
      margin-bottom: 8px;
    }
  `]
})
export class SidebarComponent {
  @Input() isCollapsed = false;
  @Output() menuClick = new EventEmitter<void>();

  expandedMenus: string[] = [];

  toggleSubmenu(menu: string) {
    const index = this.expandedMenus.indexOf(menu);
    if (index === -1) {
      this.expandedMenus.push(menu);
    } else {
      this.expandedMenus.splice(index, 1);
    }
  }

  toggleSidebar() {
    this.menuClick.emit();
  }
}