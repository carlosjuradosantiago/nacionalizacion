import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recepcion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="content-header">
      <h1>Recepción</h1>
      <p>Gestión de recepción de trámites</p>
    </div>
  `
})
export class RecepcionComponent {}