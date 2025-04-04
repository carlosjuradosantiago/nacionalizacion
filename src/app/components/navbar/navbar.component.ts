import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <div class="header-content">
        <div class="header-left">
          <img src="https://id-preview--b5e698a5-8816-4e31-b48a-d23a78437a1c.lovable.app/lovable-uploads/3084054d-31db-4867-b270-f5fc1630ebb0.png" alt="Logo" class="header-logo">
          <span class="header-separator">|</span>
          <span class="header-title">SISTEMA DE NACIONALIZACIÓN</span>
        </div>
        <div class="header-right">
          <div class="notification">
            <i class="pi pi-bell"></i>
            <span class="notification-badge">3</span>
          </div>
          <div class="user-profile">
            <div class="user-avatar">
              <i class="pi pi-user"></i>
            </div>
            <div class="user-info">
              <span class="user-name">Sebastián Ramírez</span>
              <span class="user-role">Asistente de registro</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: #004F9F;
      height: 64px;
      display: flex;
      align-items: center;
      padding: 0 2rem;
      color: white;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1920px;
      margin: 0 auto;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .header-logo {
      height: 40px;
      width: auto;
    }

    .header-separator {
      font-size: 1.5rem;
      color: rgba(255, 255, 255, 0.5);
      margin: 0 0.5rem;
    }

    .header-title {
      font-size: 1.25rem;
      font-weight: 500;
      color: white;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .notification {
      position: relative;
      cursor: pointer;
    }

    .notification i {
      font-size: 1.25rem;
    }

    .notification-badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background: #FF5757;
      color: white;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
    }

    .user-avatar {
      width: 36px;
      height: 36px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .user-avatar i {
      color: white;
      font-size: 1.25rem;
    }

    .user-info {
      display: flex;
      flex-direction: column;
    }

    .user-name {
      font-weight: 500;
      font-size: 0.875rem;
    }

    .user-role {
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.75rem;
    }
  `]
})
export class NavbarComponent {}