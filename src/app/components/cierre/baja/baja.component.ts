import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-baja',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="content-header">
      <h1>Baja Carnet de Extranjería</h1>
      <p>Gestión de baja de carnets</p>
    </div>
  `
})
export class BajaComponent {}