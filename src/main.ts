import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './app/components/dashboard/dashboard.component';
import { LayoutComponent } from './app/components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { 
        path: 'recepcion',
        loadChildren: () => import('./app/components/recepcion/recepcion.routes').then(m => m.RECEPCION_ROUTES)
      },
      { 
        path: 'evaluacion',
        loadComponent: () => import('./app/components/evaluacion/evaluacion.component').then(m => m.EvaluacionComponent)
      },
      { 
        path: 'emision',
        loadChildren: () => import('./app/components/emision/emision.routes').then(m => m.EMISION_ROUTES)
      },
      { 
        path: 'consultas',
        loadComponent: () => import('./app/components/consultas/consultas.component').then(m => m.ConsultasComponent)
      },
      { 
        path: 'cierre',
        loadChildren: () => import('./app/components/cierre/cierre.routes').then(m => m.CIERRE_ROUTES)
      }
    ]
  }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    DialogModule,
    ToastModule,
    TableModule,
    CalendarModule,
    DropdownModule,
    ChartModule,
    CardModule,
    ProgressBarModule,
    RouterModule
  ],
  template: `
    <div class="login-container" *ngIf="!isLoggedIn">
      <div class="login-card">
        <div class="login-left">
          <div class="corner-decoration top-left"></div>
          <div class="corner-decoration bottom-right"></div>
          <div class="decorative-box top-box"></div>
          <div class="decorative-box bottom-box"></div>
          
          <div class="logo-container">
            <img src="https://id-preview--b5e698a5-8816-4e31-b48a-d23a78437a1c.lovable.app/lovable-uploads/3084054d-31db-4867-b270-f5fc1630ebb0.png" alt="Logo Migraciones" class="logo">
          </div>
          <div class="divider"></div>
          <div class="lock-icon-container">
            <i class="pi pi-lock"></i>
          </div>
          <h2 class="system-title">SISTEMA DE NACIONALIZACIÓN</h2>
          <p class="welcome-text">
            Bienvenido al Sistema de Nacionalización de la<br>
            Superintendencia Nacional de Migraciones.
          </p>
        </div>
        
        <div class="login-right">
          <div class="login-form">
            <h2 class="form-title">Iniciar Sesión</h2>
            
            <div class="p-fluid">
              <div *ngIf="errorMessage" class="error-message">
                <i class="pi pi-exclamation-circle"></i>
                {{errorMessage}}
              </div>

              <div class="p-field">
                <label for="username" class="text-gray-800">Usuario</label>
                <input 
                  pInputText 
                  id="username" 
                  type="text" 
                  [(ngModel)]="username"
                  placeholder="Ingrese su nombre de usuario"
                  class="w-full"
                />
              </div>
              
              <div class="p-field">
                <label for="password" class="text-gray-800">Contraseña</label>
                <p-password 
                  id="password" 
                  [(ngModel)]="password"
                  [toggleMask]="true"
                  placeholder="Ingrese su contraseña"
                  [feedback]="false"
                  styleClass="w-full"
                ></p-password>
              </div>

              <button 
                pButton 
                label="INGRESAR" 
                (click)="login()"
                [disabled]="isSystemBlocked"
                class="p-button-primary login-button"
              ></button>
              
              <div class="forgot-password">
                <a href="#" (click)="showResetPassword($event)">¿Olvidaste tu contraseña?</a>
              </div>
              
              <div class="support-text">
                Soporte técnico: 
                <a href="mailto:soporte&#64;migraciones.gob.pe" class="support-email">
                  soporte&#64;migraciones.gob.pe
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <router-outlet *ngIf="isLoggedIn"></router-outlet>
  `,
  providers: [MessageService]
})
export class App {
  username = '';
  password = '';
  errorMessage = '';
  isLoggedIn = false;
  isSystemBlocked = false;

  constructor(private messageService: MessageService) {}

  login() {
    if (this.username === 'admin' && this.password === '123456') {
      this.isLoggedIn = true;
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Usuario y/o Contraseña son Incorrectos';
    }
  }

  showResetPassword(event: Event) {
    event.preventDefault();
    this.messageService.add({
      severity: 'info',
      summary: 'Restaurar Contraseña',
      detail: 'Por favor, contacte al soporte técnico para restaurar su contraseña'
    });
  }
}

bootstrapApplication(App, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(RouterModule.forRoot(routes))
  ]
}).catch(err => console.error(err));