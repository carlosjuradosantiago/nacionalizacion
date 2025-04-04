import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="content-header">
      <h1>Generar Título</h1>
      <p>Generación de títulos</p>
    </div>
  `
})
export class GenerarComponent {}