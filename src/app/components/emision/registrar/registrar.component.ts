import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="content-header">
      <h1>Registrar Título</h1>
      <p>Registro de títulos</p>
    </div>
  `
})
export class RegistrarComponent {}