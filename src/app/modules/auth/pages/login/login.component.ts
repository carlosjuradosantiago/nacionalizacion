import { ChangeDetectionStrategy, Component, PLATFORM_ID, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

// PrimeNG Modules
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

// Constants
import { LOGIN_TEXTS } from '../../../../core/constants/texts.constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private platformId = inject(PLATFORM_ID);
  protected readonly texts = LOGIN_TEXTS;
  public isLoading = false;
  public errorMessage: string | null = null;

  public loginForm: FormGroup = this.fb.group({
    username: ['admin', [Validators.required]],
    password: ['123456', [Validators.required]]
  });

  ngOnInit(): void {
    // Podríamos inicializar algo aquí si fuera necesario
  }

  onSubmit(): void {
    this.errorMessage = null;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const { username, password } = this.loginForm.value;

    setTimeout(() => {
      if (username === 'admin' && password === '123456') {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('username', 'Sebastián Ramírez');
          localStorage.setItem('userRole', 'Asistente de registro');
        }
        
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Inicio de sesión exitoso', 
          detail: 'Bienvenido al Sistema de Nacionalización' 
        });
        
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
          this.isLoading = false;
        }, 1500); 
      } else {
        this.errorMessage = 'Usuario y/o Contraseña son incorrectos';
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Error de inicio de sesión', 
          detail: 'Usuario y/o Contraseña son incorrectos' 
        });
        this.isLoading = false;
      }
    }, 1000);
  }
}
