import { Component, OnInit, PLATFORM_ID, inject, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// PrimeNG
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';

enum SidebarMode {
  EXPANDED,    // Menú completamente expandido con submenús
  COLLAPSED    // Menú colapsado solo con íconos de opciones principales
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    ButtonModule,
    MenuModule,
    RippleModule,
    AvatarModule,
    BadgeModule,
    TooltipModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  
  // Variables para el menú
  sidebarMode = SidebarMode.EXPANDED;
  get menuVisible(): boolean {
    return this.sidebarMode === SidebarMode.EXPANDED;
  }
  
  // Control de secciones expandidas (true = expandido, false = contraído)
  expandedSections: { [key: string]: boolean } = {
    recepcion: false,
    evaluacion: false,
    calidad: false,
    titulo: false,
    consultas: false,
    gestionDocumental: false,
    cierre: false
  };
  
  username = 'Sebastián Ramírez';
  userRole = 'Asistente de registro';
  
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const storedUsername = localStorage.getItem('username');
      
      if (storedUsername) {
        // Usar nombre predeterminado para la demo si no hay nombre almacenado
        this.username = storedUsername === 'admin' ? 'Sebastián Ramírez' : storedUsername;
        this.userRole = 'Asistente de registro';
      }
    }
  }
  
  toggleMenu() {
    // Alterna entre los dos modos: EXPANDED y COLLAPSED
    this.sidebarMode = this.sidebarMode === SidebarMode.EXPANDED 
      ? SidebarMode.COLLAPSED 
      : SidebarMode.EXPANDED;
  }
  
  // Función para expandir/contraer secciones individuales
  toggleSection(section: string) {
    if (this.sidebarMode === SidebarMode.EXPANDED) {
      this.expandedSections[section] = !this.expandedSections[section];
    }
  }
  
  // Verifica si una sección debe mostrar su submenu
  shouldShowSubmenu(section: string): boolean {
    // Los submenús solo se muestran en modo EXPANDED y si la sección está expandida
    return this.sidebarMode === SidebarMode.EXPANDED && this.expandedSections[section];
  }
  
  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      localStorage.removeItem('userRole');
    }
    
    this.router.navigate(['/auth/login']);
  }
}
